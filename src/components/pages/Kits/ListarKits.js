import './ListarKits.css';
import TraerImagenes from '../../TraerImagenes';
import {Link} from 'react-router-dom';

export default function ListarKits(props) {


  return (        

        <div className='listaHerramientaKits'>

            {props.herramientas.map((opcion) => (               
                    
                <div className='itemHerramientaKits rounded' key={opcion.id}>                                                 

                    <Link to={`/inventario/${opcion.id}`}>
                    
                        <label> 
                            ID: <h6 className='fw-bold text-dark control_TextoKits'>{opcion.id}</h6> 
                            Nombre: <h6 className='text-success control_TextoKits'>{opcion.nombre}</h6> 
                            Marca: <h6 className='text-secondary control_TextoKits'>{opcion.marca}</h6>
                        </label>            

                    </Link>                   

                    <TraerImagenes ancho='125px' alto='125px' imageId={opcion.id} />                                       

                </div>

            ))}

        </div>

    )
}