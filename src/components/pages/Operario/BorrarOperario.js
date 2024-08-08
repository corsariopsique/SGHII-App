import './BorrarOperario.css';
import * as Icons from '../../Iconos/IndexIcons';
import { useParams, Link, Navigate, useLoaderData, useNavigate } from "react-router-dom";
import ReactDOM from 'react-dom';
import { useState } from 'react';

function BorrarOperario () {

    const idWorker = useParams().workerId;

    const dataOper= useLoaderData();    

    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const enlaceCancelar = `/operarios/${idWorker}/editaroperario`;    

    const urlDeleteItem = `http://localhost:8081/api/operarios/${idWorker}`;

    const urlDeleteImage = `http://localhost:8081/api/imagesworker/${idWorker}`;


    const [rndrmodal, setRndrModal] = useState(true);

    const EliminaImagen = async () => {
        
        const response = await fetch(urlDeleteImage, {
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${token}`}
        })

        const result = response.ok;
        if (response.ok) {    
            return response.ok;
        } else {
            // Manejar errores de respuesta
            throw new Error('Error al eliminar la imagen');
        }        
    }

    const EliminaOperario = async () => {

        fetch(urlDeleteItem, {
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${token}`}
        })

        .then(response => {
            if (response.ok) {    
                console.log("Respuesta del servidor",response.ok);                                       
                alert(`El operario con el ID: ${idWorker} ha sido eliminado con exito`);
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

    }
   
    const HandleronClickEliminar = () => {

        if(dataOper.herramientas.length === 0 && dataOper.kits.length === 0){
            const borraIMG = EliminaImagen();
            borraIMG.then((state) => {
                if(state.ok){
                    EliminaOperario();                
                }else{
                    EliminaOperario();
                }
            })            
        }else{
            alert(`El operario con el ID: ${idWorker} tiene operaciones pendientes y no puede ser eliminado.`);
            navigate(enlaceCancelar);
        }        
    }; 
    
    const Backdrop = () => {
        return <div className="backdrop-root" />;
    };

    const ModalEliminar = () => {

        return (
            
            <div className="card text-white bg-danger modal-root delete_alert_Worker">
                <div className="card-header">Eliminar Operario</div>
                <div className="card-body verificacionWorker">                    
                    <p className="card-text text-start">¿Esta usted segur@ de eliminar este operario?</p>
                    <div className="btn-group" role="group" aria-label="Large button group">

                        <button  
                            type="button" 
                            className="btn botonWorker btn-danger"                                                                                             
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

            {!rndrmodal && (<Navigate to="/operarios" replace={true} />)}

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

export default BorrarOperario;

export const BorrarOperarioLoader = async ({params}) => { 
    
    const token = localStorage.getItem('token');    
    
    const operacionesPendientesTrabajador = await fetch(`http://localhost:8081/api/operarios/${params.workerId}/prestamo`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`},
    })          

    if (!operacionesPendientesTrabajador.ok) {
        throw Error('No se pudo cargar las operaciones pendientes del operador indicado')
    }   
    
    return operacionesPendientesTrabajador.json();    
}