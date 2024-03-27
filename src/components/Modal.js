import './Modal.css';
import Card from './Card';
import BotonIcono from './BotonIcono';


function Modal(props){

    return (
        <Card className="modal">
            
            <p className='titlepanel'>{props.title}</p>            

            <div class="btn-group btn-group-lg btn_Modal" role="group" aria-label="Large button group">

                {props.botones.map((btninv) => (
                    <BotonIcono 
                        btnname={btninv.btnname}
                        icobtn={btninv.icobtn}
                    />
                ))}         
                
            </div>            

            {props.children}

        </Card>
    );
}
export default Modal;