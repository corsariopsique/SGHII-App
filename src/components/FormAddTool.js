import './FormAddTool.css';
import {Form, redirect, useActionData} from 'react-router-dom';
import { useState } from "react";


export default function FormAddTool() {

    const data = useActionData();

    // manejo preview imagen formulario

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

  return (
        <div>
            <Form id="add_tool" action="/inventario/agregarherramienta" method='post'>

                <div className="img_Preview">

                    <div>
                    {img_pre && (<img id="img_Pre" className= "img-thumbnail" src={img_pre} alt="Preview"></img>)}
                    </div>

                    <div id="in_img">
                        <label htmlFor="tool_image" className="form-label">Imagen:</label> 
                        <input 
                            type="file" 
                            id="tool_image" 
                            name="tool_image"
                            accept=".png"
                            onChange={handleronChange}
                        />
                    </div>
                    
                </div>

                <label htmlFor="name_tool" className="form-label">Nombre:</label>

                <input 
                    type='text' 
                    className="form-control"
                    id="name_tool" 
                    placeholder='Ingrese nombre de herramienta'
                />                

                <label htmlFor="cat_tool" className="form-label">Categoria:</label>

                <input 
                    type="text" 
                    className="form-control"
                    id="cat_tool" 
                    placeholder='Ingrese categoria de herramienta'
                />

                <label htmlFor="cantidad_tool" className="form-label">Cantidad:</label>

                <input 
                    type="number" 
                    className="form-control"
                    id="cantidad_tool" 
                    placeholder='Ingrese numero de unidades'
                />

                <label htmlFor="role_tool" className="form-label">Rol:</label>

                <input 
                    type="text" 
                    className="form-control"
                    id="role_tool" 
                    placeholder='Ingrese rol de herramienta'
                />

                <label htmlFor="brand_tool" className="form-label">Marca:</label>

                <input 
                    type="text" 
                    className="form-control"
                    id="brand_tool" 
                    placeholder='Ingrese marca de la herramienta'
                />  

                {data && data.error && <p>{data.error}</p>}             

            </Form>                 
        </div>
    )
}


export const AgregarHerrramientaAction = async ({ request }) => {

    // funcion que genera el id
    function generateRandomId() {
        var id = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    
        for (var i = 0; i < 5; i++) {
            var randomIndex = Math.floor(Math.random() * characters.length);
            id += characters[randomIndex];
        }
    
        return id;
    }

    //recibir los datos del formulario

    const data = await request.formData()

     // manejo verificacion formulario

     const isEmpty = (value) => value.trim() === '';

     const [valida_entrada, setValida_Entrada] = useState({
         tool: true,
         brand: true,
         cant: true,
         cat: true,
         rol: true,
       });
  
    const entrada = {
      tool: data.get('name_tool'),
      cat: data.get('cat_tool'),
      cant: data.get('cantidad_tool'),
      rol: data.get('role_tool'),
      brand: data.get('brand_tool')      
    }
  
    console.log(entrada)
  
    // send your post request
  
    if (entrada.message.length < 10) {
      return {error: 'Message must be over 10 chars long.'}
    }
  
    // redirect the user
    return redirect('/inventario')
  }
