import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'employee-list-page',
    loadChildren: () =>
      import('./pages/employee/employee.module').then(m => m.EmployeeModule)
  }
];

// {
//   path: '**',
//   loadChildren: () => import('./shared/component/not-found/not-found.module').then((m) => m.NotFoundModule),
//   canActivate: [AuthGuardGuard],
//   data: { roles: [Roles.all] },
// },

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
