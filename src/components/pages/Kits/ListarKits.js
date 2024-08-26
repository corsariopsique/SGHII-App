import './ListarKits.css';
import TraerImagenes from '../../generalUseComponents/TraerImagenes';
import Tool1Icono from '../../Iconos/Tool1Icono';
import {Link} from 'react-router-dom';

export default function ListarKits(props) {

    const kit_Estado = (estado) => {
        if(!estado){
            return 'Disponible'
        }else{
            return 'Prestado'
        }
    };

  return (

    <>
    
        { props.tipo === '1' &&

            <div className='listaHerramientaKits'>

                {props.herramientas.map((opcion,index) => (      
                    
                    <Link to={`/inventario/${opcion.herramienta.id}`} className='itemHerramientaKits rounded' key={index}>                                                      
                        
                        <label>                             
                            ID: <h6 className='fw-bold text-dark control_TextoKits'>{opcion.herramienta.id}</h6> 
                            ID Item: <h6 className='fw-bold text-secondary control_TextoKits'>{opcion.id}</h6> 
                            Nombre: <h6 className='text-success control_TextoKits'>{opcion.herramienta.nombre}</h6>                             
                        </label>                                               

                        <TraerImagenes tipo = '1' ancho='125px' alto='125px' imageId={opcion.herramienta.id} />                

                    </Link>    

                ))}

            </div>
        }

        { props.tipo === '2' && 

            <div className='listaHerramientaKits'>

                { props.kitsLista.map((itemKit,index) => (

                    <Link to={`/kits/${itemKit.id}`} className='itemKits rounded' key={index}>                                                      
                                        
                        <label> 
                            ID: <h6 className='fw-bold text-dark control_TextoKits'>{itemKit.id}</h6> 
                            Nombre: <h6 className='text-success control_TextoKits'>{itemKit.nombre}</h6> 
                            Estado: <h6 className='text-secondary control_TextoKits'>{kit_Estado(itemKit.disponible)}</h6>
                        </label>                                               

                        <Tool1Icono width='125px' height='125px' className='img_info size_Img'/>

                    </Link>

                ))}                

            </div>        
        }

    </>

    )
}
