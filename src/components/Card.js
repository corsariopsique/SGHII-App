import "./Card.css";

function Card (props) {
    const clases = 'Card ' + props.className;
    return(
        <div className={clases}>
            {props.children}
        </div>
    );
}
export default Card;