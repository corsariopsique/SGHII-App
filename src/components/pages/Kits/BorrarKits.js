import './BorrarKits.css';
import * as Icons from '../../Iconos/IndexIcons';
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import ReactDOM from 'react-dom';
import { useState } from 'react';

function BorrarKits () {

    const idKit = useParams().kitId;
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const webServiceUrl = localStorage.getItem('webServiceUrl');
    const enlaceCancelarKit = `/kits/${idKit}/editarkits`;
    const urlDeleteItemKit = `${webServiceUrl}kits/${idKit}`;
    const [rndrmodalKit, setRndrModalKit] = useState(true);

    const EliminaKit = async () => {

        fetch(urlDeleteItemKit, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`},
        })

        .then(response => {
            if (response.ok) {    
                console.log("Respuesta del servidor",response.ok);                                       
                alert(`El kit con el ID: ${idKit} ha sido eliminado con exito`);
                setRndrModalKit(false);                                 
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
   
    const HandleronClickEliminarKit = () => {

        EliminaKit(); 
        navigate('/kits');
        
    } 
    
    const BackdropKit = () => {
        return <div className="backdrop-root" />;
    };

    const ModalEliminarKit = () => {

        return (
            
            <div className="card text-white bg-danger modal-root delete_alert">
                <div className="card-header">Eliminar Kit</div>
                <div className="card-body verificacion">                    
                    <p className="card-text text-start">¿Esta usted segur@ de eliminar este kit?</p>
                    <div className="btn-group" role="group" aria-label="Large button group">

                        <button  
                            type="button" 
                            className="btn boton btn-danger"                                                                                             
                            onClick={HandleronClickEliminarKit}        
                        >                
                            <Icons.EliminarIcono id="icobtn"/>Eliminar              
                    
                        </button> 

                        <Link to={enlaceCancelarKit}>
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

            {!rndrmodalKit && (<Navigate to="/kits" replace={true} />)}

            {rndrmodalKit && ReactDOM.createPortal(
                <BackdropKit />,
                document.getElementById('backdrop-root')
            )} 

            {rndrmodalKit && ReactDOM.createPortal(
                <ModalEliminarKit />,
                document.getElementById('overlay-root')
            )}


        </>
    );
}

export default BorrarKits;