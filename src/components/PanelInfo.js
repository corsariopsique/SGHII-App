import './PanelInfo.css';
import IconoInfo from './IconoInfo';
import Card from './Card';
import IDGenerator from './IDGenerator';

function PanelInfo (props) {    

    return (     
        
        <Card className={props.estiloPanelInfo}>
            <p className='titlepanelPanelInfo text-wrap badge bg-light text-info'>{props.title}</p>            
            {props.dato.map((concepto) => (
                <IconoInfo 
                colico={concepto.color}
                infoico={concepto.icono}
                cantidad={concepto.cantidad}
                nombre={concepto.nombre}
                key={IDGenerator()} 
                />                       
            ))}            
        </Card>                
    );   
}

export default PanelInfo;