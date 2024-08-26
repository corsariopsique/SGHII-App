import './ListarToolSuplier.css';
import TraerImagenes from '../../generalUseComponents/TraerImagenes';
import {Link} from 'react-router-dom';

export default function ListarToolSuplier(props) {

  return (        

        <div className='listaHerramientaProveedor'>

            {props.herramientas.map((opcion) => (                

                <Link to={`/inventario/${opcion.id}`} className='itemHerramientaProveedor rounded' key={opcion.id}>                                        
                        
                    <label htmlFor='foto'> 
                        ID: <h6 className='fw-bold text-dark control_TextoProveedor'>{opcion.id}</h6> 
                        Nombre: <h6 className='text-secondary control_TextoProveedor'>{opcion.nombre}</h6> 
                        Marca: <h6 className='text-success control_TextoProveedor'>{opcion.marca}</h6>
                    </label>                                                   

                    <TraerImagenes tipo = '1' ancho='125px' alto='125px' imageId={opcion.id} />                    

                </Link>

            ))}

        </div>

    )
}