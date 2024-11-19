import './BorrarUsuario.css';
import * as Icons from '../../Iconos/IndexIcons';
import { useParams, Link, Navigate } from "react-router-dom";
import ReactDOM from 'react-dom';
import { useState } from 'react';
import config from '../../../config';

const BorrarUsuario = () => {

    const username = useParams().username;
    const token = localStorage.getItem('token'); 
    const enlaceCancelar = `/configuracion`;
    const urlDeleteUsername = `${config.accountServiceUrl}auth/delete`;
    const [rndrmodalUsername, setRndrModalUsername] = useState(true);

    const dataUser = {
        username: username
    };

    const EliminaUsername = async () => {

        fetch(urlDeleteUsername, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`},
            body: JSON.stringify(dataUser)
        })

        .then(response => {
            if (response.ok) {    
                console.log("Respuesta del servidor",response.ok);                                       
                alert(`El usuario con el nombre: ${username} ha sido eliminado con exito`);
                setRndrModalUsername(false);                                 
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
    
    const BackdropUsername = () => {
        return <div className="backdrop-root" />;
    };

    const ModalEliminarUsername = () => {

        return (
            
            <div className="card text-white bg-danger modal-root delete_alert">
                <div className="card-header">Eliminar Usuario</div>
                <div className="card-body verificacion">                    
                    <p className="card-text text-start">¿Esta usted segur@ de eliminar este usuario?</p>
                    <div className="btn-group" role="group" aria-label="Large button group">

                        <button  
                            type="button" 
                            className="btn boton btn-danger"                                                                                             
                            onClick={EliminaUsername}        
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

            {!rndrmodalUsername && (<Navigate to="/configuracion" replace={true} />)}

            {rndrmodalUsername && ReactDOM.createPortal(
                <BackdropUsername />,
                document.getElementById('backdrop-root')
            )} 

            {rndrmodalUsername && ReactDOM.createPortal(
                <ModalEliminarUsername />,
                document.getElementById('overlay-root')
            )}

        </>
    );
}
export default BorrarUsuario;