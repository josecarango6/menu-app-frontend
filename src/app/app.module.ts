import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductoService } from './productos/producto.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormProductoComponent } from './productos/form-producto.component';
import { FormsModule } from '@angular/forms';
import { CategoriasComponent } from './categorias/categorias.component';
import { CategoriaService } from './categorias/categoria.service';
import { FormComponent } from './categorias/form.component'

const routes: Routes = [
  {path: '', redirectTo: '/catproducto', pathMatch: 'full'},
  {path: 'catproducto', component: ProductosComponent},
  {path: 'directiva', component: DirectivaComponent},
  {path: 'productos/form-producto', component: FormProductoComponent},
  {path: 'productos/form-producto/:id', component: FormProductoComponent},
  {path: 'categorias/form', component: FormComponent},
  {path: 'categorias/form/:id', component: FormComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ProductosComponent,
    FormProductoComponent,
    CategoriasComponent,
    FormComponent,
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
