import './BajaItem.css';
import * as Icons from '../../Iconos/IndexIcons';
import { useParams, Link, Navigate, useLoaderData } from "react-router-dom";
import ReactDOM from 'react-dom';
import { useState } from 'react';

function BajaItem () {

    const dataItem = useLoaderData();
    const idItem = useParams().itemId;    
    const enlaceCancelarItem = `/inventario/items/${idItem}`; 
    const token = localStorage.getItem('token'); 
    const webServiceUrl = localStorage.getItem('webServiceUrl');    
    const urlDeleteItem = `${webServiceUrl}items/${idItem}`;
    const [rndrmodalItem, setRndrModalItem] = useState(true);

    const EliminaItem = async () => {

        fetch(urlDeleteItem, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`},
        })

        .then(response => {
            if (response.ok) {    
                console.log("Respuesta del servidor",response.ok);                                       
                alert(`El item con el ID: ${idItem} ha sido dado de baja con exito`);
                setRndrModalItem(false);                                 
            } else {
                // Manejar errores de respuesta
                throw new Error('Error al dar de baja el registro');
            }
        })

        .catch(error => {
            // Manejar el error
            console.error('Error al dar de baja el registro:', error);
        });

    }
   
    const HandleronClickEliminarItem = () => {
        if(dataItem.estado === 0){
            EliminaItem();                 
        }else if(dataItem.estado === 1){
            alert(`El item con el ID: ${idItem} tiene operaciones pendientes o ya ha sido dado de baja.`);
            setRndrModalItem(false);
        }        
    } 
    
    const BackdropItem = () => {
        return <div className="backdrop-root" />;
    };

    const ModalEliminarItem = () => {

        return (
            
            <div className="card text-white bg-danger modal-root delete_alert">
                <div className="card-header">Dar de Baja Item</div>
                <div className="card-body verificacion">                    
                    <p className="card-text text-start">¿Esta usted segur@ de dar de baja este item?</p>
                    <div className="btn-group" role="group" aria-label="Large button group">

                        <button  
                            type="button" 
                            className="btn boton btn-danger"                                                                                             
                            onClick={HandleronClickEliminarItem}        
                        >                
                            <Icons.EliminarIcono id="icobtn"/>Dar de Baja              
                    
                        </button> 

                        <Link to={enlaceCancelarItem}>
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

            {!rndrmodalItem && (<Navigate to="/inventario" replace={true} />)}

            {rndrmodalItem && ReactDOM.createPortal(
                <BackdropItem />,
                document.getElementById('backdrop-root')
            )} 

            {rndrmodalItem && ReactDOM.createPortal(
                <ModalEliminarItem />,
                document.getElementById('overlay-root')
            )}


        </>
    );
}

export default BajaItem;

export const bajaItemLoader = async ({params}) => {    

    const token = localStorage.getItem('token'); 
    const webServiceUrl = localStorage.getItem('webServiceUrl'); 
    
    const detailItem = await fetch(`${webServiceUrl}items/${params.itemId}`,{
        method:'GET',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
    })           

    if (!detailItem.ok) {
        throw Error('No se pudo cargar el item indicado')
      }
    
      return await detailItem.json()
}