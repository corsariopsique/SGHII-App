import './ListarHerramientas.css';
import TraerImagenes from '../../TraerImagenes';
import {Link} from 'react-router-dom';

export default function ListarHerramientas(props) {

  return (        

        <div className='listaHerramientaInventario'>

            {props.herramientas.map((opcion) => (                

                <Link to={`/inventario/${opcion.id}`} className='itemHerramientaInventario rounded' key={opcion.id}>                                        
                        
                    <label htmlFor='foto'> 
                        ID: <h6 className='fw-bold text-dark control_TextoInventario'>{opcion.id}</h6> 
                        Nombre: <h6 className='text-secondary control_TextoInventario'>{opcion.nombre}</h6> 
                        Cantidad total: <h6 className='text-success control_TextoInventario'>{opcion.cantidad}</h6>
                    </label>                                                   

                    <TraerImagenes tipo = '1' ancho='125px' alto='125px' imageId={opcion.id} />                    

                </Link>

            ))}

        </div>

    )
}
