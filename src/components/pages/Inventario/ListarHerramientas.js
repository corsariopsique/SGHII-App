import './ListarHerramientas.css';
import TraerImagenes from '../../TraerImagenes';
import {Link} from 'react-router-dom';

export default function ListarHerramientas(props) {

  return (        

        <div className='listaHerramientaInventario'>

            {props.herramientas.map((opcion) => (               
                    
                <div className='itemHerramientaInventario rounded' key={opcion.id}>                                                 

                    <Link to={`/inventario/${opcion.id}`}>
                    
                        <label htmlFor='foto'> 
                            ID: <h6 className='fw-bold text-dark control_TextoInventario'>{opcion.id}</h6> 
                            Nombre: <h6 className='text-secondary control_TextoInventario'>{opcion.nombre}</h6> 
                            Cantidad total: <h6 className='text-success control_TextoInventario'>{opcion.cantidad}</h6>
                        </label>            

                    </Link>                   

                    <TraerImagenes ancho='125px' alto='125px' imageId={opcion.id} />                                       

                </div>

            ))}

        </div>

    )
}
