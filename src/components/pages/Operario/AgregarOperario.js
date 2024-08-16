import './AgregarOperario.css';
import * as Icons from '../../Iconos/IndexIcons';
import {Modal} from '../../IndexComponents';
import {Form, Link, useNavigate, useActionData} from 'react-router-dom';
import { useState, useEffect } from "react";

function AgregarOperario () {

    const operario = useActionData();   
    const navigate = useNavigate(); 
    const enlaceCancelarOperario = `/operarios`;    
    const token = localStorage.getItem('token');

    const [img_preWorker, setImg_PreWorker] = useState(null);
    const [tipo_imgWorker, setTipo_ImgWorker] = useState(null);
    const [img_sendWorker, setImg_SendWorker] = useState(undefined);  
    const [ctrlEnvioWorker, setCtrlEnvioWorker] = useState(null);
    
    
    // Manejo de envio de datos al servidor

    const useFetchData = (dataHookWorker) => {
        const [dataWorker, setDataWorker] = useState(null);
        const [data2Worker, setData2Worker] = useState(null);
        const [data3Worker, setData3Worker] = useState(null);
        const [loadingWorker, setLoadingWorker] = useState(true);        
      
        useEffect(() => {
          const fetchDataWorker = async () => {
                if(loadingWorker && dataHookWorker!==undefined && !dataWorker){
                    setDataWorker(EnvioOperario());                    
                }

                if(loadingWorker && dataWorker && !data2Worker && dataHookWorker.image_binary){
                    dataWorker.then((state) => {
                        if(state){
                            setData2Worker(EnvioDatosImagen());
                        }
                    })
                }

                if(loadingWorker && data2Worker && !data3Worker){
                    data2Worker.then((state) => {
                        if(state){
                            setData3Worker(EnvioImagen());
                        }
                    })
                }

                if(loadingWorker && data3Worker && !ctrlEnvioWorker){
                    data3Worker.then((state) => {
                        if(state){
                            setCtrlEnvioWorker(true);
                            let timeRedir = setTimeout(redireccionar,1500);
                        }
                    })
                }   
                
                if(loadingWorker && dataWorker && !data2Worker && !data3Worker && !dataHookWorker.image_binary && !ctrlEnvioWorker){
                    setCtrlEnvioWorker(true);
                    let timeRedir = setTimeout(redireccionar,1500);
                }
               
                if(loadingWorker && ctrlEnvioWorker){
                    setLoadingWorker(false);
                }

            };      
          fetchDataWorker();
        }, [dataHookWorker,dataWorker,data2Worker,data3Worker,loadingWorker]);
      
        return { dataWorker, data2Worker, data3Worker, loadingWorker };
    };

    const { dataWorker, data2Worker, data3Worker, loadingWorker } = useFetchData(operario);
    
    useEffect(() => {
        if (!loadingWorker && dataWorker && data2Worker && data3Worker) {
            console.log("Subida Operario:",dataWorker);          
            console.log("Subida datos imagen:", data2Worker);
            console.log("Subida imagen:", data3Worker);            
        }                
    }, [loadingWorker, dataWorker, data2Worker]);

    const redireccionar = () => {
        navigate(`/operarios/${operario.entrada.id}`);
    }

    const  EnvioOperario = async () => {                

        try{
            const response = await fetch('http://localhost:8081/api/operarios', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`},
            body: JSON.stringify(operario.entrada)
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
            const response = await fetch('http://localhost:8081/api/imagesworker', {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`},
                body: JSON.stringify(operario.image_in)
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
            const response = await fetch(`http://localhost:8081/api/imagesworker/${operario.entrada.id}`, {
              method: 'PUT',
              headers: {'Content-Type': 'application/octet-stream',
              'Authorization': `Bearer ${token}`},        
              body: operario.image_binary
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
            setImg_SendWorker(base64String);           
            setImg_PreWorker(reader.result);                        
        }       
        
        
        if (file && file.type !== 'image/png') {
            setTipo_ImgWorker ("Tipo de imagen no valido, por favor ingrese un archivo tipo PNG"); 
            setImg_PreWorker(null);
            return             
        }        
         
        if (file) {
            reader.readAsDataURL(file);                        
            setTipo_ImgWorker(null);            
        }                       
    }        

    // renderizado de formularios

    return (

        <Modal         
            title="Agregar Operario"
            estiloModal="modal_completo"            
            >            
             
            <div className="btn-group btn_ModalIntermedio" role="group" aria-label="Large button group">

                <button  
                    form='add_operario'
                    type="submit" 
                    className="btn botonWorker btn-primary"                                       
                >                
                    <Icons.Tool2Icono id="icobtnWorker"/>Registrar              

                </button> 

                <Link to={enlaceCancelarOperario}>
                    <button  
                        type="button" 
                        className="btn botonWorker btn-secondary"                                                                                   
                    >                
                        <Icons.CancelIcono id="icobtnWorker"/>Cancelar              

                    </button>            
                </Link>
            </div> 


            
            <Form id="add_operario" name="add_operario" className="formularioWorker" action="/operarios/agregaroperario" method='post'>                                       

                <div className="img_ContPreviewWorker">

                    <div>
                        {img_preWorker && (<img id="img_PreWorker" className= "img-thumbnail" src={img_preWorker} alt="Preview"></img>)}                        
                    </div>

                    <div id="in_imgWorker">

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
                            value={img_sendWorker}
                            style={{display: 'none'}}
                            readOnly                            
                        />

                        {tipo_imgWorker && <p className='error-formWorker'>{tipo_imgWorker}</p>}                         

                    </div>  

                </div>

                <div className='inputNoImgAddWorker'>

                    <label htmlFor="id" className="form-label">ID:</label>

                    <input 
                        type='text' 
                        className="form-control inputs_Add_Worker"
                        name="id" 
                        id="id" 
                        placeholder='Ingrese identificación del operario'
                        maxLength ='15'
                        minLength ='5'
                        required
                    />         

                    <label htmlFor="nombre" className="form-label">Nombre:</label>

                    <input 
                        type='text' 
                        className="form-control inputs_Add_Worker"
                        name="nombre" 
                        id="nombre" 
                        placeholder='Ingrese nombre del operario'
                        maxLength ='25'
                        minLength ='3'
                        required
                    />                    

                    <label htmlFor="rol" className="form-label">Rol:</label>

                    <input 
                        type="text" 
                        className="form-control inputs_Add_Worker"
                        name="rol" 
                        id="rol" 
                        placeholder='Ingrese rol de herramienta'
                        maxLength ='25'
                        minLength ='3'
                        required
                    />      

                    <label htmlFor="telefono" className="form-label">Telefono:</label>

                    <input 
                        type="text" 
                        className="form-control inputs_Add_Worker"
                        name="telefono" 
                        id="telefono" 
                        placeholder='Ingrese rol de herramienta'
                        maxLength ='15'
                        minLength ='7'
                        required
                    />        

                    <label htmlFor="email" className="form-label">E-mail:</label>

                    <input 
                        type="email" 
                        className="form-control inputs_Add_Worker"
                        name="email" 
                        id="email" 
                        placeholder='Ingrese rol de herramienta'
                        maxLength ='30'
                        minLength ='10'
                        required
                    />                           

                </div>

            </Form>          
            
        </Modal>
      
    );

}
export default AgregarOperario;


// manejo datos de los formularios

export const AgregarOperarioAction = async ({ request }) => {

    function fechaActual() {

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;
    }    

    const dataWorker = await request.formData();            
  
    const entrada = {
      id: dataWorker.get('id'),
      nombre: dataWorker.get('nombre'),      
      rol: dataWorker.get('rol'),
      telefono: dataWorker.get('telefono'),
      email: dataWorker.get('email'),
      estado: 0,
      fecha_in: fechaActual()            
    }

    const image_in = {
        id: entrada.id,
        image_name: dataWorker.get('image'),        
    }

    const image_binary = dataWorker.get('imageBase64');    
    
    const nuevoOperario = [{}];

    nuevoOperario.entrada = entrada;
    nuevoOperario.image_in = image_in;
    nuevoOperario.image_binary = image_binary;
    
    console.log("recibido del formulario",nuevoOperario);   

    return nuevoOperario;    
    
}
