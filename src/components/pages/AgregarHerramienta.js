import './AgregarHerramienta.css';
import {Modal, FormAddTool} from '../IndexComponents';
import {Form, redirect, useActionData} from 'react-router-dom';
import { useState } from "react";

function AgregarHerramienta (props) {  
    
    const datos = useActionData();      

    // manejo preview imagen formulario    

    const [img_pre, setImg_Pre] = useState(null);
    const [tipo_img, setTipo_Img] = useState(null);

    const handleronChange = (event) => {        

        const file = event.target.files[0];
        const reader = new FileReader();       

        reader.onloadend = () => {
            setImg_Pre(reader.result);
        };    

        if (file) {
            reader.readAsDataURL(file);
            setTipo_Img(null);            
        }

        if (file && file.type !== 'image/png') {
            setTipo_Img ("Tipo de imagen no valido, por favor ingrese un archivo tipo PNG"); 
            setImg_Pre(null);
            return             
        } 
    }   
    
    const btnsAgregarHerramienta = [
        {
            btnname:"Registar",
            icobtn:"Tool1Icono",
            estiloBoton:"btn-primary",
            formulario:"add_tool",            
            tipo:"submit", 
            accion:"null",                                         
        },

        {
            btnname:"Cancelar",
            icobtn:"CancelIcono",
            estiloBoton:"btn-secondary",            
            accion:"/inventario"
        }        
    ]; 
    

    return (

        <Modal         
            title="Agregar Herramienta"
            estiloModal="modal_completo"
            botoncss="btn_ModalIntermedio"
            botones={btnsAgregarHerramienta}
            >           

            
            <Form id="add_tool" name="add_tool" className="formulario" action="/inventario/agregarherramienta" method='post'>                                       

                <div className="img_ContPreview">

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
                            required
                        />

                        {tipo_img && <p className='error-form'>{tipo_img}</p>} 
                        {datos && datos["image"] && <p className='error-form'>{datos["image"]}</p>}                             

                    </div>  

                </div>

                <div className='inputNoImgAdd'>

                    <label htmlFor="name_tool" className="form-label">Nombre:</label>

                    <input 
                        type='text' 
                        className="form-control"
                        name="name_tool" 
                        id="name_tool" 
                        placeholder='Ingrese nombre de herramienta'
                        required
                    />                

                    {datos && datos["name"] && <p className='error-form'>{datos["name"]}</p>}               

                    <label htmlFor="cat_tool" className="form-label">Categoria:</label>

                    <input 
                        type="text" 
                        className="form-control"
                        name="cat_tool" 
                        id="cat_tool" 
                        placeholder='Ingrese categoria de herramienta'
                        required
                    />

                    {datos && datos["cat"] && <p className='error-form'>{datos["cat"]}</p>}               

                    <label htmlFor="cantidad_tool" className="form-label">Cantidad:</label>

                    <input 
                        type="number" 
                        className="form-control"
                        name="cantidad_tool" 
                        id="cantidad_tool" 
                        placeholder='Ingrese numero de unidades'
                        required
                    /> 

                    {datos && datos["cant"] && <p className='error-form'>{datos["cant"]}</p>}               

                    <label htmlFor="role_tool" className="form-label">Rol:</label>

                    <input 
                        type="text" 
                        className="form-control"
                        name="role_tool" 
                        id="role_tool" 
                        placeholder='Ingrese rol de herramienta'
                        required
                    />

                    {datos && datos["rol"] && <p className='error-form'>{datos["rol"]}</p>}               

                    <label htmlFor="brand_tool" className="form-label">Marca:</label>

                    <input 
                        type="text" 
                        className="form-control"
                        name="brand_tool" 
                        id="brand_tool" 
                        placeholder='Ingrese marca de la herramienta'
                        required
                    />  

                    {datos && datos["brand"] && <p className='error-form'>{datos["brand"]}</p>}   

                    <label htmlFor="name_prove" className="form-label">Nombre proveedor:</label>

                    <input 
                        type='text' 
                        className="form-control"
                        name="name_prove" 
                        id="name_prove" 
                        placeholder='Ingrese nombre proveedor de herramienta'
                        required
                    />                

                    {datos && datos["name_prove"] && <p className='error-form'>{datos["name_prove"]}</p>}       

                    <label htmlFor="phone_prove" className="form-label">Telefono proveedor:</label>

                    <input 
                        type='text' 
                        className="form-control"
                        name="phone_prove" 
                        id="phone_prove" 
                        placeholder='Ingrese telefono proveedor de herramienta'
                        required
                    />                

                    {datos && datos["phone_prove"] && <p className='error-form'>{datos["phone_prove"]}</p>}

                    <label htmlFor="city_prove" className="form-label">Ciudad proveedor:</label>

                    <input 
                        type='text' 
                        className="form-control"
                        name="city_prove" 
                        id="city_prove" 
                        placeholder='Ingrese ciudad proveedor de herramienta'
                        required
                    />                

                    {datos && datos["phone_prove"] && <p className='error-form'>{datos["phone_prove"]}</p>}                                

                </div>

            </Form>            
            
        </Modal>
      
    );

}
export default AgregarHerramienta;

export const AgregarHerrramientaAction = async ({ request }) => {

    // funcion que genera el id
    function generateRandomId(longitud) {
        var id = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    
        for (var i = 0; i < longitud; i++) {
            var randomIndex = Math.floor(Math.random() * characters.length);
            id += characters[randomIndex];
        }
    
        return id;
    }

    function fechaActual() {

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;

    }

    //recibir los datos del formulario

    const data = await request.formData()

    const errors = {};    

     // manejo verificacion formulario     
  
    const entrada = {
      id: generateRandomId(5),  
      tool: data.get('name_tool'),
      brand: data.get('brand_tool'),         
      cant: Number(data.get('cantidad_tool')),      
      cat: data.get('cat_tool'),      
      rol: data.get('role_tool'),
      date_in: fechaActual(),
      prove:{
        id_prove: generateRandomId(4),
        name: data.get('name_prove'),
        phone: data.get('phone_prove'),
        city: data.get('city_prove')
      },
      image: data.get('tool_image').split(".")[0]
    }
  
    console.log("recibido del formulario",entrada);
  
    // send your post request
  
    if (entrada.tool.length < 3) {
        errors.name = 'Debe ingresar un nombre valido para la herramienta';
    }

    if (entrada.cat.length < 3) {
        errors.cat = 'Debe ingresar una categoria valida para la herramienta';
    }

    if (entrada.cant === 0) {        
        errors.cant = 'Debe ingresar una cantidad diferente de 0 para la herramienta';
    }

    if (entrada.rol.length < 3) {
        errors.rol = 'Debe asignar un rol valido para la herramienta';
    }

    if (entrada.brand.length < 3) {
        errors.brand = 'Debe ingresar una marca valido para la herramienta';
    }

    if (entrada.prove.name.length < 3) {
        errors.name_prove = 'Debe ingresar un nombre de proveedor valido';
    }

    if (entrada.prove.phone.length < 9) {
        errors.phone_prove = 'Debe ingresar un telefono de proveedor valido';
    }

    if (entrada.prove.city.length < 3) {
        errors.city_prove = 'Debe ingresar una ciudad de proveedor valida';
    }

    if (data.get('tool_image').includes(".png") !== true) {        
        errors.image = 'Debe ingresar una imagen valida para la herramienta';
    }      

    if (Object.keys(errors).length) {
        console.log(errors);
        return errors;
    }

    FormAddTool(entrada);

    // redirect the user
    return redirect(`/inventario/${entrada.id}`);
}


