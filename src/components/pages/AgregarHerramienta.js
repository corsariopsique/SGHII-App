import { Form } from "react-router-dom";
import { useState } from "react";
import Modal from '../Modal';
import './AgregarHerramienta.css';


function AgregarHerramienta () {    

    const [img_pre, setImg_Pre] = useState(null);

    const handleronChange = (event) => {

        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImg_Pre(reader.result);
        };    

        if (file) {
            reader.readAsDataURL(file);
        }
    }    

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
        estilo="modal_Form_add_tool modal-content"
        botoncss="btn_Modal_Form_add_tool"
        botones={btns}
        >            

            <Form id="add_tool" action="/inventario">

                <div className="img_Preview">

                    <div>
                    {img_pre && (<img id="img_Pre" className= "img-thumbnail" src={img_pre} alt="Preview"></img>)}
                    </div>

                    <div id="in_img">
                        <label for="tool_image" class="form-label">Imagen:</label> 
                        <input 
                            type="file" 
                            id="tool_image" 
                            name="tool_image"
                            accept="image/*"
                            onChange={handleronChange}
                        />
                    </div>

                </div>              
                

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