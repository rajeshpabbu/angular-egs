import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { SignupFormComponent } from "./signup-form/signup-form.component";
import { AppRoutingModule } from "./app-routing.module";
import { FavoriteComponent } from "./favorite/favorite.component";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { TitleCasePipe } from "./title-case.pipe";
import { NewCourseFormComponent } from "./new-course-form/new-course-form.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ObservablesComponent } from "./observables/observables.component";
import { DclComponent } from "./dcl/dcl.component";
import { AlertComponent } from "./shared/alert/alert.component";
import { PlaceholderDirective } from "./shared/placeholder/placeholder.directive";

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
  declarations: [
    AppComponent,
    HelloComponent,
    SignupFormComponent,
    FavoriteComponent,
    HomeComponent,
    PageNotFoundComponent,
    TitleCasePipe,
    NewCourseFormComponent,
    ChangePasswordComponent,
    ObservablesComponent,
    DclComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  entryComponents: [AlertComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
