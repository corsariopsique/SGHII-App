import './AlertBorra.css';
import * as Icons from '../../Iconos/IndexIcons';
import { useParams, Link, Navigate, useLoaderData } from "react-router-dom";
import ReactDOM from 'react-dom';
import { useState } from 'react';

function AlertBorra () {

    const toolData = useLoaderData();

    const idTool = useParams().toolId;

    const token = localStorage.getItem('token');

    const enlaceCancelar = `/inventario/${useParams().toolId}/editarherramienta`;    

    const urlDeleteItem = `http://localhost:8081/api/herramientas/${useParams().toolId}`;

    const [rndrmodal, setRndrModal] = useState(true);       

    const EliminaTool = async () => {

        fetch(urlDeleteItem, {
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${token}` }
        })

        .then(res => {
            if (res.ok) {    
                console.log("Respuesta del servidor",res.ok);                                       
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

    const HandleronClickEliminar = () => {

        if(toolData.cantidad === toolData.cantidad_disponible){
            EliminaTool();
        }else{
            alert(`La herramienta con el ID: ${idTool} tiene operaciones pendientes y no puede ser eliminada.`);
            setRndrModal(false);
        }                    
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
                            id="delete_Confirm"
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

export const alertBorraLoader = async ({params}) => {    

    const token = localStorage.getItem('token'); 
    
    const detailTool = await fetch(`http://localhost:8081/api/herramientas/${params.toolId}`,{
        method:'GET',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
    })           

    if (!detailTool.ok) {
        throw Error('No se pudo cargar la herramienta indicada')
      }
    
      return detailTool.json()
}