import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MesaComponent } from './mesas/mesa.component'
import { ProductosComponent } from './productos/productos.component';
import { ProductoService } from './productos/producto.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormProductoComponent } from './productos/form-producto.component';
import { FormsModule } from '@angular/forms';
import { CategoriasComponent } from './categorias/categorias.component';
import { CategoriaService } from './categorias/categoria.service';
import { FormComponent } from './categorias/form.component';
import { LoginComponent } from './usuarios/login.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'catproducto', component: ProductosComponent},
  {path: 'mesas', component: MesaComponent},
  {path: 'productos/form-producto', component: FormProductoComponent},
  {path: 'productos/form-producto/:id', component: FormProductoComponent},
  {path: 'categorias/form', component: FormComponent},
  {path: 'categorias/form/:id', component: FormComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MesaComponent,
    ProductosComponent,
    FormProductoComponent,
    CategoriasComponent,
    FormComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ProductoService,
    CategoriaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
