import './InfoCont.css';
import IDGenerator from './IDGenerator';
function InfoCont (props) {    

    return (
        
        <div className='textinfopanel' key={IDGenerator()}>
            <p className='titletextpanel' id={props.estiloItemInfo}>{props.titulo}</p>
            <p className='canttextpanel'>{props.cantidad}</p>
            <p className='periotextpanel'>Ultimos {props.periodo} días</p>                
        </div>            
    );
}
export default InfoCont;