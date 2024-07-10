import './ListarElementosOperaciones.css';
import TraerImagenes from '../../TraerImagenes';
import Tool1Icono from '../../Iconos/Tool1Icono';
import {Link} from 'react-router-dom';

export default function ListarElementosOperaciones(props) {

    return (    
        
        <>

            { props.tipoElemento &&

                <div className='listaHerramientaOper'>

                    {props.herramientas.map((itemOper,index) => (      
                        
                        <Link to={`/inventario/${itemOper.id}`} className='itemHerramientaOper rounded' key={index}>                                                      
                            
                            <label> 
                                ID: <h6 className='fw-bold text-dark control_TextoOper'>{itemOper.id}</h6> 
                                Nombre: <h6 className='text-success control_TextoOper'>{itemOper.nombre}</h6> 
                                Marca: <h6 className='text-secondary control_TextoOper'>{itemOper.marca}</h6>
                            </label>                                               

                            <TraerImagenes tipo = '1' ancho='125px' alto='125px' imageId={itemOper.id} />                

                        </Link>    

                    ))}

                </div>
            }

            { !props.tipoElemento &&

                <div className='listaHerramientaKits'>                    
                        
                    <Link to={`/kits/${props.kit.id}`} className='itemHerramientaOper rounded'>                                                      
                        
                        <label> 
                            ID: <h6 className='fw-bold text-dark control_TextoOper'>{props.kit.id}</h6> 
                            Nombre: <h6 className='text-success control_TextoOper'>{props.kit.nombre}</h6> 
                            Rol: <h6 className='text-secondary control_TextoOper'>{props.kit.rol}</h6>
                        </label>                                               

                        <Tool1Icono width='125px' height='125px' className='img_info size_Img'/>

                    </Link>                    

                </div>
            
            }

        </>

    )
}