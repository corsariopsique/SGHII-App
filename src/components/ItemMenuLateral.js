import { useState} from 'react';
import { Link } from 'react-router-dom';
import './ItemMenuLateral.css';


function ItemMenuLateral(props){    

    const textitem = props.textitem;
    
    const [seleccion, setSeleccion] = useState('contitembar');

    const handleronMouseOver = () => {
        setSeleccion("contitembarover shadow p-3 mb-5 bg-white rounded");
    }    

    const handleronMouseOut = () => {
        setSeleccion("contitembar")
    }
    
    return (        
        <Link className ={seleccion} onMouseOver={handleronMouseOver} onMouseOut={handleronMouseOut} to={props.enlace}>
            <div className ="itempack">
                <div className ="iconitem">                    
                    {props.children}                           
                </div>
                <p className="tittlenosel">{textitem}</p>
            </div>            
        </Link>         
    );   
}

export default ItemMenuLateral;