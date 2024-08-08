import './EditarProveedor.css';
import { Modal, TraerImagenes } from '../../IndexComponents';
import {Form, useActionData, useLoaderData, useParams, Outlet, useNavigate} from 'react-router-dom';
import { useState, useEffect } from "react";
import FormEditProveedor from './FormEditProveedor';

export default function EditarProveedor() {    
    
    const dataSuplier = useLoaderData();    
    const suplierEditado = useActionData();
    const navigate = useNavigate();
    
    useEffect(() => {

        if(suplierEditado){
            const subidaSuplier = FormEditProveedor(suplierEditado.id,suplierEditado);            
            subidaSuplier.then((state)=> {
                if(state){
                    navigate(`/proveedores/${suplierEditado.id}`);                
                }
            })
        }        
        
      }, [suplierEditado]);
    
    const [checkedItemsEdit, setCheckedItemsEdit] = useState({});

    // manejador eventos checkbox

    const handleChangeCheckboxSuplierEdit = (e) => {
      setCheckedItemsEdit({
        ...checkedItemsEdit,
        [e.target.id]: e.target.checked
      });
    };   

    const btnsEditarSuplier = [
        {
            btnname:"Actualizar",
            icobtn:"Tool2Icono",
            estiloBoton:"btn-primary",
            formulario:"edit_suplier",            
            tipo:"submit", 
            accion:"null",                                         
        },

        {
            btnname:"Cancelar",
            icobtn:"CancelIcono",
            estiloBoton:"btn-secondary",            
            accion:`/proveedores/${useParams().suplierId}`
        }, 
        {
            btnname:"Eliminar",
            icobtn:"EliminarIcono",
            estiloBoton:"btn-danger",            
            accion:`/proveedores/${useParams().suplierId}/editarproveedor/deleteproveedor`
        }    
    ]; 

    const dirAccionEditSuplier = `/proveedores/${useParams().suplierId}/editarproveedor`;    

    return (       

        <>            

            <Modal         
                title="Editar Proveedor"
                estiloModal="modal_completo"
                botoncss="btn_ModalIntermedio"
                botones={btnsEditarSuplier}
                >

                <Form className='formularioEditarSuplier' id="edit_suplier" name="edit_suplier" action={dirAccionEditSuplier} method='post'>

                    <div className='inputNoCheckboxEditSuplier'>

                        <label htmlFor="id" className="form-label">ID:</label>

                        <input 
                            type='text' 
                            className="form-control"
                            name="id" 
                            id="id" 
                            placeholder={dataSuplier.suplier.id}
                            defaultValue={dataSuplier.suplier.id}                                  
                            readOnly
                        />        

                        <label htmlFor="name_suplier" className="form-label">Nombre:</label>

                        <input 
                            type='text' 
                            className="form-control"
                            name="name_suplier" 
                            id="name_suplier" 
                            placeholder={dataSuplier.suplier.nombre}
                            defaultValue={dataSuplier.suplier.nombre}
                            maxLength ='25'
                            minLength ='3'                        
                            required
                        />                      

                        <label htmlFor="telefono" className="form-label">Telefono:</label>

                        <input 
                            type='text' 
                            className="form-control"
                            name="telefono" 
                            id="telefono" 
                            placeholder={dataSuplier.suplier.telefono}
                            defaultValue={dataSuplier.suplier.telefono}
                            maxLength ='25'
                            minLength ='3'     
                            required
                        /> 

                        <label htmlFor="ciudad" className="form-label">Ciudad:</label>

                        <input 
                            type='text' 
                            className="form-control"
                            name="ciudad" 
                            id="ciudad" 
                            placeholder={dataSuplier.suplier.ciudad}
                            defaultValue={dataSuplier.suplier.ciudad}
                            maxLength ='25'
                            minLength ='3'     
                            required
                        /> 

                        <label htmlFor="fecha_in_suplier" className="form-label">Fecha Ingreso:</label>

                        <input 
                            type='text' 
                            className="form-control"
                            name="fecha_in_suplier" 
                            id="fecha_in_suplier" 
                            defaultValue={dataSuplier.suplier.fecha_in}                           
                            readOnly                            
                        />                                                       

                    </div>             

                    <h5 id='tag_Incluidas' className='text-wrap badge bg-primary'>Herramientas agregadas actualmente</h5>

                    <div className='listaHerramientaEdit'>                    

                        {dataSuplier.suplier.herramientas.map((opcionEdit,index) => (
                            
                            <div className='itemHerramientaEdit rounded' key={index}>

                                <input
                                    type="checkbox"
                                    id={opcionEdit.id}                                                                
                                    name='toolBase'
                                    value={opcionEdit.id}
                                    checked={ checkedItemsEdit[opcionEdit.id] || false }
                                    onChange={handleChangeCheckboxSuplierEdit}                                                                        
                                />                                                                                
                                
                                <label className='sizeLabel'> 
                                    ID: <h6 className='fw-bold control_Texto'>{opcionEdit.id}</h6> 
                                    Nombre: <h6 className='text-primary control_Texto'>{opcionEdit.nombre}</h6> 
                                    Marca: <h6 className='text-success control_Texto'>{opcionEdit.marca}</h6>
                                </label>

                                <TraerImagenes tipo='1' ancho='125px' alto='125px' imageId={opcionEdit.id} /> 

                            </div>                        
                        ))}  

                    </div>

                    <h5 id='tag_PorIncluir' className='text-wrap badge bg-primary'>Herramientas disponibles</h5>

                    <div className='listaHerramientaEdit2'>                    

                        {dataSuplier.data.map((opcionEdit,index) => (
                            
                            <div className='itemHerramientaEdit2 rounded' key={index}>

                                <input
                                    type="checkbox"
                                    id={opcionEdit.id}                                                                
                                    name='tool'
                                    value={opcionEdit.id}
                                    checked={checkedItemsEdit[opcionEdit.id] || false}
                                    onChange={handleChangeCheckboxSuplierEdit}
                                />                                                                         
                                
                                <label className='sizeLabel'> 
                                    ID: <h6 className='fw-bold control_Texto'>{opcionEdit.id}</h6> 
                                    Nombre: <h6 className='text-primary control_Texto'>{opcionEdit.nombre}</h6> 
                                    Marca: <h6 className='text-success control_Texto'>{opcionEdit.marca}</h6>
                                </label>                                

                                <TraerImagenes tipo='1' ancho='125px' alto='125px' imageId={opcionEdit.id} /> 

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

export const EditarProveedorLoader = async ({params}) => {

    const token = localStorage.getItem('token'); 
    
    const supliertraer = await fetch(`http://localhost:8081/api/proveedores/${params.suplierId}`,{
        method: 'GET',
        headers: {'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`},
    }); 

    const suplier = await supliertraer.json();    
    
    const tools = await fetch('http://localhost:8081/api/herramientas', {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`},
    });

    const data = await tools.json();        

    if (!tools.ok) {
        throw Error('No se pudo cargar el listado de herramientas')
    }

    if (!supliertraer.ok) {
        throw Error('No se pudo cargar el proveedor indicado')
    }

    const dataLoader = {data, suplier};    
    return dataLoader;
}

// manejo data formulario

export const EditarProveedorAction = async ({ request }) => {   

    //recibir los datos del formulario

    const edit_supliers = await request.formData()

    // definicion de arreglos de manejo
    
    const formSuplierEdit = {};
    const packEdit = [];    

    //extraccion de datos del formData

    edit_supliers.forEach((value, key) => { 
        const tool = {} ;
        if(key === 'tool'){
            tool['id'] = value;            
            packEdit.push(tool);                   
        }        
        else{ formSuplierEdit[key]=value; }        
    });  

    // creacion de objeto
    
    const suplierDataEdit = {    
    id: formSuplierEdit['id'],    
    nombre : formSuplierEdit['name_suplier'],
    telefono : formSuplierEdit['telefono'],
    ciudad : formSuplierEdit['ciudad'],
    estado: 0,
    herramientas : packEdit    
    }    

    console.log("recibido del formulario",suplierDataEdit);     

    // redirect the user
    return suplierDataEdit;
}