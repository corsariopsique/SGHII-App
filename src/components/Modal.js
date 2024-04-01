import './Modal.css';
import Card from './Card';
import BotonIcono from './BotonIcono';


function Modal(props){

    const boton_Clase = "btn-group "  + props.botoncss;
    const modal_clase = props.estilo;

    return (
        <Card className={modal_clase} id={props.id}>
            
            <p className='titlepanel'>{props.title}</p>            

            <div class={boton_Clase} role="group" aria-label="Large button group">

                {props.botones.map((btninv) => (
                    <BotonIcono 
                        btnname={btninv.btnname}
                        icobtn={btninv.icobtn}
                        estilo={btninv.estilo}
                        tipo={btninv.tipo}
                        formulario={btninv.formulario}
                        accion={btninv.accion}  
                        on_Click={btninv.on_Click}
                        d_toggle={btninv.d_toggle}
                        d_target={btninv.d_target}   
                        d_dismiss={btninv.d_dismiss}                   
                    />
                ))}         
                
            </div>            

            {props.children}

        </Card>
    );
}
export default Modal;