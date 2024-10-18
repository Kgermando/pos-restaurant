import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'user/profil',
        component: ProfileComponent,
      },
      // {
      //   path: 'dashboard',
      //   loadChildren: () =>
      //     import('./dashboard/dashboard.module').then(
      //       (m) => m.DashboardModule
      //     ),
      // },
      {
        path: 'tables',
        loadChildren: () => import('./table/table.module').then((m) => m.TableModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./user/user.module').then(
            (m) => m.UserModule
          ),
      },
      {
        path: 'users-logs/activity',
        loadChildren: () =>
          import('./user-logs/user-logs.module').then(
            (m) => m.UserLogsModule
          ),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
