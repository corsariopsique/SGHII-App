import './BorrarProveedor.css';
import * as Icons from '../../Iconos/IndexIcons';
import { useParams, Link, Navigate } from "react-router-dom";
import ReactDOM from 'react-dom';
import { useState } from 'react';

function BorrarProveedor () {

    const idSuplier = useParams().suplierId;    
    const token = localStorage.getItem('token'); 
    const webServiceUrl = localStorage.getItem('webServiceUrl');
    const enlaceCancelarSuplier = `/proveedores/${idSuplier}/editarproveedor`;
    const urlDeleteItemSuplier = `${webServiceUrl}proveedores/${idSuplier}`;
    const [rndrmodalSuplier, setRndrModalSuplier] = useState(true);

    const EliminaSuplier = async () => {

        fetch(urlDeleteItemSuplier, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`},
        })

        .then(response => {
            if (response.ok) {    
                console.log("Respuesta del servidor",response.ok);                                       
                alert(`El proveedor con el ID: ${idSuplier} ha sido eliminado con exito`);
                setRndrModalSuplier(false);                                 
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
   
    const HandleronClickEliminarSuplier = () => {
        EliminaSuplier();                 
    } 
    
    const BackdropSuplier = () => {
        return <div className="backdrop-root" />;
    };

    const ModalEliminarSuplier = () => {

        return (
            
            <div className="card text-white bg-danger modal-root delete_alert">
                <div className="card-header">Eliminar Proveedor</div>
                <div className="card-body verificacion">                    
                    <p className="card-text text-start">¿Esta usted segur@ de eliminar este proveedor?</p>
                    <div className="btn-group" role="group" aria-label="Large button group">

                        <button  
                            type="button" 
                            className="btn boton btn-danger"                                                                                             
                            onClick={HandleronClickEliminarSuplier}        
                        >                
                            <Icons.EliminarIcono id="icobtn"/>Eliminar              
                    
                        </button> 

                        <Link to={enlaceCancelarSuplier}>
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

            {!rndrmodalSuplier && (<Navigate to="/proveedores" replace={true} />)}

            {rndrmodalSuplier && ReactDOM.createPortal(
                <BackdropSuplier />,
                document.getElementById('backdrop-root')
            )} 

            {rndrmodalSuplier && ReactDOM.createPortal(
                <ModalEliminarSuplier />,
                document.getElementById('overlay-root')
            )}


        </>
    );
}

export default BorrarProveedor;