import { useState } from "react";
import * as Icons from '../Iconos/IndexIcons';
import Inventario from './Inventario';


const AlertBorra = () => {

    const [toolinfo, SetToolInfo] = useState(true);

    const HandleronClickEliminar = () => {
        SetToolInfo(!toolinfo)
    }          

    return(

        <div>
            <div class="card text-white bg-danger modal-content delete_alert">
                <div class="card-header">Eliminar Herramienta</div>
                <div class="card-body verificacion">                    
                    <p class="card-text text-start">¿Esta usted segur@ de eliminar esta herramienta?</p>
                    <div class="btn-group" role="group" aria-label="Large button group">

                        <button  
                            type="button" 
                            class="btn boton btn-danger" 
                            data-bs-dismiss="modal"                                                                
                            onClick={HandleronClickEliminar}        
                        >                
                            <Icons.EliminarIcono id="icobtn"/>Eliminar              
                    
                        </button> 
                        <button  
                            type="button" 
                            class="btn boton btn-secondary" 
                            data-bs-dismiss="modal"                                                      
                        >                
                            <Icons.CancelIcono id="icobtn"/>Cancelar              
                    
                        </button>            
                    </div>
                </div>
            </div>

            {toolinfo ? <></>: <Inventario/>}

        </div>
    );
};

export default AlertBorra;