import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ErrorHandler } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { ProductFormComponent } from "./product-form/product-form.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { AuthGuard } from "./auth.guard";
import { LoginComponent } from "./login/login.component";
import { AuthInterceptor } from "./auth.interceptor";
import { AppErrorHandler } from "./app.error-handler";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AuthorizeGuard } from "./authorize.guard";
import { NotAuthorizedComponent } from "./not-authorized/not-authorized.component";
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ProductFormComponent,
    ProductListComponent,
    LoginComponent,
    NotFoundComponent,
    NotAuthorizedComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "login", component: LoginComponent },
      {
        path: "products/create",
        component: ProductFormComponent,
        canActivate: [AuthGuard, AuthorizeGuard],
        data: { role: "Admin" }
      },
      {
        path: "products/:id",
        component: ProductFormComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "products",
        component: ProductListComponent,
        canActivate: [AuthGuard]
      },
      { path: "not-authorized", component: NotAuthorizedComponent },
      { path: "not-found", component: NotFoundComponent },
      { path: "**", redirectTo: "not-found" }
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
