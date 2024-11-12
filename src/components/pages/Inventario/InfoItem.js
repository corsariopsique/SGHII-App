import './InfoItem.css';
import {Modal, Tablas, TraerImagenes} from '../../IndexComponents';
import { useLoaderData, useParams, Outlet } from 'react-router-dom'

export default function InfoItem(){       
     
    const data_infoItem = useLoaderData();
    const idImagen = data_infoItem.infoItem.herramienta.id;
    const lista_Oper = [];

    function textTipo (tipo) {
        if(tipo === 1){
            return 'Prestamo';
        }

        if(tipo === 2){
            return 'Devolución';
        }            
    };

    const deBaja = (estado) => {
        if(estado === null){
            return 'Activa'
        }else if (estado !== null){
            return 'Fuera de servicio'
        }
    };

    const estado = (estado) => {
        if(estado === 1){
            return 'No disponible'
        }else if (estado === 0){
            return 'Disponible'
        }
    };

    const ubicacion = () => {
        if(data_infoItem.itemResumen.ubicacionWorker===null && data_infoItem.infoItem.estado===1 && data_infoItem.infoItem.fecha_out===null){
            return `Kit: ${data_infoItem.itemResumen.ubicacionKit.nombre}`
        }else if(data_infoItem.itemResumen.ubicacionKit===null && data_infoItem.infoItem.estado===1 && data_infoItem.infoItem.fecha_out===null){
            return `Operario ->  ${data_infoItem.itemResumen.ubicacionWorker.nombre}`
        }else if (data_infoItem.infoItem.estado===0){
            return 'Inventario'
        }else{
            return 'Dado de baja'
        }
    };

    data_infoItem.itemOper.map((item) => {

        const oper = {
            id : item.id,  
            id_worker: item.operario.id,
            nombre: item.operario.nombre,          
            tipo : textTipo(item.tipo),            
            fecha_operacion : item.fecha_operacion
        }
        lista_Oper.push(oper);
    });    

    const col_oper_data = [
        { key: 'id', title: 'ID Operación' },
        { key: 'id_worker', title: 'ID Operario' },                
        { key: 'nombre', title: 'Nombre Operario' },        
        { key: 'tipo', title: 'Tipo' },        
        { key: 'fecha_operacion', title: 'Fecha de operación'}        
    ];   
     

    const btnsInfoItem = [
        {
            btnname:"Dar de Baja",
            icobtn:"EliminarIcono",
            estiloBoton:"btn-outline-danger",
            tipo:"button",  
            accion:`/inventario/items/${useParams().itemId}/deleteitem`
        },

        {
            btnname:"Descargar",
            icobtn:"DownloadIcono",
            estiloBoton:"btn-outline-secondary",
            accion:"null",
            tipo:"button",            
        }
    ];     

    return(

        <>
            <Modal 
            title="Información Item"
            estiloModal="modal_completo"
            botoncss="btn_ModalIntermedio"
            botones={btnsInfoItem}
            >               

                <ul class="nav nav-pills mb-3" id="nav-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button className="nav-link active" id="nav-home-tab" data-bs-toggle="pill" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home-tab" aria-selected="true">Descripción</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button className="nav-link" id="nav-oper-tab" data-bs-toggle="pill" data-bs-target="#nav-oper" type="button" role="tab" aria-controls="nav-oper-tab" aria-selected="false">Operaciones</button>
                    </li>                                    
                </ul>

                <div className="tab-content" id="nav-tabContent">

                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        <div className="card tarjeta_tool text-secondary">
                            <div className="card-header bg-transparent text-primary">Detalles Primarios</div>
                            <div className="card-body">
                                <h5 className="card-title text-primary text-center">{data_infoItem.infoItem.herramienta.nombre}</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item atributo_lista text-secondary">ID: <span className='valor_atributo'>{data_infoItem.infoItem.id}</span></li>                                    
                                    <li className="list-group-item atributo_lista text-secondary">Fecha de Ingreso: <span className='valor_atributo'>{data_infoItem.infoItem.fecha_in}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Fecha de Baja: <span className='valor_atributo'>{data_infoItem.infoItem.fecha_out}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Disponibilidad: <span className='valor_atributo'>{estado(data_infoItem.infoItem.estado)}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Estado: <span className='valor_atributo'>{deBaja(data_infoItem.infoItem.fecha_out)}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Ubicación: <span className='valor_atributo'>{ubicacion()}</span></li>
                                </ul>
                            </div>
                            <div className="card-footer bg-transparent"><li className="list-group-item atributo_lista">Cantidad Total Operaciones: <span>{data_infoItem.itemOper.length}</span></li></div>
                        </div>


                        <div className="card tarjeta_img_tool">
                            <TraerImagenes size='sizeInfoImg' tipo='1' ancho='450px' alto='450px' imageId={idImagen} />                            
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item atributo_lista text-secondary">Prestamos: <span className='valor_atributo'>{data_infoItem.itemResumen.prestamos}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Devoluciones: <span className='valor_atributo'>{data_infoItem.itemResumen.devoluciones}</span></li>                                    
                                </ul>
                            </div>
                        </div>

                        <nav class="nav nav-tabs" id="nav-tab-top" role="tablist">
                            <a class="nav-link active" id="nav-tools-tab" data-bs-toggle="tab" href="#nav-tools" role="tab" aria-controls="nav-tools" aria-selected="true">Top - Operarios</a>
                            <a class="nav-link" id="nav-kits-tab" data-bs-toggle="tab" href="#nav-kits" role="tab" aria-controls="nav-kits" aria-selected="false">Top - Kits</a>                            
                        </nav>      

                        <div class="tab-content" id="nav-tabContentTop">                        

                            <div className="card tarjeta_Top_Tools tab-pane fade show active" id="nav-tools" role="tabpanel" aria-labelledby="nav-tools-tab">                            
                                <div className="card-body">
                                <h5 className="card-header bg-transparent text-primary">Top - Operarios</h5>
                                    {data_infoItem.itemResumen.itemWorkers.map((item,index)=> (

                                        <>
                                            <div className="card-header bg-transparent text-success">
                                                <li className="list-group-item atributo_listaOpers text-secondary" >Top # =  [ <span className='valor_atributo text-secondary'>{index+1}</span> ]</li>
                                                <li className="list-group-item atributo_listaOpers text-secondary" >ID Operario =  [ <span className='valor_atributo text-secondary'>{item.operario.id}</span> ]</li>
                                                <li className="list-group-item atributo_listaOpers text-secondary" >Nombre = [<span className='valor_atributo text-secondary'>{item.operario.nombre}</span>]</li>    
                                                <li className="list-group-item atributo_listaOpers text-secondary" >Rol = [<span className='valor_atributo text-secondary'>{item.operario.rol}</span>]</li>    
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
                                    {data_infoItem.itemResumen.itemKits.map((item,index)=> (

                                        <>
                                            <div className="card-header bg-transparent text-success">
                                                <li className="list-group-item atributo_listaOpers text-secondary" >Top # =  [ <span className='valor_atributo text-secondary'>{index+1}</span> ]</li>
                                                <li className="list-group-item atributo_listaOpers text-secondary" >ID Kit =  [ <span className='valor_atributo text-secondary'>{item.id}</span> ]</li>
                                                <li className="list-group-item atributo_listaOpers text-secondary" >Nombre = [<span className='valor_atributo text-secondary'>{item.nombre}</span>]</li>    
                                                <li className="list-group-item atributo_listaOpers text-secondary" >Rol = [<span className='valor_atributo text-secondary'>{item.rol}</span>]</li>                                                    
                                            </div>

                                            <div className='card-footer' key={index}></div>                                        
                                        </>
                                    ))}

                                </div>
                            </div>

                        </div>          

                    </div>


                    <div className="tab-pane fade show " id="nav-oper" role="tabpanel" aria-labelledby="nav-oper-tab">

                        <div className="card text-secondary operaciones_Tool">
                            <div className="card-header bg-transparent text-primary">Operaciones</div>
                            <div className="card-body">                                
                                <Tablas
                                listado='operaciones'
                                estiloTabla="tabla_info_tool"
                                columns={col_oper_data}
                                data={lista_Oper}
                                />                 
                                
                            </div>                            
                        </div>

                    </div>
                   
                </div>

            </Modal>   

            <Outlet />                                 
        </>
    );
}

export const InfoItemLoader = async ({params}) => { 
    
    const token = localStorage.getItem('token');
    const webServiceUrl = localStorage.getItem('webServiceUrl');

    const detailItem = await fetch(`${webServiceUrl}items/${params.itemId}`,{
        method:'GET',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
    }); 
    
    const operItem = await fetch(`${webServiceUrl}items/${params.itemId}/operaciones`,{
        method:'GET',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
    });      

    const resumenItem = await fetch(`${webServiceUrl}items/${params.itemId}/resumen`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`},
    })  
    
    const infoItem = await detailItem.json();

    if (!detailItem.ok) {
        throw Error('No se pudo cargar la herramienta indicada')
    }

    const itemOper = await operItem.json();

    if (!operItem.ok) {
        throw Error('No se pudo cargar las operaciones de la herramienta indicada')
    }    

    const itemResumen = await resumenItem.json();

    if (!resumenItem.ok) {
        throw Error('No se pudo cargar el resumen de la herramienta indicada')
    }   

    const dataTool = {infoItem,itemOper,itemResumen};    
    
    return dataTool;
}



