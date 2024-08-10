import "./PanelListado.css";
import Card from "./Card";
import ItemListado from "./ItemListado";
import IDGenerator from "./IDGenerator";


function PanelListado(props) {

    return(
        <Card className ="panelListaP">
            <p className='titlepanelL text-wrap badge bg-light text-info'>{props.title}</p>   
            {props.tool_list.map((item) => (
                <ItemListado
                imagen={item.imagen}
                tipo={item.tipo}
                nombre={item.nombre}
                cant={item.cantidad}  
                key={IDGenerator()}              
                />
            ))}                      
        </Card>
    );
}
export default PanelListado;