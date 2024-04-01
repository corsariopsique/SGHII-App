import { Form } from "react-router-dom";
import './AgregarHerramienta.css';
import Modal from '../Modal';

function AgregarHerramienta () {
  

    const btns = [
        {
            btnname:"Registar",
            icobtn:"Tool1Icono",
            estilo:"btn-primary",
            formulario:"add_tool",
            d_dismiss:"modal",
            tipo:"submit"                   
        },

        {
            btnname:"Cancelar",
            icobtn:"CancelIcono",
            estilo:"btn-secondary",
            accion:"/inventario",
            d_dismiss:"modal"
        }        
      ];

    return (

        <Modal         
        title="Agregar Herramienta"
        estilo="modal_Form modal-content"
        botoncss="btn_Modal_Form"
        botones={btns}
        >            

            <Form id="add_tool" action="/inventario">

                <label for="name_tool" class="form-label">Nombre:</label>

                <input 
                    type='text' 
                    class="form-control"
                    id="name_tool" 
                    placeholder='Ingrese nombre de herramienta'
                />

                <label for="id_tool" class="form-label">ID Herramienta:</label>

                <input 
                    type="text" 
                    class="form-control"
                    id="id_tool" 
                    placeholder='Ingrese ID de herramienta'
                />

                <label for="cat_tool" class="form-label">Categoria:</label>
                
                <input 
                    type="text" 
                    class="form-control"
                    id="cat_tool" 
                    placeholder='Ingrese categoria de herramienta'
                />

                <label for="cantidad_tool" class="form-label">Cantidad:</label>
                
                <input 
                    type="number" 
                    class="form-control"
                    id="cantidad_tool" 
                    placeholder='Ingrese numero de unidades'
                />

                <label for="model_tool" class="form-label">Modelo:</label>
                
                <input 
                    type="text" 
                    class="form-control"
                    id="model_tool" 
                    placeholder='Ingrese modelo de herramienta'
                />

                <label for="brand_tool" class="form-label">Marca:</label>
                
                <input 
                    type="text" 
                    class="form-control"
                    id="brand_tool" 
                    placeholder='Ingrese marca de la herramienta'
                />               

            </Form>                 
        
        </Modal>       

    );

}
export default AgregarHerramienta;