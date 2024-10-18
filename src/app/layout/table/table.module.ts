import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table.component';
import { TableViewComponent } from './table-view/table-view.component';
import { TableListComponent } from './table-list/table-list.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    TableComponent,
    TableViewComponent,
    TableListComponent
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    SharedModule,
  ]
})
export class TableModule { }
