import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { routes } from '../../../shared/routes/routes';
import { UserService } from '../user.service';
import { IUser } from '../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../../../auth/models/user.model';
import { AuthService } from '../../../auth/auth.service';
import { ToastrService } from 'ngx-toastr'; 
import { IPermission, permissions } from '../../../shared/model/permission.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { LogsService } from '../../user-logs/logs.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit, AfterViewInit {
  isLoadingData = false;
  public routes = routes;
  public sidebarPopup1 = false;
  public sidebarPopup2 = false;

  // Table 
  dataList: IUser[] = [];
  totalItems: number = 0;
  pageSize: number = 15;
  pageIndex: number = 0;
  length: number = 0;

  // Table 
  displayedColumns: string[] = ['fullname', 'title', 'email', 'phone', 'status', 'id'];
  dataSource = new MatTableDataSource<IUser>(this.dataList);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public searchDataValue = '';

  // Forms  
  idItem!: number;
  dataItem!: IUser; // Single data 

  formGroup!: FormGroup;
  currentUser!: UserModel;
  isLoading = false;

  public password: boolean[] = [false];
  isStatusList: boolean[] = [false, true];
  isTitleList: string[] = [
    'Manager',
    'ASM',
    'Supervisor',
    'DR',
    'Support'
  ];

  permissionList: IPermission[] = permissions;
 
  isManager = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private usersService: UserService, 
    private _formBuilder: FormBuilder,
    private logActivity: LogsService,
    private toastr: ToastrService
  ) { }

  ngAfterViewInit(): void {
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.usersService.refreshDataList$.subscribe(() => {
          this.fetchProducts(this.currentUser, this.pageIndex, this.pageSize);
        });
        this.fetchProducts(this.currentUser, this.pageIndex, this.pageSize);
 
      },
      error: (error) => {
        this.isLoadingData = false;
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });
  }

  ngOnInit() {
    this.isLoadingData = true;
    this.formGroup = this._formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      title: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      password_confirm: ['', Validators.required],
      province_id: [''],
      area_id: [''],
      sup_id: [''],
      pos_id: [''],
      // role: ['', Validators.required], // Utilise deja Title
      permission: ['', Validators.required],
      // image: [''], 
      status: [''],
      is_manager: [''],
    });

    
  }


  onPageChange(event: PageEvent): void {
    this.isLoadingData = true; 
    this.fetchProducts(this.currentUser, event.pageIndex, event.pageSize);
  }



  fetchProducts(currentUser: UserModel, pageIndex: number, pageSize: number) {
    this.usersService.getPaginated(pageIndex, pageSize).subscribe(res => {
      this.dataList = res.data;
      this.totalItems = res.pagination.total_pages;
      this.length = res.pagination.length;
      this.dataSource = new MatTableDataSource<IUser>(this.dataList); 
      this.dataSource.sort = this.sort;

      this.isLoadingData = false;
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public sortData(sort: Sort) {
    const data = this.dataList.slice();
    if (!sort.active || sort.direction === '') {
      this.dataList = data;
    } else {
      this.dataList = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }


  openSidebarPopup1() {
    this.sidebarPopup1 = !this.sidebarPopup1;
  }
  openSidebarPopup2() {
    this.sidebarPopup2 = !this.sidebarPopup2;
  }

  public togglePassword(index: number) {
    this.password[index] = !this.password[index]
  }


  onChangeCheck(event: any) {
    this.isManager = event.target.checked;
    console.log('isManager value:', this.isManager);
  }



  onSubmit() {
    try {
      if (this.formGroup.valid) {
        this.isLoading = true;
        var body = {
          fullname: this.formGroup.value.fullname,
          email: this.formGroup.value.email,
          title: this.formGroup.value.title,
          phone: this.formGroup.value.phone,
          password: this.formGroup.value.password,
          password_confirm: this.formGroup.value.password_confirm,
          province_id: (this.isManager) ? 0 : parseInt(this.formGroup.value.province_id),
          area_id: (this.isManager) ? 0 : parseInt(this.formGroup.value.area_id),
          sup_id: (this.isManager) ? 0 : parseInt(this.formGroup.value.sup_id),
          pos_id: (this.isManager) ? 0 : parseInt(this.formGroup.value.pos_id),
          role: this.formGroup.value.title, // Role et title c'est la meme chose mais le role cest pour le code source
          permission: this.formGroup.value.permission,
          // image: this.imageUrl,  
          status: (this.formGroup.value.status) ? this.formGroup.value.status : false,
          is_manager: (this.formGroup.value.is_manager) ? this.formGroup.value.is_manager : false,
          signature: this.currentUser.fullname,
        };
        this.usersService.create(body).subscribe({
          next: (res) => {
            this.logActivity.activity(
              'Users',
              this.currentUser.id,
              'created',
              `Created new user id: ${res.data.ID}`,
              this.currentUser.fullname
            ).subscribe({
              next: () => {
                this.isLoading = false;
                this.formGroup.reset();
                this.toastr.success('Ajouter avec succès!', 'Success!');
              },
              error: (err) => {
                this.isLoading = false;
                this.toastr.error(`${err.error.message}`, 'Oupss!');
                console.log(err);
              }
            });
          },
          error: (err) => {
            this.isLoading = false;
            this.toastr.error(`${err.error.message}`, 'Oupss!');
            console.log(err);
          }
        });
      }
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }


  onSubmitUpdate() {
    try {
      this.isLoading = true;
      var body = {
        fullname: this.formGroup.value.fullname,
        email: this.formGroup.value.email,
        title: this.formGroup.value.title,
        phone: this.formGroup.value.phone,
        province_id: (this.isManager) ? 0 : parseInt(this.formGroup.value.province_id),
        area_id: (this.isManager) ? 0 : parseInt(this.formGroup.value.area_id),
        sup_id: (this.isManager) ? 0 : parseInt(this.formGroup.value.sup_id),
        pos_id: (this.isManager) ? 0 : parseInt(this.formGroup.value.pos_id),
        role: this.formGroup.value.title, // Role et title c'est la meme chose mais le role cest pour le code source
        permission: this.formGroup.value.permission,
        // image: this.imageUrl,  
        status: (this.formGroup.value.status) ? this.formGroup.value.status : false,
        is_manager: (this.formGroup.value.is_manager) ? this.formGroup.value.is_manager : false,
        signature: this.currentUser.fullname,
      };
      this.usersService.update(this.idItem, body)
        .subscribe({
          next: (res) => {
            this.logActivity.activity(
              'Users',
              this.currentUser.id,
              'updated',
              `Updated user id: ${res.data.ID}`,
              this.currentUser.fullname
            ).subscribe({
              next: () => {
                this.formGroup.reset();
                this.toastr.success('Modification enregistré!', 'Success!');
                this.isLoading = false;
              },
              error: (err) => {
                this.isLoading = false;
                this.toastr.error(`${err.error.message}`, 'Oupss!');
                console.log(err);
              }
            });
          },
          error: err => {
            console.log(err);
            this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
            this.isLoading = false;
          }
        });
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }

  findValue(value: number) {
    this.idItem = value;
    this.usersService.get(this.idItem).subscribe(item => {
      this.dataItem = item.data;
      this.formGroup.patchValue({
        fullname: this.dataItem.fullname,
        email: this.dataItem.email,
        title: this.dataItem.title,
        phone: this.dataItem.phone,
        password: this.dataItem.password,
        province_id: this.dataItem.province_id,
        area_id: this.dataItem.area_id,
        sup_id: this.dataItem.sup_id,
        // pos_id: this.dataItem.pos_id,
        role: this.dataItem.title, // Role et title c'est la meme chose mais le role cest pour le code source
        permission: this.dataItem.permission,
        // image: this.imageUrl,
        status: this.dataItem.status,
        is_manager: this.dataItem.is_manager,
      });
    }
    );
  }



  delete(): void {
    this.usersService
      .delete(this.idItem)
      .subscribe({
        next: () => {
          this.logActivity.activity(
            'Users',
            this.currentUser.id,
            'deleted',
            `Delete user id: ${this.idItem}`,
            this.currentUser.fullname
          ).subscribe({
            next: () => {
              this.formGroup.reset();
              this.toastr.info('Supprimé avec succès!', 'Success!');
              this.isLoading = false;
            },
            error: (err) => {
              this.isLoading = false;
              this.toastr.error(`${err.error.message}`, 'Oupss!');
              console.log(err);
            }
          });

        },
        error: err => {
          this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
          console.log(err);
        }
      }
      );
  }

  
}
