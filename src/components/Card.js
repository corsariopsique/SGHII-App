import "./Card.css";
import IDGenerator from "./IDGenerator";

function Card (props) {
    const clases = 'Card ' + props.className;
    return(
        <div className={clases} id={props.id} key={IDGenerator()}>
            {props.children}
        </div>
    );
}
export default Card;