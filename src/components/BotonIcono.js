import * as Icons from './Iconos/index';
import './BotonIcono.css';

function BotonIcono (props){        

    const name = props.btnname;
    const iconame = props.icobtn;
    const clasebtn = "btn boton " + props.estilo;
    const Icono = Icons[iconame];
    const tipo = props.tipo;  
    

    return (         

        <button form={props.formulario} 
        type={tipo} 
        class={clasebtn}                  
        data-bs-toggle={props.d_toggle}   
        data-bs-target={props.d_target}      
        data-bs-dismiss={props.d_dismiss}          
        >                
            <Icono id="icobtn"/>{name}                
            
        </button>               
        
    );
}
export default BotonIcono;