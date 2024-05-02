import './EditarHerramienta.css';
import { Form, useParams, useActionData, useLoaderData, redirect, Outlet } from "react-router-dom";
import { useState } from "react";
import { Modal } from '../IndexComponents';


function EditarHerramienta(){ 
    
    const datos = useActionData();
    const itemToMod = useLoaderData();      
    
    //control previsualizacion imagen

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
            accion:`/inventario/${useParams().toolId}/editarherramienta/${useParams().toolId}/deleteherramienta`                   
        },        
    ];   

    // direccion formulario editar

    const dirFormEdit = `/inventario/${useParams().toolId}/editarherramienta`;

    return (

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
                        <label htmlFor="tool_image" className="form-label">Imagen:</label> 
                        <input 
                            type="file" 
                            id="tool_image" 
                            name="tool_image"
                            accept=".png"                                
                            onChange={handleronChange}                                                             
                        />

                        {tipo_img && <p className='error-form'>{tipo_img}</p>} 
                        {datos && datos["image"] && <p className='error-form'>{datos["image"]}</p>}                             

                    </div>                    
                </div>

                <div className='inputNoImgEdit'>

                    <label htmlFor="id_tool" className="form-label">ID Herramienta:</label>

                    <input 
                        type='text' 
                        className="form-control"
                        name="id_tool" 
                        id="id_tool" 
                        placeholder={itemToMod.id}
                        value={itemToMod.id}                        
                    />                    

                    <label htmlFor="name_tool" className="form-label">Nombre:</label>

                    <input 
                        type='text' 
                        className="form-control"
                        name="name_tool" 
                        id="name_tool" 
                        placeholder={itemToMod.tool}
                        defaultValue={itemToMod.tool}                        
                    />                

                    {datos && datos["name"] && <p className='error-form'>{datos["name"]}</p>}               

                    <label htmlFor="cat_tool" className="form-label">Categoria:</label>

                    <input 
                        type="text" 
                        className="form-control"
                        name="cat_tool" 
                        id="cat_tool" 
                        placeholder={itemToMod.cat}
                        defaultValue={itemToMod.cat}                        
                    />

                    {datos && datos["cat"] && <p className='error-form'>{datos["cat"]}</p>}               

                    <label htmlFor="cantidad_tool" className="form-label">Cantidad:</label>

                    <input 
                        type="number" 
                        className="form-control"
                        name="cantidad_tool" 
                        id="cantidad_tool" 
                        placeholder={itemToMod.cant}
                        defaultValue={itemToMod.cant}                        
                    /> 

                    {datos && datos["cant"] && <p className='error-form'>{datos["cant"]}</p>}               

                    <label htmlFor="role_tool" className="form-label">Rol:</label>

                    <input 
                        type="text" 
                        className="form-control"
                        name="role_tool" 
                        id="role_tool" 
                        placeholder={itemToMod.rol}
                        defaultValue={itemToMod.rol}
                    />

                    {datos && datos["rol"] && <p className='error-form'>{datos["rol"]}</p>}               

                    <label htmlFor="brand_tool" className="form-label">Marca:</label>

                    <input 
                        type="text" 
                        className="form-control"
                        name="brand_tool" 
                        id="brand_tool" 
                        placeholder={itemToMod.brand}
                        defaultValue={itemToMod.brand}
                    />  

                    {datos && datos["brand"] && <p className='error-form'>{datos["brand"]}</p>}   

                    <label htmlFor="date_in" className="form-label">Fecha Ingreso Herramienta:</label>

                    <input 
                        type='text' 
                        className="form-control"
                        name="date_in" 
                        id="date_in" 
                        placeholder={itemToMod.date_in}
                        value={itemToMod.date_in}                        
                    />                    

                    <label htmlFor="id_prove" className="form-label">ID Proveedor:</label>

                    <input 
                        type='text' 
                        className="form-control"
                        name="id_prove" 
                        id="id_prove" 
                        placeholder={itemToMod.prove.id_prove}
                        value={itemToMod.prove.id_prove}                        
                    />        

                    <label htmlFor="name_prove" className="form-label">Nombre proveedor:</label>

                    <input 
                        type='text' 
                        className="form-control"
                        name="name_prove" 
                        id="name_prove" 
                        placeholder={itemToMod.prove.name}
                        defaultValue={itemToMod.prove.name}
                    />                

                    {datos && datos["name_prove"] && <p className='error-form'>{datos["name_prove"]}</p>}       

                    <label htmlFor="phone_prove" className="form-label">Telefono proveedor:</label>

                    <input 
                        type='text' 
                        className="form-control"
                        name="phone_prove" 
                        id="phone_prove" 
                        placeholder={itemToMod.prove.phone}
                        defaultValue={itemToMod.prove.phone}
                    />                

                    {datos && datos["phone_prove"] && <p className='error-form'>{datos["phone_prove"]}</p>}

                    <label htmlFor="city_prove" className="form-label">Ciudad proveedor:</label>

                    <input 
                        type='text' 
                        className="form-control"
                        name="city_prove" 
                        id="city_prove" 
                        placeholder={itemToMod.prove.city}
                        defaultValue={itemToMod.prove.city}
                    />                

                    {datos && datos["city_prove"] && <p className='error-form'>{datos["city_prove"]}</p>}                                

                </div>

            </Form>

            <Outlet />

        </Modal>  
        
        
    );
}
export default EditarHerramienta;

// funcion para capturar los datos del formulario

export const EditarHerrramientaAction = async ({ request, params}) => {  

    //recibir los datos del formulario    

    const data = await request.formData()
    const errors = {};    

     // manejo verificacion formulario     
  
    const dataToChange = {      
      tool: data.get('name_tool'),
      brand: data.get('brand_tool'),         
      cant: Number(data.get('cantidad_tool')),      
      cat: data.get('cat_tool'),      
      rol: data.get('role_tool'),    
      date_in: data.get('date_in'),  
      prove:{     
        id_prove: data.get('id_prove'),   
        name: data.get('name_prove'),
        phone: data.get('phone_prove'),
        city: data.get('city_prove')
      },
      image: data.get('tool_image').split(".")[0]
    }
  
    console.log("recibido del formulario",dataToChange);
  
    // send your post request
  
    if (dataToChange.tool.length < 3) {
        errors.name = 'Debe ingresar un nombre valido para la herramienta';
    }

    if (dataToChange.cat.length < 3) {
        errors.cat = 'Debe ingresar una categoria valida para la herramienta';
    }

    if (dataToChange.cant === 0) {        
        errors.cant = 'Debe ingresar una cantidad diferente de 0 para la herramienta';
    }

    if (dataToChange.rol.length < 3) {
        errors.rol = 'Debe asignar un rol valido para la herramienta';
    }

    if (dataToChange.brand.length < 3) {
        errors.brand = 'Debe ingresar una marca valido para la herramienta';
    }

    if (dataToChange.prove.name.length < 3) {
        errors.name_prove = 'Debe ingresar un nombre de proveedor valido';
    }

    if (dataToChange.prove.phone.length < 10) {
        errors.phone_prove = 'Debe ingresar un telefono de proveedor valido';
    }

    if (dataToChange.prove.city.length < 3) {
        errors.city_prove = 'Debe ingresar una ciudad de proveedor valida';
    }

    if (data.get('tool_image').includes(".png") !== true) {        
        errors.image = 'Debe ingresar una imagen valida para la herramienta';
    }      

    if (Object.keys(errors).length) {
        console.log(errors);
        return errors;
    }  
    
    // funcion que envia los cambios al servidor

    const FormEditTool = (props) => {

        const urlData = `http://localhost:4000/tools/${params.toolId}`;
    
        try {
            const response = fetch(urlData, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(props),
            });
            if (!response.ok) {
              throw new Error('Fallo la actualizacion del registro');
            }
            console.log('Actualizacion de registro se realizo correctamente');
    
        } catch (error) {
            console.error(error);
        }
    }
    FormEditTool(dataToChange);

    // redirect the user
    return redirect(`/inventario/${params.toolId}`);
}

// funcion para buscar datos de la herramienta a editar

export const editarherramientaLoader = async ({params}) => {        
    
    const detail = await fetch(`http://localhost:4000/tools/${params.toolId}`)           

    if (!detail.ok) {
        throw Error('No se pudo cargar la herramienta indicada')
      }
    
      return detail.json()
}