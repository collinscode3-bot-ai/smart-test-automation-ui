import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDashboardComponent } from './features/projects/project-dashboard/project-dashboard.component';
import { ProjectFormComponent } from './features/projects/project-form/project-form.component';
import { TestSuiteDashboardComponent } from './features/test-suites/test-suite-dashboard/test-suite-dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full'
  },
  {
    path: 'projects',
    component: ProjectDashboardComponent
  },
  {
    path: 'projects/create',
    component: ProjectFormComponent
  },
  {
    path: 'projects/edit/:id',
    component: ProjectFormComponent
  },
  {
    path: 'test-suites',
    component: TestSuiteDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
