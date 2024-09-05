import './AgregarProveedor.css';
import {Modal,TraerImagenes, BarraDeCarga} from '../../IndexComponents';
import {Form, useNavigate, useLoaderData, useActionData} from 'react-router-dom';
import FormAddProveedor from './FormAddProveedor';
import { useState, useEffect } from "react";

function AgregarProveedor() {

    const dataNewProveedor = useActionData();    
    const listado_Herramienta = useLoaderData();    
    const navigate = useNavigate();    
    
    const [checkedItems, setCheckedItems] = useState({});   
    const [subidaState, setSubidaState] = useState(null);
    const [progress, setProgress] = useState(0);           

    useEffect(() => {

        if(dataNewProveedor){
            const nuevoKit = FormAddProveedor(dataNewProveedor);
            nuevoKit.then((state) => {
                if(state){
                    setSubidaState(state);                    
                }
            });            
        }

    }, [dataNewProveedor]);

    useEffect(() => {

        if(dataNewProveedor){

            const interval = setTimeout(() => {
                if (progress < 100) {
                  setProgress(prev => prev + 10);  
                }
            }, 150);
    
            if(subidaState && progress===100){
                navigate(`/proveedores/${dataNewProveedor.id}`);                
            }
    
            return () => clearTimeout(interval);
        }
                
    },[dataNewProveedor,progress]);



    // manejador eventos checkbox

    const handleChangeCheckbox = (e) => {
      setCheckedItems({
        ...checkedItems,
        [e.target.id]: e.target.checked
      });
    };

    // arreglo herramientas - cantidades   

    const btnsAgregarProveedor = [
        {
            btnname:"Registar",
            icobtn:"ProveedorIcono",
            estiloBoton:"btn-primary",
            formulario:"add_Proveedor",            
            tipo:"submit", 
            accion:"null",                                         
        },

        {
            btnname:"Cancelar",
            icobtn:"CancelIcono",
            estiloBoton:"btn-secondary",            
            accion:"/proveedores"
        }        
    ]; 
    

    return (

        <Modal         
            title="Agregar Proveedor"
            estiloModal="modal_completo"
            botoncss="btn_ModalIntermedio"
            botones={btnsAgregarProveedor}
            >

            {dataNewProveedor && <BarraDeCarga progress={progress}/>}

            <Form className='formularioAgregarProveedor' id="add_Proveedor" name="add_Proveedor" action="/proveedores/agregarproveedor" method='post'>

                <div className='inputNoCheckbox'>

                    <label htmlFor="name_Proveedor" className="form-label">Nombre:</label>

                    <input 
                        type='text' 
                        className="form-control"
                        name="name_Proveedor" 
                        id="name_Proveedor" 
                        placeholder='Ingrese nombre del proveedor'
                        maxLength ='25'
                        minLength ='3'                        
                        required
                    />                      

                    <label htmlFor="phone_Proveedor" className="form-label">Telefono:</label>

                    <input 
                        type='text' 
                        className="form-control"
                        name="phone_Proveedor" 
                        id="phone_Proveedor" 
                        placeholder='Ingrese telefono del proveedor'
                        maxLength ='25'
                        minLength ='3'     
                        required
                    />           

                     <label htmlFor="city_Proveedor" className="form-label">Ciudad:</label>

                    <input 
                        type='text' 
                        className="form-control"
                        name="city_Proveedor" 
                        id="city_Proveedor" 
                        placeholder='Ingrese ciudad del proveedor'
                        maxLength ='25'
                        minLength ='3'     
                        required
                    />                 

                </div>             

                <div className='listaHerramienta'>

                    {listado_Herramienta.map((opcion) => (
                        
                        <div className='itemHerramienta rounded' key={opcion.id}>

                            <input
                                type="checkbox"
                                id={opcion.id}                                                                
                                name='tool'
                                value={opcion.id}
                                checked={checkedItems[opcion.id] || false}
                                onChange={handleChangeCheckbox}
                            />                                                                          
                            
                            <label className='sizeLabel'> 
                                ID: <h6 className='fw-bold control_Texto'>{opcion.id}</h6> 
                                Nombre: <h6 className='text-primary control_Texto'>{opcion.nombre}</h6> 
                                Marca: <h6 className='text-success control_Texto'>{opcion.marca}</h6>
                            </label>                            

                            <TraerImagenes tipo='1' ancho='125px' alto='125px' imageId={opcion.id} /> 

                        </div>                        
                    ))}  

                </div>

            </Form>              
        
        </Modal>
    ) 
}
export default AgregarProveedor;


// trae listado de herramientas disponibles

export const agregarProveedorLoader = async () => {

    const token = localStorage.getItem('token'); 
    
    const tools = await fetch('http://localhost:8081/api/herramientas',{
        method:'GET',
        headers: {'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`},
    })              
    

    if (!tools.ok) {
        throw Error('No se pudo cargar el listado de herramientas')
      }
    
      return tools.json()
}

// manejo data formulario

export const AgregarProveedorAction = async ({ request }) => {

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

    // extractor de fecha

    function fechaActual() {

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;

    }

    //recibir los datos del formulario

    const proveedor = await request.formData()

    // definicion de arreglos de manejo
    
    const formProveedor = {};
    const pack = [];

    //extraccion de datos del formData

    proveedor.forEach((value, key) => { 
        const tool = {} ;
        if(key === 'tool'){
            tool['id'] = value;            
            pack.push(tool);                   
        }        
        else{ formProveedor[key]=value; }        
    }); 
    
    const herramientas = pack;

    // creacion de objeto
    
    const proveedorData = {
    id : generateRandomId(5),
    nombre : formProveedor['name_Proveedor'],
    telefono : formProveedor['phone_Proveedor'],
    ciudad: formProveedor['city_Proveedor'],
    fecha_in : fechaActual(),
    estado: 0,
    herramientas:herramientas    
    };

    console.log("recibido del formulario",proveedorData);    
    
    return proveedorData;
}
