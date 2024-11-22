import * as Icons from '../Iconos/IndexIcons';
import {Link} from 'react-router-dom';
import './BotonIcono.css';

function BotonIcono (props){   
    
    const isEmpty = (value) => {

        if(value==="null") {
            return false;
        }
        return true;
    }

    const id = props.id;
    const name = props.btnname;
    const iconame = props.icobtn;
    const clasebtn = "btn boton " + props.estiloBoton;
    const Icono = Icons[iconame];
    const tipo = props.tipo;  
    const accion = isEmpty(props.accion);    

    const BtnConEnlace = () => {

        return(            

            <Link to={props.accion}>

                <button form={props.formulario} 
                id={id}
                type={tipo}        
                className={clasebtn}                  
                data-bs-toggle={props.d_toggle}   
                data-bs-target={props.d_target}      
                data-bs-dismiss={props.d_dismiss}                                                                                  
                >                
                    <Icono id="icobtn"/>{name}                
                        
                </button>        

            </Link>            

        );
    }

    const BtnSinEnlace = () => {

        return (

            <button form={props.formulario} 
            id={id}            
            type={tipo} 
            className={clasebtn}                         
            data-bs-toggle={props.d_toggle}   
            data-bs-target={props.d_target}      
            data-bs-dismiss={props.d_dismiss}          
            >                
                <Icono id="icobtn"/>{name}                
                
            </button>               
        );
    }   
    

    return (

        <>        
            {accion ? <BtnConEnlace/> : <BtnSinEnlace/> }

        </>       
        
    );
}
export default BotonIcono;