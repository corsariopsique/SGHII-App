import './PanelInfo.css';
import IconoInfo from './IconoInfo';
import Card from './Card';

function PanelInfo (props) {    

    return (     
        
        <Card className={props.estilo}>
            <p className='titlepanel'>{props.title}</p>            
            {props.dato.map((concepto) => (
                <IconoInfo 
                colico={concepto.color}
                infoico={concepto.icono}
                cantidad={concepto.cantidad}
                nombre={concepto.nombre} 
                />                       
            ))}            
        </Card>                
    );   
}

export default PanelInfo;