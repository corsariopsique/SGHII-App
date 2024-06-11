import './AlertBorra.css';
import * as Icons from '../../Iconos/IndexIcons';
import { useParams, Link, Navigate } from "react-router-dom";
import ReactDOM from 'react-dom';
import { useState } from 'react';

function AlertBorra () {

    const idTool = useParams().toolId;

    const enlaceCancelar = `/inventario/${useParams().toolId}/editarherramienta`;    

    const urlDeleteItem = `http://localhost:4000/tools/${useParams().toolId}`;

    const [rndrmodal, setRndrModal] = useState(true);
   
    const HandleronClickEliminar = () => {

        fetch(urlDeleteItem, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'                
            },
        })

        .then(response => {
            if (response.ok) {    
                console.log(response.ok);                                       
                alert(`La herramienta con el ID: ${idTool} ha sido eliminada con exito`);
                setRndrModal(false);                                 
            } else {
                // Manejar errores de respuesta
                throw new Error('Error al eliminar el registro');
            }
        })

        .catch(error => {
            // Manejar el error
            console.error('Error al eliminar el registro:', error);
        });        
    }; 
    
    const Backdrop = () => {
        return <div className="backdrop-root" />;
    };

    const ModalEliminar = () => {

        return (
            
            <div className="card text-white bg-danger modal-root delete_alert">
                <div className="card-header">Eliminar Herramienta</div>
                <div className="card-body verificacion">                    
                    <p className="card-text text-start">¿Esta usted segur@ de eliminar esta herramienta?</p>
                    <div className="btn-group" role="group" aria-label="Large button group">

                        <button  
                            type="button" 
                            className="btn boton btn-danger"                                                                                             
                            onClick={HandleronClickEliminar}        
                        >                
                            <Icons.EliminarIcono id="icobtn"/>Eliminar              
                    
                        </button> 

                        <Link to={enlaceCancelar}>
                            <button  
                                type="button" 
                                className="btn boton btn-secondary"                                                                                   
                            >                
                                <Icons.CancelIcono id="icobtn"/>Cancelar              
                        
                            </button>            
                        </Link>
                    </div>
                </div>
            </div>        
        );
    }

    return(        

        <>            

            {!rndrmodal && (<Navigate to="/inventario" replace={true} />)}

            {rndrmodal && ReactDOM.createPortal(
                <Backdrop />,
                document.getElementById('backdrop-root')
            )} 

            {rndrmodal && ReactDOM.createPortal(
                <ModalEliminar />,
                document.getElementById('overlay-root')
            )}


        </>
    );
}

export default AlertBorra;