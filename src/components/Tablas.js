import React from 'react';
import './Tablas.css';

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

        return this.props.data.map((row, index) => (
        <tr key={index}>
            {this.props.columns.map(column => (
            <td key={column.key}>{row[column.key]}</td>
            ))}
        </tr>
        ));
    }
        
    render() {

        const clases = "tabla table table-striped table-hover" + this.props.estilo;

        return (

                <table className={clases}>
                    <thead>{this.renderHeader()}</thead>                    
                    <tbody>{this.renderRows()}</tbody>                    
                </table>                
        );
    }
}

export default Tablas;