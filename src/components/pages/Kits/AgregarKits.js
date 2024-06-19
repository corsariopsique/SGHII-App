import './AgregarKits.css';
import {Modal,TraerImagenes} from '../../IndexComponents';
import FormAddKit from './FormAddKit';
import {Form, redirect, useLoaderData} from 'react-router-dom';
import { useState } from "react";
import FormAddToolKit from './FormAddToolKit';

export default function AgregarKits() {
    
    const listado_Herramienta = useLoaderData();
    
    const [checkedItems, setCheckedItems] = useState({});    
    const [cantItems, setCantItems] = useState({});

    // manejador eventos checkbox

    const handleChangeCheckbox = (e) => {
      setCheckedItems({
        ...checkedItems,
        [e.target.id]: e.target.checked
      });
    };    

    // arreglo herramientas - cantidades

    const handleChangeCantidades = (e) => {
        setCantItems({
          ...cantItems          
        });
    };    

    const btnsAgregarKit = [
        {
            btnname:"Registar",
            icobtn:"Tool2Icono",
            estiloBoton:"btn-primary",
            formulario:"add_kit",            
            tipo:"submit", 
            accion:"null",                                         
        },

        {
            btnname:"Cancelar",
            icobtn:"CancelIcono",
            estiloBoton:"btn-secondary",            
            accion:"/kits"
        }        
    ]; 
    

    return (

        <Modal         
            title="Agregar Kits"
            estiloModal="modal_completo"
            botoncss="btn_ModalIntermedio"
            botones={btnsAgregarKit}
            >

            <Form className='formularioAgregarKits' id="add_kit" name="add_kit" action="/kits/agregarkits" method='post'>

                <div className='inputNoCheckbox'>

                    <label htmlFor="name_kit" className="form-label">Nombre:</label>

                    <input 
                        type='text' 
                        className="form-control"
                        name="name_kit" 
                        id="name_kit" 
                        placeholder='Ingrese nombre del kit'
                        maxLength ='25'
                        minLength ='3'                        
                        required
                    />                      

                    <label htmlFor="rol_kit" className="form-label">Rol:</label>

                    <input 
                        type='text' 
                        className="form-control"
                        name="rol_kit" 
                        id="rol_kit" 
                        placeholder='Ingrese rol del kit'
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
                                name='tools_kits'
                                checked={checkedItems[opcion.id] || false}
                                onChange={handleChangeCheckbox}
                            />

                            { checkedItems[opcion.id] &&

                            <input
                                type="number"
                                id={opcion.id}
                                className="form-control-sm inputCantidad"
                                name={opcion.id}
                                placeholder='Cant..'      
                                min={1}
                                max={Number(opcion.cantidad)}                                  
                                onChange={handleChangeCantidades}
                                required
                            /> }                                                   
                            
                            <label> 
                                ID: <h6 className='fw-bold control_Texto'>{opcion.id}</h6> 
                                Nombre: <h6 className='text-primary control_Texto'>{opcion.nombre}</h6> 
                                Cantidad disponible: <h6 className='text-success control_Texto'>{opcion.cantidad}</h6>
                            </label>  

                            { !checkedItems[opcion.id] &&

                            <TraerImagenes ancho='125px' alto='125px' imageId={opcion.id} /> }

                        </div>                        
                    ))}  

                </div>

            </Form>              
        
        </Modal>
    ) 
}

// trae listado de herramientas disponibles

export const agregarKitsLoader = async () => {
    
    const tools = await fetch('http://localhost:8081/api/herramientas')   
    

    if (!tools.ok) {
        throw Error('No se pudo cargar el listado de herramientas')
      }
    
      return tools.json()
}

// manejo data formulario

export const AgregarKitsAction = async ({ request }) => {

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

    const kits = await request.formData()

    // definicion de arreglos de manejo
    
    const formKits = {};
    const pack = [];

    //extraccion de datos del formData

    kits.forEach((value, key) => { 
        const tool = {} ;
        if(key !== 'name_kit' && key !== 'rol_kit' && key !== 'tools_kits'){
            tool['id'] = key;
            tool['cantidad'] = value;  
            pack.push(tool);                   
        }        
        else{ formKits[key]=value; }        
    });  

    // creacion de objeto
    
    const kitData = {
    id : generateRandomId(5),
    nombre : formKits['name_kit'],
    rol : formKits['rol_kit'],
    fecha_in : fechaActual()
    }     

    const herramientas = pack;

    console.log("recibido del formulario",kitData,herramientas);  
    
    const nuevoKit = FormAddKit(kitData);
    nuevoKit.then((state) => {
        if(state){
            FormAddToolKit(kitData.id,herramientas);            
        }
    });

    // redirect the user
    return redirect(`/kits`);
}
