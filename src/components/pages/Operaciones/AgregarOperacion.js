import './AgregarOperacion.css';
import {Modal, TraerImagenes} from '../../IndexComponents';
import * as Icons from '../../Iconos/IndexIcons';
import FormAddOperacion from './FormAddOperacion';
import {Form, Link, useNavigate, useActionData, useLoaderData} from 'react-router-dom';
import { useState, useEffect } from "react";

function AgregarOperacion () {

    const operaciones = useActionData();    
    const recursos_Operaciones = useLoaderData();    
    const navigate= useNavigate();
    const token = localStorage.getItem('token'); 
    const enlaceCancelarOperacion = '/operaciones'; 
    const manejoBotonForm = "btn botonOperacion btn-primary disabled-button";    
    
    const [data_Prestamo, setData_Prestamo] = useState(null);    
    const [controlForm, setControlForm] = useState(manejoBotonForm);
    const [checkedTipo, setCheckedTipo] = useState(null);
    const [checkedTOK, setCheckedTOK] = useState(null);
    const [checkedOperario, setCheckedOperario] = useState(null);    
    const [checkedTools, setCheckedTools] = useState({});    
    const [checkedKit, setCheckedKit] = useState(null);    
    const [cantTools, setCantTools] = useState({});  

    useEffect(() => {

        if(operaciones){
            const subida = FormAddOperacion(operaciones);
            subida.then((state)=> {
                if(state){
                    navigate(`/operaciones/${operaciones.id}`);                
                }
            })
        }        
        
      }, [operaciones]);
    
    useEffect(() => {

        if (checkedOperario && checkedTipo === 2) {

            const ListarToolsPrestamoActivo = async (idWorker) => {

                setData_Prestamo(null);
                const listaTools = await fetch(`http://localhost:8081/api/operarios/${idWorker}/prestamo`,{
                    method:'GET',
                    headers: {'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`}
                });
                const result = await listaTools.json();                
                setData_Prestamo(result);                
                
            }

            ListarToolsPrestamoActivo(checkedOperario);
        }
      }, [checkedOperario,checkedTipo,checkedTOK]);

    const handleChangeCheckedOperario = (e) => {
        setCheckedOperario(e);

        setCheckedKit(null);
        setCheckedTools({});
        setCantTools({});
        setControlForm("btn botonOperacion btn-primary disabled-button");

    }; 

    const handleChangeRadioTipo = (e) => {
        setCheckedTipo(e);

        setCheckedKit(null);
        setCheckedTools({});
        setCantTools({});
        setControlForm("btn botonOperacion btn-primary disabled-button");       
    }

    const handleChangeRadioTOK = (e) => {
        setCheckedTOK(e);

        setCheckedKit(null);
        setCheckedTools({});
        setCantTools({});
        setControlForm("btn botonOperacion btn-primary disabled-button");                     
    }

    const handleChangeCheckedKit = (e) => {
        setCheckedKit(e);
        if(checkedOperario){
            setControlForm("btn botonOperacion btn-primary")
        }        
    }
    
    const handleChangeCheckedTools = (e) => {
        setCheckedTools({
          ...checkedTools,
          [e.target.id]: e.target.checked          
        });
        if(checkedOperario){
            setControlForm("btn botonOperacion btn-primary")
        }              
    };    
    

    const handleChangeCantToolOper = (e) => {
        setCantTools({
          ...cantTools,
          [e.target.name]: e.target.value          
        });
        if(checkedOperario){
            setControlForm("btn botonOperacion btn-primary")
        }           
    };
    
    const handleMouseLeaveCheckedTools = () => {

        let atleast1 = false;
        
        for (let x in checkedTools){            

            if(checkedTools[x] && checkedOperario){                
                atleast1=true;                
            }

            if(atleast1){
                setControlForm("btn botonOperacion btn-primary");
            }else{
                setControlForm("btn botonOperacion btn-primary disabled-button");
            }      
        };
    };   
   
    // renderizado de formularios

    return (

        <Modal         
        title="Agregar Operación"
        estiloModal="modal_completo"        
        >

        <div className="btn-group btn_ModalIntermedio" role="group" aria-label="Large button group">

            <button  
                form='add_operacion'
                type="submit" 
                className={controlForm}                                       
            >                
                <Icons.Tool2Icono id="icobtnOperacion"/>Registrar Operación              

            </button> 

            <Link to={enlaceCancelarOperacion}>
                <button  
                    type="button" 
                    className="btn botonOperacion btn-secondary"                                                                                   
                >                
                    <Icons.CancelIcono id="icobtnOperacion"/>Cancelar              

                </button>            
            </Link>

        </div> 

        <Form className='formularioAddOperacion' id="add_operacion" name="add_operacion" action='/operaciones/agregaroperacion' method='post'>

            <div className='tipo_Operacion rounded'>            

                <div id='tipo_De_Operacion' className='itemSeleccionRadio rounded border border-5'>

                    <label className='etiqueta_Radio text-wrap badge bg-primary' htmlFor='tipo_De_Operacion'>Tipo de operación</label>        

                    <input
                        type="radio"
                        id='prestamo'                                                                
                        name='tipo_operacion'
                        value='1' 
                        onChange={() => handleChangeRadioTipo(1)}
                        required                   
                    />

                    <label htmlFor='prestamo'className='sizeLabelTipo fw-bold'>Prestamo</label>        

                    <input
                        type="radio"
                        id='devolucion'                                                                
                        name='tipo_operacion'
                        value='2'   
                        onChange={() => handleChangeRadioTipo(2)}
                        required                 
                    />
                                    
                    <label htmlFor='devolucion' className='sizeLabelTipo fw-bold'>Devolución</label>        

                </div>

                <div id='tipo_De_Articulo' className='itemSeleccionRadio rounded border border-5'>

                    <label className='etiqueta_Radio text-wrap badge bg-primary' htmlFor='tipo_De_Articulo'>Tipo de artículo</label>

                    <input
                        type="radio"
                        id='herramientas'                                                                
                        name='tipo_articulo'
                        value='1' 
                        onChange={() => handleChangeRadioTOK(1)}
                        required                   
                    />

                    <label htmlFor='prestamo'className='sizeLabelTipo fw-bold'>Herramientas</label>        

                    <input
                        type="radio"
                        id='kits'                                                                
                        name='tipo_articulo'
                        value='2'   
                        onChange={() => handleChangeRadioTOK(2)}
                        required                 
                    />
                                    
                    <label htmlFor='devolucion' className='sizeLabelTipo fw-bold'>Kits</label>

                </div>

            </div>


            { checkedTipo &&            

                <div className='listaOperarios'>                    

                <h5 id='tag_Operarios' className='text-wrap badge bg-primary'>Operarios</h5>

                    {recursos_Operaciones.workersData.map((worker,index) => (
                        
                        <div className='itemOperario rounded' key={index}>

                            <input
                                type="checkbox"
                                id={index}                                                                
                                name='operario'
                                value={worker.id}
                                checked={ checkedOperario === worker.id}
                                onChange={() => handleChangeCheckedOperario(worker.id)}                                
                                onMouseLeave={handleMouseLeaveCheckedTools}
                            />                                                                      
                            
                            <label className='sizeLabel'> 
                                ID: <h6 className='fw-bold control_Texto'>{worker.id}</h6> 
                                Nombre: <h6 className='text-primary control_Texto'>{worker.nombre}</h6> 
                                Rol: <h6 className='text-success control_Texto'>{worker.rol}</h6>
                            </label>                       

                            <TraerImagenes tipo='2' ancho='125px' alto='125px' imageId={worker.id} /> 

                        </div>                        
                    ))}  

                </div>
            }           

            { checkedTipo === 1 && checkedTOK === 1 &&

                <div className='listaHerramientaOperacion'>  

                    <h5 id='tag_Herramientas' className='text-wrap badge bg-primary'>Herramientas disponibles</h5>                             

                    {recursos_Operaciones.toolsData.map((toolItem,index) => (
                        
                        <div className='itemTools rounded' key={index}>

                            <input
                                type="checkbox"
                                id={index}                                                                
                                name='tools_Oper'
                                checked={checkedTools[index] || false}
                                onChange={handleChangeCheckedTools} 
                                onMouseLeave={handleMouseLeaveCheckedTools}                               
                            />

                            { checkedTools[index] &&

                            <input
                                type="number"
                                id={index}
                                className="form-control-sm inputCantToolOper"
                                name={toolItem.id}
                                placeholder='Cant..'
                                defaultValue={1}      
                                min={1}
                                max={Number(toolItem.cantidad_disponible)}
                                onChange={handleChangeCantToolOper}
                                onMouseLeave={handleMouseLeaveCheckedTools}                                
                                required
                            /> }                                                   
                            
                            <label className='sizeLabel'> 
                                ID: <h6 className='fw-bold control_Texto'>{toolItem.id}</h6> 
                                Nombre: <h6 className='text-primary control_Texto'>{toolItem.nombre}</h6> 
                                Cantidad disponible: <h6 className='text-success control_Texto'>{toolItem.cantidad_disponible}</h6>
                            </label>  

                            { !checkedTools[index] &&
                                <TraerImagenes tipo='1' ancho='125px' alto='125px' imageId={toolItem.id} />                                 
                            }                            

                        </div>                        
                    ))}  

                </div> 
            }  

            { checkedTipo === 2 && checkedTOK === 1 && checkedOperario && data_Prestamo &&

                <div className='listaHerramientaOperacion'>  

                    <h5 id='tag_Herramientas' className='text-wrap badge bg-primary'>Herramientas en prestamo</h5>                             

                    {data_Prestamo.herramientas.map((toolItem,index) => (                         
                        
                        <div className='itemTools rounded' key={index}>

                            <input
                                type="checkbox"
                                id={index}                                                                
                                name='tools_Oper'
                                checked={checkedTools[index] || false}
                                onChange={handleChangeCheckedTools} 
                                onMouseLeave={handleMouseLeaveCheckedTools}                               
                            />

                            { checkedTools[index] &&

                            <input
                                type="number"
                                id={index}
                                className="form-control-sm inputCantToolOper"
                                name={toolItem.herramienta.id}
                                placeholder='Cant..'
                                defaultValue={toolItem.id}      
                                readOnly
                                onChange={handleChangeCantToolOper}
                                onMouseLeave={handleMouseLeaveCheckedTools}                                
                                required
                            /> }                                                   
                            
                            <label className='sizeLabel'> 
                                ID: <h6 className='text-dark fw-bold control_Texto'>{toolItem.herramienta.id}</h6> 
                                ID Item: <h6 className='text-secondary fw-bold control_Texto'>{toolItem.id}</h6>                                 
                                Nombre: <h6 className='text-primary control_Texto'>{toolItem.herramienta.nombre}</h6>                                 
                            </label>  

                            { !checkedTools[index] &&
                                <TraerImagenes tipo='1' ancho='125px' alto='125px' imageId={toolItem.herramienta.id} />                                 
                            }                            

                        </div>

                    ))}  

                </div> 
            }  

            { checkedTipo === 1 && checkedTOK === 2 &&            

                <div className='listaHerramientaOperacion'>                    

                    <h5 id='tag_Herramientas' className='text-wrap badge bg-primary'>Kits disponibles</h5>

                    {recursos_Operaciones.kitData.map((kit,index) => ( !kit.disponible && (
                        
                        <div className='itemTools rounded' key={index}>

                            <input
                                type="checkbox"
                                id={index}                                                                
                                name='kit'
                                value={kit.id}
                                checked={ checkedKit === kit.id}
                                onChange={() => handleChangeCheckedKit(kit.id)}                                
                            />                                                                      
                            
                            <label className='sizeLabel'> 
                                ID: <h6 className='fw-bold control_Texto'>{kit.id}</h6> 
                                Nombre: <h6 className='text-primary control_Texto'>{kit.nombre}</h6> 
                                Rol: <h6 className='text-success control_Texto'>{kit.rol}</h6>
                            </label>  

                            <Icons.Tool1Icono width='125px' height='125px' className='img_info size_Img'/>                            

                        </div>                        
                    )))}  

                </div>

            }

            { checkedTipo === 2 && checkedTOK === 2 && checkedOperario && data_Prestamo &&               

                <div className='listaHerramientaOperacion'>                    

                    <h5 id='tag_Herramientas' className='text-wrap badge bg-primary'>Kits en prestamo</h5>

                    {data_Prestamo.kits.map((kit,index) => ( kit && (                       
                        
                        <div className='itemTools rounded' key={index}>

                            <input
                                type="checkbox"
                                id={index}                                                                
                                name='kit'
                                value={kit.id}
                                checked={ checkedKit === kit.id}
                                onChange={() => handleChangeCheckedKit(kit.id)}                                
                            />                                                                      
                            
                            <label className='sizeLabel'> 
                                ID: <h6 className='fw-bold control_Texto'>{kit.id}</h6> 
                                Nombre: <h6 className='text-primary control_Texto'>{kit.nombre}</h6> 
                                Rol: <h6 className='text-success control_Texto'>{kit.rol}</h6>
                            </label>  

                            <Icons.Tool1Icono width='125px' height='125px' className='img_info size_Img'/>                            

                        </div>                        
                    
                    )))}  

                </div>
            }

        </Form>              
    
    </Modal>
       
    );

}
export default AgregarOperacion;


// manejo datos de los formularios

export const AgregarOperacionAction = async ({ request }) => {

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

    const dataOperacion = await request.formData();   

    const packToolsOper = [];
    const otherDataOper = {};

    dataOperacion.forEach((value, key) => { 
        const tool = {} ;
        if(key !== 'tipo_operacion' && key !== 'tipo_articulo' && key !== 'operario' && key !== 'tools_Oper' && key !== 'kit'){
            tool['id'] = key;
            tool['cantidad'] = value;  
            packToolsOper.push(tool);                   
        }        
        else{ otherDataOper[key]=value; }        
    });  

    const kindData = () => {

        if(otherDataOper.tipo_articulo === '1'){
            const sortDataOper = {
                id: generateRandomId(5),  
                tipo: Number(otherDataOper.tipo_operacion),
                tipo_articulo: Number(otherDataOper.tipo_articulo), 
                operario: otherDataOper.operario,         
                herramienta: packToolsOper,                
                fecha_operacion: fechaActual()            
            }             
            return sortDataOper;
        }

        if(otherDataOper.tipo_articulo === '2'){
            const sortDataOper = {
                id: generateRandomId(5),  
                tipo: Number(otherDataOper.tipo_operacion),
                tipo_articulo: Number(otherDataOper.tipo_articulo),
                operario: otherDataOper.operario,         
                kit: otherDataOper.kit,                
                fecha_operacion: fechaActual()            
            } 
            return sortDataOper;  
        }
    }  
    
    const dataFinalOper = kindData();

    return dataFinalOper;
}

export const agregarOperacionLoader = async () => {

    const token = localStorage.getItem('token'); 
    
    const listaKits = await fetch(`http://localhost:8081/api/kits`,{
        method:'GET',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
    });   
    const kitData = await listaKits.json();    
    
    const listaTools = await fetch('http://localhost:8081/api/herramientas',{
        method:'GET',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
    }); 
    const toolsData = await listaTools.json();        

    const listaWorkers = await fetch('http://localhost:8081/api/operarios',{
        method:'GET',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
    }); 
    const workersData = await listaWorkers.json();    

    if (!listaTools.ok) {
        throw Error('No se pudo cargar el listado de herramientas')
    }

    if (!listaKits.ok) {
        throw Error('No se pudo cargar el listado de kits')
    }

    if (!listaWorkers.ok) {
        throw Error('No se pudo cargar el listado de operarios')
    }    

    const operDataLoader = {kitData, toolsData, workersData};        
    return operDataLoader;
}


