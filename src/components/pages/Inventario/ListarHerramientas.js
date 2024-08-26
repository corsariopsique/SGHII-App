import './ListarHerramientas.css';
import TraerImagenes from '../../generalUseComponents/TraerImagenes';
import {Link} from 'react-router-dom';

export default function ListarHerramientas(props) {

    const estado = (estado) => {
        if(estado === 1){
            return 'No disponible'
        }else if (estado === 0){
            return 'Disponible'
        }
    }

    const deBaja = (estado) => {
        if(estado === null){
            return 'Activa'
        }else if (estado !== null){
            return 'Fuera de servicio'
        }
    }

  return (

    <>
    
        { props.tipo === '1' &&

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

        }

        { props.tipo === '2' &&

            <div className='listaHerramientaItems'>

                {props.herramientas.map((opcion) => (                

                    <Link to={`/inventario/items/${opcion.id}`} className='itemHerramientaInventario rounded' key={opcion.id}>                                        
                            
                        <label htmlFor='foto'>                             
                            ID Item: <h6 className='fw-bold text-dark control_TextoInventario'>{opcion.id}</h6> 
                            Disponibilidad: <h6 className='text-secondary control_TextoInventario'>{estado(opcion.estado)}</h6>                             
                            Estado: <h6 className='fw-bold text-dark control_TextoInventario'>{deBaja(opcion.fecha_out)}</h6> 
                        </label>                                                   

                        <TraerImagenes tipo = '1' ancho='125px' alto='125px' imageId={opcion.herramienta.id} />                    

                    </Link>

                ))}

            </div>
        }

    </>

    )
}
