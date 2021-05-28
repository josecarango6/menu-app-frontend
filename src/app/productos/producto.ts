export class Producto {
  id_categoria: number;
  nombre: string;
  listaProducto:[  
    {
    id_producto: number,
    nombre: string,
    precio: number,
    fkIdCategoria: number}
  ] 
  ;
}


