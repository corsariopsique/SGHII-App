import './EditarHerramienta.css';
import { Form, useParams, useLoaderData, useActionData, useNavigate, Outlet} from "react-router-dom";
import { useState, useEffect } from "react";
import { Modal } from '../../IndexComponents';


function EditarHerramienta(){     
    
    const itemToMod = useLoaderData();  
    const idTool = useParams().toolId;
    const verificacion = useActionData();    
    const navigate = useNavigate();
    
    useEffect(() => {

        if(verificacion){             
            navigate(`/inventario/${idTool}`);            
        }        
        
    }, [verificacion]);
    
    //control previsualizacion imagen

    const [img_pre, setImg_Pre] = useState(null);
    const [tipo_img, setTipo_Img] = useState(null);      
    const [img_send, setImg_Send] = useState(undefined);  

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

                    <div className="img_ContPreview_ToolEdit">

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

                    <div className='inputNoImgEdit'>

                        <label htmlFor="id" className="form-label">ID:</label>

                        <input 
                            type='text' 
                            className="form-control inputs_Edit_Tool"
                            name="id" 
                            id="id" 
                            placeholder={itemToMod.id}
                            defaultValue={itemToMod.id}                                  
                            readOnly
                        />          

                        <label htmlFor="nombre" className="form-label">Nombre:</label>

                        <input 
                            type='text' 
                            className="form-control inputs_Edit_Tool"
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
                            className="form-control inputs_Edit_Tool"
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
                            className="form-control inputs_Edit_Tool"
                            name="cantidad" 
                            id="cantidad" 
                            placeholder={itemToMod.cantidad}
                            defaultValue={itemToMod.cantidad}
                            min='1'
                            required
                        />

                        <label htmlFor="cantidad_disponible" className="form-label">Cantidad Disponible:</label>

                        <input 
                            type="number" 
                            className="form-control inputs_Edit_Tool"
                            name="cantidad_disponible" 
                            id="cantidad_disponible" 
                            placeholder={itemToMod.cantidad_disponible}
                            defaultValue={itemToMod.cantidad_disponible}
                            readOnly
                        />  

                        <input 
                            type="number" 
                            className="form-control inputs_Edit_Tool"
                            name="cantidad_respaldo" 
                            id="cantidad_respaldo"                             
                            defaultValue={itemToMod.cantidad}
                            style={{display: 'none'}}
                            readOnly
                        />

                        <input 
                            type="number" 
                            className="form-control inputs_Edit_Tool"
                            name="cantidad_kits" 
                            id="cantidad_kits"                             
                            defaultValue={itemToMod.cantidad_kits}
                            style={{display: 'none'}}
                            readOnly
                        />                                

                        <label htmlFor="rol" className="form-label">Rol:</label>

                        <input 
                            type="text" 
                            className="form-control inputs_Edit_Tool"
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
                            className="form-control inputs_Edit_Tool"
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
                            className="form-control inputs_Edit_Tool"
                            name="fecha_in" 
                            id="fecha_in" 
                            placeholder={itemToMod.fecha_in}
                            defaultValue={itemToMod.fecha_in}                            
                            readOnly
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
    
    const nueva_cantidad = Number(data.get('cantidad'));
    const cantidad_disponible = Number(data.get('cantidad_disponible'));
    const cantidad_respaldo = Number(data.get('cantidad_respaldo'));
    const cantidad_prestados = cantidad_respaldo - cantidad_disponible;
    const nueva_cant_disponible = nueva_cantidad - cantidad_prestados;

    const dataToChange = {
        id: data.get('id'),
        nombre: data.get('nombre'),
        marca: data.get('marca'),         
        cantidad: nueva_cantidad,   
        cantidad_disponible: nueva_cant_disponible,
        cantidad_kits: data.get('cantidad_kits'),
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

    const token = localStorage.getItem('token');

    const FormEditTool = async (props) => {

        const urlData = `http://localhost:8081/api/herramientas/${params.toolId}`;
    
        try {
            const response = await fetch(urlData, {
              method: 'PUT',
              headers: {'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`},
              body: JSON.stringify(props),
            });

            if (!response.ok) {
                throw new Error('Fallo la actualizacion del registro');
              }else{
                  console.log('Actualizacion de registro se realizo correctamente');
                  return response.ok;
              }        

        } catch (error) {
            console.error(error);
        }        
    }  
    
    const EnvioDatosImagen = async (props) => {

        try{
            const response = await fetch('http://localhost:8081/api/images', {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`},
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
              headers: {'Content-Type': 'application/octet-stream',
              'Authorization': `Bearer ${token}`},        
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
            const response = await fetch(`http://localhost:8081/api/images/${params.toolId}`,{
                method:'GET',
                headers: {'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`}
            });
                            
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
    
    const token = localStorage.getItem('token');
    
    const detail = await fetch(`http://localhost:8081/api/herramientas/${params.toolId}`, {
        method:'GET',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
    });

    if (!detail.ok) {
        throw Error('No se pudo cargar la herramienta indicada')
      }
    
      return detail.json()
}