import Card from "./Card";
import "./PanelListado.css";
import ItemListado from "./ItemListado";

function PanelListado(props) {

    return(
        <Card className ="panelListaP">
            <p className='titlepanel'>{props.title}</p>   
            {props.tool_list.map((item) => (
                <ItemListado
                imagen={item.imagen}
                tipo={item.tipo}
                nombre={item.nombre}
                cant={item.cantidad}                
                />
            ))}                      
        </Card>
    );
}
export default PanelListado;