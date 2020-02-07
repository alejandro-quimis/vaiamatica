import { Producto } from './producto';
import { Usuario } from './usuario';
export class Compras {
    codigo: number;
    producto: number;
    usuario: number;
    cantidad: number;
    fecha: Date;
    total: number;
    estado: string;
}
