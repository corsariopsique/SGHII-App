import './InfoOperario.css';
import { Modal, TraerImagenes} from '../../IndexComponents';
import { useLoaderData, useParams } from 'react-router-dom'
import ListarElementos from './ListarElementos';


export default function InfoOperario(){       
     
    const data_infoWorker = useLoaderData()    
    const idImagenWorker = useParams().workerId;       
    

    function textTipo (tipo) {
        if(tipo === 1){
            return 'Prestamo';
        }

        if(tipo === 2){
            return 'Devolución';
        }            
    };  
    
    const worker_Estado = (estado) => {
        if(!estado){
            return 'Activo'
        }else{
            return 'Dado de baja'
        }
    };

    const btnsInfoOperarios = [
        {
            btnname:"Editar",
            icobtn:"EditarIcono",
            estiloBoton:"btn-outline-secondary",
            tipo:"button",  
            accion:`/operarios/${useParams().workerId}/editaroperario`
        },       
        {
            btnname:"Paz y Salvo",
            icobtn:"PazYSalvoIcono",
            estiloBoton:"btn-outline-success",
            accion:"null",
            tipo:"button",            
        }
      ];     

    return(
        <div>
            <Modal 
            title="Información Operario"
            estiloModal="modal_completo"
            botoncss="btn_ModalIntermedio"
            botones={btnsInfoOperarios}
            >

                <ul className="nav nav-pills mb-6" id="nav-tab" role="tablist">

                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="nav-home-tab" data-bs-toggle="pill" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home-tab" aria-selected="true">Descripción</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="nav-oper-tab" data-bs-toggle="pill" data-bs-target="#nav-oper" type="button" role="tab" aria-controls="nav-oper-tab" aria-selected="false">Operaciones Totales</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="nav-articulo-tab" data-bs-toggle="pill" data-bs-target="#nav-articulo" type="button" role="tab" aria-controls="nav-articulo-tab" aria-selected="false">Articulos Pendientes</button>
                    </li>                    
                </ul>

                <div className="tab-content" id="nav-tabContent">

                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        <div className="card tarjeta_tool text-secondary">
                            <div className="card-header bg-transparent text-primary">Detalles Primarios</div>
                            <div className="card-body">
                                <h5 className="card-title text-primary text-center">{data_infoWorker.dataWorker.nombre}</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item atributo_lista text-secondary">Cédula: <span className='valor_atributo'>{data_infoWorker.dataWorker.id}</span></li>                                    
                                    <li className="list-group-item atributo_lista text-secondary">Rol: <span className='valor_atributo'>{data_infoWorker.dataWorker.rol}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Telefono: <span className='valor_atributo'>{data_infoWorker.dataWorker.telefono}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Email: <span className='valor_atributo'>{data_infoWorker.dataWorker.email}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Estado: <span className='valor_atributo'>{worker_Estado(data_infoWorker.dataWorker.estado)}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Fecha de Ingreso: <span className='valor_atributo'>{data_infoWorker.dataWorker.fecha_in}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Fecha de Baja: <span className='valor_atributo'>{data_infoWorker.dataWorker.fecha_out}</span></li>
                                </ul>
                            </div>
                            <div className="card-footer bg-transparent"><li className="list-group-item atributo_lista">Cantidad Total Operaciones:<span className='valor_atributo'>{data_infoWorker.operWorker.length}</span></li></div>
                        </div>                        

                        <div className="card tarjeta_img_tool">
                            <TraerImagenes size='sizeInfoImg' tipo='2' ancho='450px' alto='450px' imageId={idImagenWorker} />                            
                            <div className="card-body">
                                <ul className="list-group list-group-flush">                                    
                                    <li className="list-group-item atributo_lista text-secondary">Operaciones de prestamo: <span className='valor_atributo'>{data_infoWorker.resumenWorker.prestamos}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Operaciones de devolución: <span className='valor_atributo'>{data_infoWorker.resumenWorker.devoluciones}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Total herramientas (Reg) prestadas: <span className='valor_atributo'>{data_infoWorker.resumenWorker.totalTools}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Total kits (Reg) prestados: <span className='valor_atributo'>{data_infoWorker.resumenWorker.totalKits}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Operaciones ultimos 30 dias: <span className='valor_atributo'>{data_infoWorker.resumenWorker.operL30d}</span></li>
                                </ul>
                            </div>
                        </div>

                        <nav class="nav nav-tabs" id="nav-tab-top" role="tablist">
                            <a class="nav-link active" id="nav-tools-tab" data-bs-toggle="tab" href="#nav-tools" role="tab" aria-controls="nav-tools" aria-selected="true">Top - Herramientas</a>
                            <a class="nav-link" id="nav-kits-tab" data-bs-toggle="tab" href="#nav-kits" role="tab" aria-controls="nav-kits" aria-selected="false">Top - Kits</a>                            
                        </nav>      

                        <div class="tab-content" id="nav-tabContentTop">                        

                            <div className="card tarjeta_Top_Tools tab-pane fade show active" id="nav-tools" role="tabpanel" aria-labelledby="nav-tools-tab">                            
                                <div className="card-body">
                                <h5 className="card-header bg-transparent text-primary">Top - Herramientas</h5>
                                    {data_infoWorker.resumenWorker.listaUsoTools.map((item,index)=> (

                                        <>
                                            <div className="card-header bg-transparent text-success">
                                                <li className="list-group-item atributo_listaOpers text-secondary" >Top # =  [ <span className='valor_atributo text-secondary'>{index+1}</span> ]</li>
                                                <li className="list-group-item atributo_listaOpers text-secondary" >ID Herramienta =  [ <span className='valor_atributo text-secondary'>{item.tool.id}</span> ]</li>
                                                <li className="list-group-item atributo_listaOpers text-secondary" >Nombre = [<span className='valor_atributo text-secondary'>{item.tool.nombre}</span>]</li>    
                                                <li className="list-group-item atributo_listaOpers text-secondary" >Rol = [<span className='valor_atributo text-secondary'>{item.tool.rol}</span>]</li>    
                                                <li className="list-group-item atributo_listaOpers text-secondary" >Cantidad de prestamos = [<span className='valor_atributo text-secondary'>{item.cantidad}</span>]</li>                                            
                                            </div>

                                            <div className='card-footer' key={index}></div>                                        
                                        </>
                                    ))}

                                </div>
                            </div>

                            <div className="card tarjeta_Top_Tools tab-pane fade show" id="nav-kits" role="tabpanel" aria-labelledby="nav-kits-tab">                            
                                <div className="card-body">
                                <h5 className="card-header bg-transparent text-primary">Top - Kits</h5>
                                    {data_infoWorker.resumenWorker.listaUsoKits.map((item,index)=> (

                                        <>
                                            <div className="card-header bg-transparent text-success">
                                                <li className="list-group-item atributo_listaOpers text-secondary" >Top # =  [ <span className='valor_atributo text-secondary'>{index+1}</span> ]</li>
                                                <li className="list-group-item atributo_listaOpers text-secondary" >ID Kit =  [ <span className='valor_atributo text-secondary'>{item.kit.id}</span> ]</li>
                                                <li className="list-group-item atributo_listaOpers text-secondary" >Nombre = [<span className='valor_atributo text-secondary'>{item.kit.nombre}</span>]</li>    
                                                <li className="list-group-item atributo_listaOpers text-secondary" >Rol = [<span className='valor_atributo text-secondary'>{item.kit.rol}</span>]</li>    
                                                <li className="list-group-item atributo_listaOpers text-secondary" >Cantidad de prestamos = [<span className='valor_atributo text-secondary'>{item.cantidad}</span>]</li>                                            
                                            </div>

                                            <div className='card-footer' key={index}></div>                                        
                                        </>
                                    ))}

                                </div>
                            </div>

                        </div>                 
                        
                    </div>       

                    <div className="tab-pane fade show" id="nav-oper" role="tabpanel" aria-labelledby="nav-oper-tab">

                        <div className="card text-secondary operaciones_Tool"> 
                                               
                            {data_infoWorker.operWorker.map((item,index)=> (
                                <>                                
                                    <div className="card-header bg-transparent text-success">
                                        <li className="list-group-item atributo_listaOpers text-secondary" >ID Operación =  [ <span className='valor_atributo text-secondary'>{item.id}</span> ]</li>
                                        <li className="list-group-item atributo_listaOpers text-secondary" >Tipo de operación = [<span className='valor_atributo text-secondary'>{textTipo(item.tipo)}</span>]</li>    
                                        <li className="list-group-item atributo_listaOpers text-secondary" >Fecha de operación = [<span className='valor_atributo text-secondary'>{item.fecha_operacion}</span>]</li>    
                                        <li className="list-group-item atributo_listaOpers text-secondary" >Número de articulos = [<span className='valor_atributo text-secondary'>{item.herramienta.length+item.kit.length}</span>]</li>                                            
                                    </div>
                                    <div className="card-body">
                                        {item.herramienta &&
                                            <ListarElementos tipo='1' herramientas={item.herramienta}/>}
                                        {item.kit &&
                                            <ListarElementos tipo = '2' kits={item.kit} /> }
                                    </div>
                                    <div className='card-footer' key={index}></div>

                                </>

                            ))}  

                        </div>                          
                         
                    </div>  

                    <div className="tab-pane fade show" id="nav-articulo" role="tabpanel" aria-labelledby="nav-articulo-tab">

                        <div className="card text-secondary operaciones_Tool"> 
                            <div className="card-header bg-transparent text-success">
                                <li className="list-group-item atributo_listaOpers text-secondary">Número de articulos por entregar =  [ <span className='valor_atributo text-secondary'>
                                    {data_infoWorker.pendientesWorker.herramientas.length + data_infoWorker.pendientesWorker.kits.length}</span> ]</li>                                                                          
                            </div>                                               
                                                           
                            <div className="card-body">                                
                                <ListarElementos tipo='1' herramientas={data_infoWorker.pendientesWorker.herramientas}/>                                
                                <ListarElementos tipo = '2' kits={data_infoWorker.pendientesWorker.kits} /> 
                            </div>
                            <div className='card-footer'></div>                            

                        </div>                          
                         
                    </div>    

                </div>

            </Modal>
                                    
        </div>
    );
}

export const InfoOperarioLoader = async ({params}) => { 
    
    const token = localStorage.getItem('token'); 
    const webServiceUrl = localStorage.getItem('webServiceUrl');
    
    const trabajador = await fetch(`${webServiceUrl}operarios/${params.workerId}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`},
    })   
    
    const operacionesPendientesTrabajador = await fetch(`${webServiceUrl}operarios/${params.workerId}/prestamo`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`},
    })  

    const operacionesTrabajador = await fetch(`${webServiceUrl}operarios/${params.workerId}/operaciones`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`},
    })  

    const resumenTrabajador = await fetch(`${webServiceUrl}operarios/${params.workerId}/resumen`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`},
    })  

    if (!trabajador.ok) {
        throw Error('No se pudo cargar el operador indicado')
    }

    if (!operacionesTrabajador.ok) {
        throw Error('No se pudo cargar las operaciones del operador indicado')
    }

    if (!operacionesPendientesTrabajador.ok) {
        throw Error('No se pudo cargar las operaciones pendientes del operador indicado')
    }

    if (!resumenTrabajador.ok) {
        throw Error('No se pudo cargar el resumen del operador indicado')
    }    

    const dataWorker = await trabajador.json();
    const operWorker = await operacionesTrabajador.json();
    const pendientesWorker = await operacionesPendientesTrabajador.json();
    const resumenWorker = await resumenTrabajador.json();

    const totalData = {dataWorker,operWorker,pendientesWorker,resumenWorker};    
    
    return totalData;
}