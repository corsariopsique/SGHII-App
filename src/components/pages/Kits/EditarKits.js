import './EditarKits.css';
import {Modal,TraerImagenes} from '../../IndexComponents';
import FormEditKit from './FormEditKit';
import {Form, redirect, useLoaderData, useParams, Outlet} from 'react-router-dom';
import { useState } from "react";

export default function EditarKits() {
    
    const dataWork = useLoaderData();     
    
    const [checkedItemsEdit, setCheckedItemsEdit] = useState({});    
    const [checkedItemsEdit2, setCheckedItemsEdit2] = useState({});    
    const [cantItemsEdit, setCantItemsEdit] = useState({});

    // manejador eventos checkbox

    const handleChangeCheckboxEdit = (e) => {
      setCheckedItemsEdit({
        ...checkedItemsEdit,
        [e.target.id]: e.target.checked
      });
    };    

    const handleChangeCheckboxEdit2 = (e) => {
        setCheckedItemsEdit2({
          ...checkedItemsEdit2,
          [e.target.id]: e.target.checked
        });
      };    

    // arreglo herramientas - cantidades

    const handleChangeCantidadesEdit = () => {
        setCantItemsEdit({
          ...cantItemsEdit          
        });
    };    

    const btnsEditarKit = [
        {
            btnname:"Actualizar",
            icobtn:"Tool2Icono",
            estiloBoton:"btn-primary",
            formulario:"edit_kit",            
            tipo:"submit", 
            accion:"null",                                         
        },

        {
            btnname:"Cancelar",
            icobtn:"CancelIcono",
            estiloBoton:"btn-secondary",            
            accion:`/kits/${useParams().kitId}`
        }, 
        {
            btnname:"Eliminar",
            icobtn:"EliminarIcono",
            estiloBoton:"btn-danger",            
            accion:`/kits/${useParams().kitId}/editarkits/deletekits`
        }    
    ]; 

    const dirAccionEditKit = `/kits/${useParams().kitId}/editarkits`;    

    return (

        <>

            <Modal         
                title="Editar Kits"
                estiloModal="modal_completo"
                botoncss="btn_ModalIntermedio"
                botones={btnsEditarKit}
                >

                <Form className='formularioEditarKits' id="edit_kit" name="edit_kit" action={dirAccionEditKit} method='post'>

                    <div className='inputNoCheckboxEditKit'>

                        <label htmlFor="id" className="form-label">ID:</label>

                        <input 
                            type='text' 
                            className="form-control"
                            name="id" 
                            id="id" 
                            placeholder={dataWork.kit.id}
                            defaultValue={dataWork.kit.id}                                  
                            readOnly
                        />        

                        <label htmlFor="name_kit" className="form-label">Nombre:</label>

                        <input 
                            type='text' 
                            className="form-control"
                            name="name_kit" 
                            id="name_kit" 
                            placeholder={dataWork.kit.nombre}
                            defaultValue={dataWork.kit.nombre}
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
                            placeholder={dataWork.kit.rol}
                            defaultValue={dataWork.kit.rol}
                            maxLength ='25'
                            minLength ='3'     
                            required
                        /> 

                        <label htmlFor="fecha_in_kit" className="form-label">Fecha Ingreso:</label>

                        <input 
                            type='text' 
                            className="form-control"
                            name="fecha_in_kit" 
                            id="fecha_in_kit" 
                            defaultValue={dataWork.kit.fecha_in}                           
                            readOnly                            
                        />                              

                    </div>             

                    <h5 id='tag_Incluidas' className='text-wrap badge bg-primary'>Herramientas agregadas actualmente</h5>

                    <div className='listaHerramientaEdit'>                    

                        {dataWork.kit.herramientas.map((opcionEdit,index) => (
                            
                            <div className='itemHerramientaEdit rounded' key={index}>

                                <input
                                    type="checkbox"
                                    id={index}                                                                
                                    name='tools_kits'
                                    checked={ checkedItemsEdit[index] || false }
                                    onChange={handleChangeCheckboxEdit}                                                                        
                                />

                                { checkedItemsEdit[index] &&

                                <input
                                    type="number"
                                    id={index}
                                    className="form-control-sm inputCantidadEdit"
                                    name={opcionEdit.id}
                                    value={1}                               
                                    required
                                /> }                                                   
                                
                                <label className='sizeLabel'> 
                                    ID: <h6 className='fw-bold control_Texto'>{opcionEdit.id}</h6> 
                                    Nombre: <h6 className='text-primary control_Texto'>{opcionEdit.nombre}</h6> 
                                    Cantidad disponible: <h6 className='text-success control_Texto'>1</h6>
                                </label>  

                                { !checkedItemsEdit[index] &&

                                <TraerImagenes tipo='1' ancho='125px' alto='125px' imageId={opcionEdit.id} /> }

                            </div>                        
                        ))}  

                    </div>

                    <h5 id='tag_PorIncluir' className='text-wrap badge bg-primary'>Herramientas disponibles</h5>

                    <div className='listaHerramientaEdit2'>                    

                        {dataWork.data.map((opcionEdit,index) => (
                            
                            <div className='itemHerramientaEdit2 rounded' key={index}>

                                <input
                                    type="checkbox"
                                    id={index}                                                                
                                    name='tools_kits'
                                    checked={checkedItemsEdit2[index] || false}
                                    onChange={handleChangeCheckboxEdit2}
                                />

                                { checkedItemsEdit2[index] &&

                                <input
                                    type="number"
                                    id={index}
                                    className="form-control-sm inputCantidadEdit"
                                    name={opcionEdit.id}
                                    placeholder='Cant..'
                                    defaultValue={1}      
                                    min={1}
                                    max={Number(opcionEdit.cantidad)}
                                    onChange={handleChangeCantidadesEdit}                               
                                    required
                                /> }                                                   
                                
                                <label className='sizeLabel'> 
                                    ID: <h6 className='fw-bold control_Texto'>{opcionEdit.id}</h6> 
                                    Nombre: <h6 className='text-primary control_Texto'>{opcionEdit.nombre}</h6> 
                                    Cantidad disponible: <h6 className='text-success control_Texto'>{opcionEdit.cantidad}</h6>
                                </label>  

                                { !checkedItemsEdit2[index] &&

                                <TraerImagenes tipo='1' ancho='125px' alto='125px' imageId={opcionEdit.id} /> }

                            </div>                        
                        ))}  

                    </div>

                </Form>              
            
            </Modal>

            <Outlet />

        </>

    ) 
}

// trae listado de herramientas e informacion kit

export const EditarKitsLoader = async ({params}) => {
    
    const kittraer = await fetch(`http://localhost:8081/api/kits/${params.kitId}`);   
    const kit = await kittraer.json();    
    
    const tools = await fetch('http://localhost:8081/api/herramientas'); 
    const data = await tools.json();        

    if (!tools.ok) {
        throw Error('No se pudo cargar el listado de herramientas')
    }

    if (!kittraer.ok) {
        throw Error('No se pudo cargar el kit indicado')
    }

    const dataLoader = {data, kit};    
    return dataLoader;
}

// manejo data formulario

export const EditarKitsAction = async ({ request }) => {   

    //recibir los datos del formulario

    const edit_kits = await request.formData()

    // definicion de arreglos de manejo
    
    const formKitsEdit = {};
    const packEdit = [];

    //extraccion de datos del formData

    edit_kits.forEach((value, key) => { 
        const tool = {} ;
        if(key !== 'name_kit' && key !== 'rol_kit' && key !== 'tools_kits' && key !== 'id' && key !== 'fecha_in_kit'){
            tool['id'] = key;
            tool['cantidad'] = value;  
            packEdit.push(tool);                   
        }        
        else{ formKitsEdit[key]=value; }        
    });  

    // creacion de objeto
    
    const kitDataEdit = {    
    nombre : formKitsEdit['name_kit'],
    rol : formKitsEdit['rol_kit'],
    herramientas : packEdit
    }

    console.log("recibido del formulario",kitDataEdit); 
    
    
    FormEditKit(formKitsEdit['id'], kitDataEdit);     

    // redirect the user
    return redirect(`/kits/${formKitsEdit['id']}`);
}