import './ListarOperarios.css';
import TraerImagenes from '../../generalUseComponents/TraerImagenes';
import {Link} from 'react-router-dom';

export default function ListarOperarios(props) {

  return (        

        <div className='lista_Operarios'>

            {props.operarios.map((opcionworker) => (               

                <Link to={`/operarios/${opcionworker.id}`} className='item_Operario rounded' key={opcionworker.id}>                    
                    
                    <label htmlFor='foto'> 
                        ID: <h6 className='fw-bold text-dark control_TextoOperario'>{opcionworker.id}</h6> 
                        Nombre: <h6 className='text-secondary control_TextoOperario'>{opcionworker.nombre}</h6> 
                        Rol: <h6 className='text-success control_TextoOperario'>{opcionworker.rol}</h6>
                    </label>                                       

                    <TraerImagenes tipo='2' ancho='125px' alto='125px' imageId={opcionworker.id} />                                       

                </Link>

            ))}

        </div>

    )
}
