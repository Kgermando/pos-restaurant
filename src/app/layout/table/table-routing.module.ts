import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableListComponent } from './table-list/table-list.component';
import { TableViewComponent } from './table-view/table-view.component';

const routes: Routes = [
  {
    path: 'table-list',
    component: TableListComponent,
  },
  {
    path: 'table/:id/view',
    component: TableViewComponent,
  },
  {
    path: '',
    redirectTo: 'table-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule { }
