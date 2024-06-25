import './EditarOperario.css';
import { Form, useParams, useLoaderData, redirect, Outlet} from "react-router-dom";
import { useState } from "react";
import { Modal } from '../../IndexComponents';


function EditarOperario(){     
    
    const operarioToMod = useLoaderData();      
    
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

    const btnsEditarOperario = [
        {
            btnname:"Actualizar",
            icobtn:"OperPanelIcono",
            estiloBoton:"btn-primary",
            formulario:"edit_worker",            
            tipo:"submit",
            accion:"null"                
        },

        {
            btnname:"Cancelar",
            icobtn:"CancelIcono",
            estiloBoton:"btn-secondary",
            accion:`/operarios/${useParams().workerId}`            
        },

        {
            btnname:"Eliminar",
            icobtn:"EliminarIcono",
            estiloBoton:"btn-danger",                                                          
            tipo:"button",
            accion:`/operarios/${useParams().workerId}/editaroperario/deleteoperario`                   
        },        
    ];   

    // direccion formulario editar

    const dirFormEdit = `/operarios/${useParams().workerId}/editaroperario`;

    return (

        <>

            <Modal         
                title="Editar Operario"
                estiloModal="modal_completo"
                botoncss="btn_ModalIntermedio"
                botones={btnsEditarOperario}
                >              

                <Form id="edit_worker" className="formularioEditEworker" name="edit_worker" action={dirFormEdit} method='post'>

                    <div className="img_ContPreview_workerEdit">

                        <div>
                            {img_pre && (<img id="img_PreEworker" className= "img-thumbnail" src={img_pre} alt="Preview"></img>)}                        
                        </div>

                        <div id="in_imgEworker">

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

                            {tipo_img && <p className='error-formEworker'>{tipo_img}</p>}                         

                        </div>  

                    </div>

                    <div className='inputNoImgEditEworker'>

                        <label htmlFor="id" className="form-label">ID:</label>

                        <input 
                            type='text' 
                            className="form-control inputs_Edit_Eworker"
                            name="id" 
                            id="id" 
                            placeholder={operarioToMod.id}
                            defaultValue={operarioToMod.id}                                  
                            readOnly
                        />          

                        <label htmlFor="nombre" className="form-label">Nombre:</label>

                        <input 
                            type='text' 
                            className="form-control inputs_Edit_Eworker"
                            name="nombre" 
                            id="nombre" 
                            placeholder={operarioToMod.nombre}
                            defaultValue={operarioToMod.nombre}
                            maxLength ='25'
                            minLength ='3'
                            required
                        />                           

                        <label htmlFor="rol" className="form-label">Rol:</label>

                        <input 
                            type="text" 
                            className="form-control inputs_Edit_Eworker"
                            name="rol" 
                            id="rol" 
                            placeholder={operarioToMod.rol}
                            defaultValue={operarioToMod.rol}
                            maxLength ='25'
                            minLength ='3'
                            required
                        />                          

                        <label htmlFor="fecha_in" className="form-label">Fecha Ingreso:</label>

                        <input 
                            type="text" 
                            className="form-control inputs_Edit_Eworker"
                            name="fecha_in" 
                            id="fecha_in" 
                            placeholder={operarioToMod.fecha_in}
                            defaultValue={operarioToMod.fecha_in}                            
                            readOnly
                        />                  

                    </div>                   

                </Form>            

            </Modal>  

            <Outlet />

        </>
        
        
    );
}
export default EditarOperario;

// funcion para capturar los datos del formulario

export const EditarOperarioAction = async ({ request, params}) => {  

    //recibir los datos del formulario    

    const data = await request.formData()    

    const dataToChange = {
        id: data.get('id'),
        nombre: data.get('nombre'),        
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

    const FormEditWorker = async (props) => {

        const urlData = `http://localhost:8081/api/operarios/${params.workerId}`;
    
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
                return redirect(`/operarios/${params.workerId}`);
            }        

        } catch (error) {
            console.error(error);
        }        
    }  
    
    const EnvioDatosImagen = async (props) => {

        try{
            const response = await fetch('http://localhost:8081/api/imagesworker', {
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
            const response = fetch(`http://localhost:8081/api/imagesworker/${params.workerId}`, {
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
            const response = await fetch(`http://localhost:8081/api/imagesworker/${params.workerId}`);
                            
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

    return FormEditWorker(dataToChange);    
}

// funcion para buscar datos de la herramienta a editar

export const editarOperarioLoader = async ({params}) => {        
    
    const detail = await fetch(`http://localhost:8081/api/operarios/${params.workerId}`)           

    if (!detail.ok) {
        throw Error('No se pudo cargar el operario indicada')
      }
    
      return detail.json()
}