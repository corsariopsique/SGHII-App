import './ItemListado.css'
import TraerImagenes from './TraerImagenes';

function ItemListado(props) {    

    return (
        <div className='item_Lista'>

            <div className='imagenLista'>            
                <TraerImagenes alto='73px' ancho= '73px' tipo='1' imageId={props.imagen} /> 
            </div>           

            <div className='text_Name_Cant'>
                <p className='item_Name'>{props.nombre}</p>
                <p className='item_Cant'>Cant. Disponible: {props.cant}</p>
            </div>

            <div className='pocos'>
                <p className='pocosTexto'>Baja</p>
            </div>

        </div>
    );
}
export default ItemListado;