import './AgregarHerramienta.css';
import * as Icons from '../../Iconos/IndexIcons';
import {Modal} from '../../IndexComponents';
import {Form, Link, Navigate, useActionData} from 'react-router-dom';
import { useState, useEffect } from "react";

function AgregarHerramienta () {

    const herramienta = useActionData();    
    const enlaceCancelar = `/inventario`;    

    const [img_pre, setImg_Pre] = useState(null);
    const [tipo_img, setTipo_Img] = useState(null);
    const [img_send, setImg_Send] = useState(undefined);  
    const [ctrlEnvio, setCtrlEnvio] = useState(null);
    
    
    // Manejo de envio de datos al servidor

    const useFetchData = (dataHook) => {
        const [data, setData] = useState(null);
        const [data2, setData2] = useState(null);
        const [data3, setData3] = useState(null);
        const [loading, setLoading] = useState(true);        
      
        useEffect(() => {
          const fetchData = async () => {
                if(loading && dataHook!==undefined && !data){
                    setData(EnvioHerramienta());                    
                }

                if(loading && data && !data2 && dataHook.image_binary){
                    data.then((state) => {
                        if(state){
                            setData2(EnvioDatosImagen());
                        }
                    })
                }

                if(loading && data2 && !data3){
                    data2.then((state) => {
                        if(state){
                            setData3(EnvioImagen());
                        }
                    })
                }

                if(loading && data3 && !ctrlEnvio){
                    data3.then((state) => {
                        if(state){
                            setCtrlEnvio(true);
                        }
                    })
                }   
                
                if(loading && data && !data2 && !data3 && !dataHook.image_binary && !ctrlEnvio){
                    setCtrlEnvio(true);
                }
               
                if(loading && ctrlEnvio){
                    setLoading(false);
                }

            };      
          fetchData();
        }, [dataHook,data,data2,data3,loading,ctrlEnvio]);
      
        return { data, data2, data3, loading };
    };

    const { data, data2, data3, loading } = useFetchData(herramienta);
    
    useEffect(() => {
        if (!loading && data && data2 && data3) {
            console.log("Subida Herramienta:",data);          
            console.log("Subida datos imagen:", data2);
            console.log("Subida imagen:", data3);            
        }                
    }, [loading, data, data2]);

    const  EnvioHerramienta = async () => {                

        try{
            const response = await fetch('http://localhost:8081/api/herramientas', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(herramienta.entrada)
            });
            
            const result = response.ok;                                
            return result; 
        
        } catch(error) {            
            console.error('Error al enviar la solicitud:', error);            
            return false;
        }
    }

    const EnvioDatosImagen = async () => {

        try{
            const response = await fetch('http://localhost:8081/api/images', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(herramienta.image_in)
            });
            
            const result = response.ok;                        
            return result;            
        
        } catch(error) {            
            console.error('Error al enviar la solicitud:', error);                    
            return false;
        }
    }

    const EnvioImagen = async () => {

        try{
            const response = await fetch(`http://localhost:8081/api/images/${herramienta.entrada.id}`, {
              method: 'PUT',
              headers: {'Content-Type': 'application/octet-stream'},        
              body: herramienta.image_binary
            });
      
            const result = response.ok;                            
            return result;
        
        } catch(error) {
            console.error('Error al solicitar la imagen:', error);                    
            return false;
        }
    }    
    
    // manejo preview imagen formulario    
        

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

    // renderizado de formularios

    return (

        <Modal         
            title="Agregar Herramienta"
            estiloModal="modal_completo"            
            > 

            { ctrlEnvio && (<Navigate to={`/inventario/${herramienta.entrada.id}`} replace={true} />) }
             
            <div className="btn-group btn_ModalIntermedio" role="group" aria-label="Large button group">

                <button  
                    form='add_tool'
                    type="submit" 
                    className="btn boton btn-primary"                                       
                >                
                    <Icons.Tool2Icono id="icobtn"/>Registrar              

                </button> 

                <Link to={enlaceCancelar}>
                    <button  
                        type="button" 
                        className="btn boton btn-secondary"                                                                                   
                    >                
                        <Icons.CancelIcono id="icobtn"/>Cancelar              

                    </button>            
                </Link>
            </div> 


            
            <Form id="add_tool" name="add_tool" className="formulario" action="/inventario/agregarherramienta" method='post'>                                       

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

                    <label htmlFor="nombre" className="form-label">Nombre:</label>

                    <input 
                        type='text' 
                        className="form-control inputs_Add_Tool"
                        name="nombre" 
                        id="nombre" 
                        placeholder='Ingrese nombre de herramienta'
                        maxLength ='25'
                        minLength ='3'
                        required
                    />                    

                    <label htmlFor="categoria" className="form-label">Categoria:</label>

                    <input 
                        type="text" 
                        className="form-control inputs_Add_Tool"
                        name="categoria" 
                        id="categoria" 
                        placeholder='Ingrese categoria de herramienta'
                        maxLength ='25'
                        minLength ='3'
                        required
                    />                    

                    <label htmlFor="cantidad" className="form-label">Cantidad:</label>

                    <input 
                        type="number" 
                        className="form-control inputs_Add_Tool"
                        name="cantidad" 
                        id="cantidad" 
                        placeholder='Ingrese numero de unidades'
                        min='1'
                        required
                    />                    

                    <label htmlFor="rol" className="form-label">Rol:</label>

                    <input 
                        type="text" 
                        className="form-control inputs_Add_Tool"
                        name="rol" 
                        id="rol" 
                        placeholder='Ingrese rol de herramienta'
                        maxLength ='25'
                        minLength ='3'
                        required
                    />                   

                    <label htmlFor="marca" className="form-label">Marca:</label>

                    <input 
                        type="text" 
                        className="form-control inputs_Add_Tool"
                        name="marca" 
                        id="marca" 
                        placeholder='Ingrese marca de la herramienta'
                        maxLength ='25'
                        minLength ='3'
                        required
                    />                   

                </div>

            </Form>          
            
        </Modal>
      
    );

}
export default AgregarHerramienta;


// manejo datos de los formularios

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

    const data = await request.formData();            
  
    const entrada = {
      id: generateRandomId(5),  
      nombre: data.get('nombre'),
      marca: data.get('marca'),         
      cantidad: Number(data.get('cantidad')),      
      categoria: data.get('categoria'),      
      rol: data.get('rol'),
      fecha_in: fechaActual()            
    }

    const image_in = {
        id: entrada.id,
        image_name: data.get('image'),        
    }

    const image_binary = data.get('imageBase64');    
    
    const nuevaherramienta = [{}];

    nuevaherramienta.entrada = entrada;
    nuevaherramienta.image_in = image_in;
    nuevaherramienta.image_binary = image_binary;
    
    console.log("recibido del formulario",nuevaherramienta);   

    return nuevaherramienta;    
    
}


