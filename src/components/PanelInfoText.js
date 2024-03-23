import './PanelInfoText.css'
import Card from "./Card";
import InfoCont from "./InfoCont";


function PanelInfoText(props) {

    return (     
        
        <Card className={props.estilo}>
            <p className='titlepanel'>{props.title}</p>            
            {props.info.map((atributo) => (
                <InfoCont 
                titulo={atributo.titulo}
                cantidad={atributo.cantidad}
                periodo={atributo.periodo}
                estilo={atributo.estilo} 
                />                       
            ))}            
        </Card>                
    );

}
export default PanelInfoText;