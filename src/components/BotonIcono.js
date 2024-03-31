import { Link } from 'react-router-dom';
import * as Icons from './Iconos/index';
import './BotonIcono.css';


function BotonIcono (props){

    const name = props.btnname;
    const iconame = props.icobtn;
    const clasebtn = "btn boton " + props.estilo;
    const Icono = Icons[iconame];
    const tipo = props.tipo;  
    

    return (  
        
        <Link to={props.accion}>

            <button form={props.formulario} 
            type={tipo} 
            class={clasebtn}            
            >                
                <Icono id="icobtn"/>{name}                
                
            </button>        

        </Link>
        
    );
}
export default BotonIcono;