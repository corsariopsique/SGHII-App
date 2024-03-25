import './Modal.css';
import Card from './Card';

function Modal(props){

    return (
        <Card className="modal">

            <p className='titlepanel'>{props.title}</p>            

            <div class="btn-group btn-group-lg btn_Modal" role="group" aria-label="Large button group">
                <button type="button" class="btn btn-outline-primary"value={props.funcion}>Left</button>
                <button type="button" class="btn btn-outline-primary">Middle</button>
                <button type="button" class="btn btn-outline-primary">Right</button>
            </div>            

            {props.children}

        </Card>
    );
}
export default Modal;