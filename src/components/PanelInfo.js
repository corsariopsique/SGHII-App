import './PanelInfo.css';
import IconoInfo from './IconoInfo';

function PanelInfo (props) {

    return (     
        
        <div className={props.estilo}>
            <p className='titlepanel'>{props.title}</p>            
            {props.dato.map((concepto) => (
                <IconoInfo 
                colico={concepto.color}
                infoico={concepto.icono}
                cantidad={concepto.cantidad}
                nombre={concepto.nombre} 
                />                       
            ))}            
        </div>                
    );
}

export default PanelInfo;