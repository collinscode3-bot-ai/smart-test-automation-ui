import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ProjectDetailsComponent } from './features/projects/project-details/project-details.component';
import { TestSuiteDetailsComponent } from './features/projects/test-suite-details/test-suite-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectDetailsComponent,
    TestSuiteDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
