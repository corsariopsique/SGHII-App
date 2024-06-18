import './EditarHerramienta.css';
import { Form, useParams, useLoaderData, redirect, Outlet} from "react-router-dom";
import { useState } from "react";
import { Modal } from '../../IndexComponents';


function EditarHerramienta(){     
    
    const itemToMod = useLoaderData();      
    
    //control previsualizacion imagen

    const [img_pre, setImg_Pre] = useState(null);
    const [tipo_img, setTipo_Img] = useState(null);      
    const [img_send, setImg_Send] = useState(null);  

    const handleronChange = (event) => {        

        const file = event.target.files[0];
        const reader = new FileReader();           
        

        reader.onloadend = () => {    
            const base64String = reader.result.split(',')[1];
            setImg_Send(base64String);           
            setImg_Pre(reader.result);                        
        }       
        
        
        if (file && file.type !== 'image/png') {
            setTipo_Img ("Tipo de imagen no valido, por favor ingrese un archivo tipo PNG"); 
            setImg_Pre(null);
            return             
        }        
         
        if (file) {
            reader.readAsDataURL(file);                        
            setTipo_Img(null);            
        }                       
    }        

    // paquete iconos acciones

    const btnsEditarHerramienta = [
        {
            btnname:"Actualizar",
            icobtn:"Tool1Icono",
            estiloBoton:"btn-primary",
            formulario:"edit_tool",            
            tipo:"submit",
            accion:"null"                
        },

        {
            btnname:"Cancelar",
            icobtn:"CancelIcono",
            estiloBoton:"btn-secondary",
            accion:`/inventario/${useParams().toolId}`            
        },

        {
            btnname:"Eliminar",
            icobtn:"EliminarIcono",
            estiloBoton:"btn-danger",                                                          
            tipo:"button",
            accion:`/inventario/${useParams().toolId}/editarherramienta/deleteherramienta`                   
        },        
    ];   

    // direccion formulario editar

    const dirFormEdit = `/inventario/${useParams().toolId}/editarherramienta`;

    return (

        <>

            <Modal         
                title="Editar Herramienta"
                estiloModal="modal_completo"
                botoncss="btn_ModalIntermedio"
                botones={btnsEditarHerramienta}
                >              

                <Form id="edit_tool" className="formularioEdit" name="edit_tool" action={dirFormEdit} method='post'>

                    <div className="img_ContPreview">

                        <div>
                            {img_pre && (<img id="img_Pre" className= "img-thumbnail" src={img_pre} alt="Preview"></img>)}                        
                        </div>

                        <div id="in_img">

                            <label htmlFor="image" className="form-label">Imagen:</label> 

                            <input 
                                type="file" 
                                id="image" 
                                name="image"
                                accept=".png"
                                onChange={handleronChange}                             
                            />

                            <input 
                                type="text" 
                                id="imageBase64" 
                                name="imageBase64"
                                value={img_send}
                                style={{display: 'none'}}
                                readOnly                            
                            />

                            {tipo_img && <p className='error-form'>{tipo_img}</p>}                         

                        </div>  

                    </div>

                    <div className='inputNoImgAdd'>

                        <label htmlFor="id" className="form-label">ID:</label>

                        <input 
                            type='text' 
                            className="form-control"
                            name="id" 
                            id="id" 
                            placeholder={itemToMod.id}
                            value={itemToMod.id}                                  
                        />          

                        <label htmlFor="nombre" className="form-label">Nombre:</label>

                        <input 
                            type='text' 
                            className="form-control"
                            name="nombre" 
                            id="nombre" 
                            placeholder={itemToMod.nombre}
                            defaultValue={itemToMod.nombre}
                            maxLength ='25'
                            minLength ='3'
                            required
                        />                    

                        <label htmlFor="categoria" className="form-label">Categoria:</label>

                        <input 
                            type="text" 
                            className="form-control"
                            name="categoria" 
                            id="categoria" 
                            placeholder={itemToMod.categoria}
                            defaultValue={itemToMod.categoria}
                            maxLength ='25'
                            minLength ='3'
                            required
                        />                    

                        <label htmlFor="cantidad" className="form-label">Cantidad:</label>

                        <input 
                            type="number" 
                            className="form-control"
                            name="cantidad" 
                            id="cantidad" 
                            placeholder={itemToMod.cantidad}
                            defaultValue={itemToMod.cantidad}
                            min='1'
                            required
                        />                    

                        <label htmlFor="rol" className="form-label">Rol:</label>

                        <input 
                            type="text" 
                            className="form-control"
                            name="rol" 
                            id="rol" 
                            placeholder={itemToMod.rol}
                            defaultValue={itemToMod.rol}
                            maxLength ='25'
                            minLength ='3'
                            required
                        />                   

                        <label htmlFor="marca" className="form-label">Marca:</label>

                        <input 
                            type="text" 
                            className="form-control"
                            name="marca" 
                            id="marca" 
                            placeholder={itemToMod.marca}
                            defaultValue={itemToMod.marca}
                            maxLength ='25'
                            minLength ='3'
                            required
                        />          

                        <label htmlFor="fecha_in" className="form-label">Fecha Ingreso:</label>

                        <input 
                            type="text" 
                            className="form-control"
                            name="fecha_in" 
                            id="fecha_in" 
                            placeholder={itemToMod.fecha_in}
                            value={itemToMod.fecha_in}                            
                        />                  

                    </div>                   

                </Form>            

            </Modal>  

            <Outlet />

        </>
        
        
    );
}
export default EditarHerramienta;

// funcion para capturar los datos del formulario

export const EditarHerrramientaAction = async ({ request, params}) => {  

    //recibir los datos del formulario    

    const data = await request.formData()    

    const dataToChange = {
        id: data.get('id'),
        nombre: data.get('nombre'),
        marca: data.get('marca'),         
        cantidad: Number(data.get('cantidad')),      
        categoria: data.get('categoria'),      
        rol: data.get('rol'),
        fecha_in: data.get('fecha_in')
    }

    const image_in = {
        id: dataToChange.id,
        image_name: data.get('image')        
    }

    const image_binary = data.get('imageBase64');    
  
    console.log("recibido del formulario",dataToChange,image_binary);   
    
    // funcion que envia los cambios al servidor

    const FormEditTool = async (props) => {

        const urlData = `http://localhost:8081/api/herramientas/${params.toolId}`;
    
        try {
            const response = await fetch(urlData, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(props),
            });
            
            if (!response.ok) {
              throw new Error('Fallo la actualizacion del registro');
            }else{
                console.log('Actualizacion de registro se realizo correctamente');
                return redirect(`/inventario/${params.toolId}`);
            }        

        } catch (error) {
            console.error(error);
        }        
    }  
    
    const EnvioDatosImagen = async (props) => {

        try{
            const response = await fetch('http://localhost:8081/api/images', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(props)
            });
            
            const result = response.ok;                        
            return result;            
        
        } catch(error) {            
            console.error('Error al enviar la solicitud:', error);                    
            return false;
        }
    }

    const EnvioImagen = async (props) => {
        try{
            const response = fetch(`http://localhost:8081/api/images/${params.toolId}`, {
              method: 'PUT',
              headers: {'Content-Type': 'application/octet-stream'},        
              body: props
            });
      
            const result = response.ok;                            
            return result;
        
        } catch(error) {
            console.error('Error al solicitar la imagen:', error);                    
            return false;
        }

    }

    const EnvioImagenCompleta = async (datos,imagen) => {

        try {
            const response = await fetch(`http://localhost:8081/api/images/${params.toolId}`);
                            
            if(!response.ok){
                const nuevaImagen = EnvioDatosImagen(datos);
                nuevaImagen.then((state) => {
                    if(state){
                        EnvioImagen(imagen);                        
                    }
                })                
            }else{
                EnvioImagen(imagen);
            }
            
        } catch (error) {            
            console.error('Error al solicitar la imagen:', error);                                
        }
    }    

    if(image_binary){
       EnvioImagenCompleta(image_in,image_binary);       
    }    

    return FormEditTool(dataToChange);    
}

// funcion para buscar datos de la herramienta a editar

export const editarherramientaLoader = async ({params}) => {        
    
    const detail = await fetch(`http://localhost:8081/api/herramientas/${params.toolId}`)           

    if (!detail.ok) {
        throw Error('No se pudo cargar la herramienta indicada')
      }
    
      return detail.json()
}