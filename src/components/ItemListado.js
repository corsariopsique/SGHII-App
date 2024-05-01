import './ItemListado.css'
import IDGenerator from './IDGenerator';

function ItemListado(props) {

    const textAlarm = props.tipo;  
    var marcador = false;
    if (textAlarm==="pocos") {marcador=true};     
    const imagen = require('./images/'+ props.imagen + ".png"); 

    return (
        <div className='item_Lista' key={IDGenerator()}>            
            <img className='item_Foto' src={imagen} alt="tool"></img>       

            <div className='text_Name_Cant' key={IDGenerator()}>
                <p className='item_Name'>{props.nombre}</p>
                <p className='item_Cant'>Cantidad disponible: {props.cant}</p>
            </div>

            <div className={textAlarm} key={IDGenerator()}>
                <p className={textAlarm}>{marcador ? "Baja" : "Alta"}</p>
            </div>

        </div>
    );
}
export default ItemListado;