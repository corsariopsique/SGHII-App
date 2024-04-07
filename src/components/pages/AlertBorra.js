import { useState } from "react";
import * as Icons from '../Iconos/IndexIcons';
import { redirect } from "react-router-dom";


const AlertBorra = () => {

    const [toolinfo, SetToolInfo] = useState(true);

    const HandleronClickEliminar = () => {
        SetToolInfo(!toolinfo)
    }          

    return(

        <div>
            <div className="card text-white bg-danger modal-content delete_alert">
                <div className="card-header">Eliminar Herramienta</div>
                <div className="card-body verificacion">                    
                    <p className="card-text text-start">¿Esta usted segur@ de eliminar esta herramienta?</p>
                    <div className="btn-group" role="group" aria-label="Large button group">

                        <button  
                            type="button" 
                            className="btn boton btn-danger" 
                            data-bs-dismiss="modal"                                                                
                            onClick={HandleronClickEliminar}        
                        >                
                            <Icons.EliminarIcono id="icobtn"/>Eliminar              
                    
                        </button> 
                        <button  
                            type="button" 
                            className="btn boton btn-secondary" 
                            data-bs-dismiss="modal"                                                      
                        >                
                            <Icons.CancelIcono id="icobtn"/>Cancelar              
                    
                        </button>            
                    </div>
                </div>
            </div>

            {toolinfo ? <></>: redirect("/inventario")}

        </div>
    );
};

export default AlertBorra;