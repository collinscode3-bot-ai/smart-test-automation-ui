import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { ProjectDetailsComponent } from './features/projects/project-details/project-details.component';
import { TestSuiteDetailsComponent } from './features/projects/test-suite-details/test-suite-details.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'projects/create',
        pathMatch: 'full'
      },
      {
        path: 'projects/create',
        component: ProjectDetailsComponent
      },
      {
        path: 'projects/test-suite',
        component: TestSuiteDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
