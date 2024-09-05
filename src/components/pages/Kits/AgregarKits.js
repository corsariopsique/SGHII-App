import './AgregarKits.css';
import {Modal,TraerImagenes, BarraDeCarga} from '../../IndexComponents';
import FormAddKit from './FormAddKit';
import FormAddToolKit from './FormAddToolKit';
import {Form, useNavigate, useLoaderData, useActionData} from 'react-router-dom';
import { useState, useEffect } from "react";

function AgregarKits() {

    const dataNewKit = useActionData();    
    const listado_Herramienta = useLoaderData();    
    const navigate = useNavigate();    
    
    const [checkedItems, setCheckedItems] = useState({});    
    const [cantItems, setCantItems] = useState({});
    const [progress, setProgress] = useState(0);
    const [subidaState, setSubidaState] = useState(null);      

    useEffect(() => {

        if(dataNewKit){
            const nuevoKit = FormAddKit(dataNewKit.kitData);

            nuevoKit.then((state) => {
                if(state){
                    const kitWImage = FormAddToolKit(dataNewKit.kitData.id,dataNewKit.herramientas);   
                    if(kitWImage){
                        kitWImage.then((kitFull)=> {
                            if(kitFull){
                                setSubidaState(kitFull);                                
                            }
                        });
                    }                    
                }
            });            
        }

    }, [dataNewKit]); 
    
    useEffect(()=>{

        if(dataNewKit){

            const interval = setTimeout(() => {
                if (progress < 100) {
                  setProgress(prev => prev + 10);
                }
            }, 150);
    
            if(subidaState && progress===100){
                navigate(`/kits/${dataNewKit.kitData.id}`);
            }
    
            return () => clearTimeout(interval);

        }        

    },[dataNewKit,progress])      

    // manejador eventos checkbox

    const handleChangeCheckbox = (e) => {
      setCheckedItems({
        ...checkedItems,
        [e.target.id]: e.target.checked
      });
    };    

    // arreglo herramientas - cantidades

    const handleChangeCantidades = () => {
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

            {dataNewKit && <BarraDeCarga progress={progress}/>}

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
                                defaultValue={1}     
                                min={1}
                                max={Number(opcion.cantidad_disponible)}                                  
                                onChange={handleChangeCantidades}
                                required
                            /> }                                                   
                            
                            <label className='sizeLabel'> 
                                ID: <h6 className='fw-bold control_Texto'>{opcion.id}</h6> 
                                Nombre: <h6 className='text-primary control_Texto'>{opcion.nombre}</h6> 
                                Cantidad disponible: <h6 className='text-success control_Texto'>{opcion.cantidad_disponible}</h6>
                            </label>  

                            { !checkedItems[opcion.id] &&

                            <TraerImagenes tipo='1' ancho='125px' alto='125px' imageId={opcion.id} /> }

                        </div>                        
                    ))}  

                </div>

            </Form>              
        
        </Modal>
    ) 
}
export default AgregarKits;


// trae listado de herramientas disponibles

export const agregarKitsLoader = async () => {

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
    
    const herramientas = pack;

    // creacion de objeto
    
    const kitData = {
    id : generateRandomId(5),
    nombre : formKits['name_kit'],
    rol : formKits['rol_kit'],
    fecha_in : fechaActual(),
    disponible: 0,
    estado: 0    
    };    

    const totalData ={ kitData, herramientas };

    console.log("recibido del formulario",totalData);    
    
    return totalData;
}
