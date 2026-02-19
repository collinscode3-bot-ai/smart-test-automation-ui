import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { ProjectDashboardComponent } from './features/projects/project-dashboard/project-dashboard.component';
import { ProjectFormComponent } from './features/projects/project-form/project-form.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
