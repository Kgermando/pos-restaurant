import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { routes } from '../routes/routes';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private collapseSubject = new BehaviorSubject<boolean>(false);
  collapse$ = this.collapseSubject.asObservable();

  toggleCollapse() {
    this.collapseSubject.next(!this.collapseSubject.value);
  }



  public sidebarDataSupport = [
    {
      tittle: 'Gestion de commandes',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Tables',
          icon: 'layout-grid2',
          route: routes.tableList,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'tables'
        }, 
        {
          menuValue: 'Reservations',
          icon: 'bounce-right',
          route: routes.userLogsList, 
          hasSubRoute: false,
          showSubRoute: false,
          base: 'reservations',
        },
      ],
    },

    {
      tittle: 'Gestion de transactions',
      showAsTab: false,
      separateRoute: false,
      hasSubRoute: false,
      showSubRoute: true,
      menu: [
        {
          menuValue: 'Factures',
          hasSubRoute: true,
          showSubRoute: true,
          icon: 'layout-2',
          base: 'commandes',
          subMenus: [
            {
              menuValue: 'Ticket de caisse',
              route: routes.msposDashboard,
            },
            {
              menuValue: 'Facture pro forma',
              route: routes.ndDashboard,
            }, 
          ]
        },
      ],
    },
    {
      tittle: 'Gestion de stocks',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Menu',
          base: 'commandes',
          icon: 'file-invoice',
          hasSubRoute: true,
          showSubRoute: false,
          subMenus: [
            {
              menuValue: 'Tables',
              icon: 'package',
              route: routes.tableList,
              hasSubRoute: false,
              showSubRoute: false,
            },
            {
              menuValue: 'Bon de commandes',
              icon: 'clipboard',
              route: routes.tableList,
              hasSubRoute: false,
              showSubRoute: false,
            }, 
          ],
        },
      ],
    },
    {
      tittle: 'MANAGEMENT',
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Personnels',
          icon: 'users',
          route: routes.userList,
          hasSubRoute: false,
          showSubRoute: false,
          base: 'users'
        }, 
        {
          menuValue: 'Activity Users',
          icon: 'bounce-right',
          base: 'users-logs',
          hasSubRoute: false,
          showSubRoute: false,
          route: routes.userLogsList,
        },
      ],
    },
  ];
}
