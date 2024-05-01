import './Modal.css';
import Card from './Card';
import BotonIcono from './BotonIcono';
import {IDGenerator} from './IndexComponents';


function Modal(props){

    const boton_Clase = "btn-group "  + props.botoncss;
    const modal_clase = props.estiloModal;

    return (
        <Card className={modal_clase} id={props.id}>            
            
            <p className='titlepanel'>{props.title}</p> 

            { props.botones!=null &&           

                <div className={boton_Clase} role="group" aria-label="Large button group">

                    {props.botones.map((btninv) => (
                        <BotonIcono 
                            btnname={btninv.btnname}
                            icobtn={btninv.icobtn}
                            estiloBoton={btninv.estiloBoton}
                            tipo={btninv.tipo}
                            formulario={btninv.formulario}
                            accion={btninv.accion}  
                            on_Click={btninv.on_Click}
                            d_toggle={btninv.d_toggle}
                            d_target={btninv.d_target}   
                            d_dismiss={btninv.d_dismiss}  
                            key={IDGenerator()}                 
                        />
                    ))}         
                    
                </div>            
            }

            {props.children}

        </Card>
    );
}
export default Modal;