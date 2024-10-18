export class routes {
  private static Url = '';

  public static get baseUrl(): string {
    return this.Url;
  }
  public static get core(): string {
    return this.baseUrl;
  }


  // Auth
  public static get auth(): string {
    return this.core + '/auth';
  }
  public static get login(): string {
    return this.auth + '/login';
  }

  public static get forgotPassword(): string {
    return this.auth + '/forgot-password';
  }

  public static get register(): string {
    return this.auth + '/register';
  }
  public static get emailVerification(): string {
    return this.auth + '/email-verification';
  }

  public static get lockScreen(): string {
    return this.auth + '/lock-screen';
  }


  // Layouts

  // Dashboard
  public static get dashboard(): string {
    return this.core + '/web/dashboard';
  }
  public static get msposDashboard(): string {
    return this.dashboard + '/mspos-dashboard';
  }
  public static get ndDashboard(): string {
    return this.dashboard + '/numeric-distribution';
  }
  public static get wdDashboard(): string {
    return this.dashboard + '/weighted-distribution';
  }
  public static get sishDashboard(): string {
    return this.dashboard + '/share-in-shop-handling';
  }
  public static get oosDashboard(): string {
    return this.dashboard + '/out-of-stock';
  }
  public static get sosDashboard(): string {
    return this.dashboard + '/share-of-stock';
  }
  public static get seDashboard(): string {
    return this.dashboard + '/sales-evolution';
  }
  public static get googleMapsDashboard(): string {
    return this.dashboard + '/google-maps';
  }


  // Users
  public static get user(): string {
    return this.core + '/web/users';
  }
  public static get userList(): string {
    return this.user + '/user-list';
  }

  // Table
  public static get table(): string {
    return this.core + '/web/tables';
  }
  public static get tableList(): string {
    return this.table + '/table-list';
  }

    

  // Managers
  public static get managerList(): string {
    return this.core + '/web/managers/manager-list';
  }

  public static get userLogsList(): string {
    return this.core + '/web/users-logs/activity';
  }


 

}
