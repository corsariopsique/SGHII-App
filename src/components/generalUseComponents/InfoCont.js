import './InfoCont.css';
function InfoCont (props) {   
    
    const clases = 'titletextpanel ' + props.estiloItemInfo

    return (
        
        <div className='textinfopanel'>
            <p className={clases}>{props.titulo}</p>
            <p className='canttextpanel'>{props.cantidad}</p>
            <p className='periotextpanel'>Ultimos {props.periodo} días</p>                
        </div>            
    );
}
export default InfoCont;