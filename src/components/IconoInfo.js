import './IconoInfo.css';
import * as icons from './Iconos/IndexIcons';

function IconoInfo (props) {  

    const ic_wd = props.infoico;     
    const IcoFun = icons[ic_wd];    

    return(
        <div className ="iconoinfo"> 
            <IcoFun className='iconopanel' fill={props.colico}/>  
            <div className='texticopanel'>
                <p className='canttextpanel'>{props.cantidad}</p>
                <p className='nametextpanel'>{props.nombre}</p>
            </div>            
        </div>
    );
}

export default IconoInfo;