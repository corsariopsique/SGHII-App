import './PanelInfoText.css'
import Card from "../Layouts/Card";
import InfoCont from "./InfoCont";
import IDGenerator from './IDGenerator';


function PanelInfoText(props) {

    return (     
        
        <Card className={props.estiloPanelInfoText}>
            <p className='titlepanelinfo text-wrap badge bg-light text-dark'>{props.title}</p>            
            {props.info.map((atributo) => (
                <InfoCont                 
                titulo={atributo.titulo}
                cantidad={atributo.cantidad}
                periodo={atributo.periodo}
                estiloItemInfo={atributo.estiloItemInfo} 
                key={IDGenerator()}
                />                       
            ))}            
        </Card>                
    );

}
export default PanelInfoText;