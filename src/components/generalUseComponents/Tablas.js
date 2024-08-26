import React from 'react';
import './Tablas.css';
import {useNavigate} from 'react-router-dom';

function Tablas (props) {   
    
    const navigate= useNavigate();
    
    const l_clases = "link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover";        
    const clases = "tabla table table-striped table-hover" 
    const enlace = props.listado;

    const manejarClick = (e) => {
        navigate(`/${enlace}/${e}`);
    }
   
    return (

        <div className={props.estiloTabla}>

            <table className={clases}>

                <thead className='text-primary'>

                    <tr>
                        {props.columns.map(column => (
                        <th key={column.key}>{column.title}</th>
                        ))}
                    </tr>

                </thead>

                <tbody>
                
                    {props.data.map((row, index) => (                        
                    
                        <tr key={index} onClick={() => manejarClick(row.id.toString())}>           

                            {props.columns.map(column => (
                            <td className={l_clases} key={column.key}>{row[column.key]}</td>
                            ))}                            
                        
                        </tr>
                    ))}

                </tbody>

            </table>            

        </div>
    ); 
}

export default Tablas;