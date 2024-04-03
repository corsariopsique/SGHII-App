import React from 'react';
import './Tablas.css';
import {Link} from 'react-router-dom';

class Tablas extends React.Component {       
    

    renderHeader() {

        return (

            <tr>
                {this.props.columns.map(column => (
                <th key={column.key}>{column.title}</th>
                ))}
            </tr>
        );
    }
        
    renderRows() {

        const l_clases = "link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover";        

        return (this.props.data.map((row, index) => (                
            
            <tr key={index}>           
                
                {this.props.columns.map(column => (
                <td><Link className={l_clases} to={row.id} key={column.key}>{row[column.key]}</Link></td>
                ))}
                
            </tr>           
            
        ))); 
    }
        
    render() {

        const clases = "tabla table table-striped table-hover"        

        return (

            <div className={this.props.estilo}>

                <table className={clases}>
                    <thead>{this.renderHeader()}</thead>                    
                    <tbody>{this.renderRows()}</tbody>                    
                </table>            

            </div>        
                
        );
    }
}

export default Tablas;