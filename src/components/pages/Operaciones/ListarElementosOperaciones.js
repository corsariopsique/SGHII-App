import './ListarElementosOperaciones.css';
import TraerImagenes from '../../generalUseComponents/TraerImagenes';
import Tool1Icono from '../../Iconos/Tool1Icono';
import {Link} from 'react-router-dom';

export default function ListarElementosOperaciones(props) {

    return (    
        
        <>

            { props.tipoElemento &&

                <div className='listaHerramientaOper'>

                    {props.herramientas.map((itemOper,index) => (      
                        
                        <Link to={`/inventario/${itemOper.herramienta.id}`} className='itemHerramientaOper rounded' key={index}>                                                      
                            
                            <label> 
                                ID: <h6 className='fw-bold text-dark control_TextoOper'>{itemOper.herramienta.id}</h6>                                 
                                ID Item: <h6 className='fw-bold text-secondary control_TextoOper'>{itemOper.id}</h6>                                 
                                Nombre: <h6 className='text-success control_TextoOper'>{itemOper.herramienta.nombre}</h6>                                 
                            </label>                                               

                            <TraerImagenes tipo = '1' ancho='125px' alto='125px' imageId={itemOper.herramienta.id} />                

                        </Link>    

                    ))}

                </div>
            }

            { !props.tipoElemento &&

                <div className='listaHerramientaKits'>  

                    {props.kit.map((itemOper,index) => (

                        <Link to={`/kits/${itemOper.id}`} className='itemHerramientaOper rounded' key={index}>                                                      
                                                
                            <label> 
                                ID: <h6 className='fw-bold text-dark control_TextoOper'>{itemOper.id}</h6> 
                                Nombre: <h6 className='text-success control_TextoOper'>{itemOper.nombre}</h6> 
                                Rol: <h6 className='text-secondary control_TextoOper'>{itemOper.rol}</h6>
                            </label>                                               

                            <Tool1Icono width='125px' height='125px' className='img_info size_Img'/>

                        </Link>

                    ))}                        
                    
                </div>                            
            }

        </>

    )
}