import './AgregarKits.css';
import {Modal,FormAddKit} from '../../IndexComponents';
import {Form, redirect, useActionData, useLoaderData} from 'react-router-dom';
import {Tool1Icono} from '../../Iconos/IndexIcons';
import { useState } from "react";

export default function AgregarKits() {

    const verifyData = useActionData();
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
    
    function ImgToolForKit (props) {
    
        try {
            const ruta_img = require(`../../images/tools/${props.image}.png`);
            return (
                <img src={ruta_img} className='previewImageTool' alt="card-img-top"/>
            );
        } catch (error) {
            console.error('El archivo no pudo ser requerido:');
            return(
                <Tool1Icono width="7.8rem" height="7rem" viewBox ="0 0 16 16" fill="#cec8c6"/>
            );
        }
    }

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
                        required
                    />  

                    {verifyData && verifyData["name"] && <p className='error-form'>{verifyData["name"]}</p>} 

                    <label htmlFor="rol_kit" className="form-label">Rol:</label>

                    <input 
                        type='text' 
                        className="form-control"
                        name="rol_kit" 
                        id="rol_kit" 
                        placeholder='Ingrese rol del kit'
                        required
                    />  

                    {verifyData && verifyData["rol"] && <p className='error-form'>{verifyData["rol"]}</p>} 

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
                                max={Number(opcion.cant)}                                  
                                onChange={handleChangeCantidades}
                                required
                            /> }                                                   
                            
                            <label> 
                                ID: <h6 className='fw-bold'>{opcion.id}</h6> 
                                Nombre: <h6 className='text-primary'>{opcion.tool}</h6> 
                                Cantidad disponible: <h6 className='text-success'>{opcion.cant}</h6>
                            </label>  

                            { !checkedItems[opcion.id] &&

                            <ImgToolForKit image={opcion.image} /> }

                        </div>                        
                    ))}  

                </div>

            </Form>              
        
        </Modal>
    ) 
}

// trae listado de herramientas disponibles

export const agregarKitsLoader = async () => {
    
    const tools = await fetch('http://localhost:4000/tools')   
    

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

    const errors = {};   
    const formKits = {};
    const pack = [];

    //extraccion de datos del formData

    kits.forEach((value, key) => { 
        const tool = {} ;
        if(key !== 'name_kit' && key !== 'rol_kit' && key !== 'tools_kits'){
            tool['id'] = key;
            tool['cant'] = value;  
            pack.push(tool);                   
        }        
        else{ formKits[key]=value; }        
    });  

    // creacion de objeto
    
    const kitData = {
    id : generateRandomId(5),
    name : formKits['name_kit'],
    rol : formKits['rol_kit'],
    date_in : fechaActual(),
    tools : pack,
    }     

    console.log("recibido del formulario",kitData);       

   
    // segunda verificacion de entradas
  
    if (kitData.name.length < 2) {
        errors.name = 'Debe ingresar un nombre valido para el kit';
    }

    if (kitData.rol.length < 2) {
        errors.rol = 'Debe ingresar un rol valido para el kit';
    }   
    
    if (Object.keys(errors).length) {
        console.log(errors);
        return errors;
    } 
    
    FormAddKit(kitData);

    // redirect the user
    return redirect(`/kits`);
}
