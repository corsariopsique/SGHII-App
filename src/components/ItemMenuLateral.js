import { NavLink } from 'react-router-dom';
import './ItemMenuLateral.css';

function ItemMenuLateral(props){      

    const textitem = props.textitem;

    return (        
        <NavLink className={({ isActive }) =>
        isActive ? "tittlenosel" : "tittlesel"}         
        to={props.enlace}>

            <div className ="itempack">
                <div className ="iconitem">                    
                    {props.children}                           
                </div>
                <p className='tittlenosel'>{textitem}</p>
            </div>            
        </NavLink>         
    );   
}

export default ItemMenuLateral;