import React from 'react';
import './Tablas.css';
import {Link} from 'react-router-dom';

function Tablas (props) {       

    const l_clases = "link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover";        
    const clases = "tabla table table-striped table-hover"           

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
                    
                        <tr key={index}>           

                            {props.columns.map(column => (
                            <td><Link className={l_clases} to={row.id.toString()} key={column.key}>{row[column.key]}</Link></td>
                            ))}
                            
                        </tr>                     
                    ))}

                </tbody>

            </table>            

        </div>
    ); 
}

export default Tablas;