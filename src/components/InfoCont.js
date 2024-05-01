import './InfoCont.css';
function InfoCont (props) {    

    return (
        
        <div className='textinfopanel'>
            <p className='titletextpanel' id={props.estiloItemInfo}>{props.titulo}</p>
            <p className='canttextpanel'>{props.cantidad}</p>
            <p className='periotextpanel'>Ultimos {props.periodo} días</p>                
        </div>            
    );
}
export default InfoCont;