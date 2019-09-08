import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignupFormComponent } from "./signup-form/signup-form.component";
import { FavoriteComponent } from "./favorite/favorite.component";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "signup-form", component: SignupFormComponent },
  { path: "favorite", component: FavoriteComponent },
  {
    path: "home",
    component: HomeComponent
  },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
