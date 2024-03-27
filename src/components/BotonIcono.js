import * as Icons from './Iconos/index';
import './BotonIcono.css';

function BotonIcono (props){

    const name = props.btnname;
    const iconame = props.icobtn;
    const Icono = Icons[iconame];

    return (
        <>
        <button type="button" class="btn btn-outline-primary boton"><Icono id="icobtn"/>{name}</button>                      
        </>       
    );
}
export default BotonIcono;