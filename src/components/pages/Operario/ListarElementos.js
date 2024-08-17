import './ListarElementos.css';
import TraerImagenes from '../../TraerImagenes';
import Tool1Icono from '../../Iconos/Tool1Icono';
import {Link} from 'react-router-dom';

export default function ListarElementos(props) {   
    
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

            <div className='listaToolsWorker'>

                {props.herramientas.map((opcion,index) => (      
                    
                    <Link to={`/inventario/${opcion.id}`} className='itemToolsWorker rounded' key={index}>                                                      
                        
                        <label> 
                            ID: <p className='fw-bold text-dark control_TextoItem'>{opcion.id}</p> 
                            Nombre: <p className='text-success control_TextoItem'>{opcion.nombre}</p> 
                            Marca: <p className='text-secondary control_TextoItem'>{opcion.marca}</p>
                        </label>                                               

                        <TraerImagenes tipo = '1' ancho='125px' alto='125px' imageId={opcion.id} className='img_infoWorker size_ImgWorker' />                

                    </Link>    

                ))}

            </div>
        }

        { props.tipo === '2' && 

            <div className='listaToolsWorker'>

                { props.kits.map((itemKit,index) => (

                    <Link to={`/kits/${itemKit.id}`} className='itemToolsWorker rounded' key={index}>                                                      
                                        
                        <label> 
                            ID: <p className='fw-bold text-dark control_TextoItem'>{itemKit.id}</p> 
                            Nombre: <p className='text-success control_TextoItem'>{itemKit.nombre}</p>
                            Estado: <p className='text-secondary control_TextoKits'>{kit_Estado(itemKit.disponible)}</p>
                        </label>                                               

                        <Tool1Icono width='125px' height='125px' className='img_infoWorker size_ImgWorker'/>

                    </Link>

                ))}                

            </div>        
        }

    </>

    )
}
