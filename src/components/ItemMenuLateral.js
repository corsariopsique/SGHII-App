import { useState} from 'react';
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
        <div className ={seleccion} onMouseOver={handleronMouseOver} onMouseOut={handleronMouseOut}>
            <div className ="itempack">
                <div className ="iconitem">                    
                    {props.children}                           
                </div>
                <a className="tittlenosel">{textitem}</a>
            </div>            
        </div>         
    );   
}

export default ItemMenuLateral;