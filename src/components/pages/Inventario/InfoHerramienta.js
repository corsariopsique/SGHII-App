import './InfoHerramienta.css';
import {Modal, Tablas, TraerImagenes} from '../../IndexComponents';
import { useLoaderData, useParams } from 'react-router-dom'
import ListarHerramientas from './ListarHerramientas';

export default function InfoHerramienta(){       
     
    const data_infoTool = useLoaderData();
    const idImagen = useParams().toolId;    
    const tool_prestamo = data_infoTool.infoTool.cantidad - data_infoTool.infoTool.cantidad_disponible - data_infoTool.infoTool.cantidad_kits;
    const lista_Oper = [];

    function textTipo (tipo) {
        if(tipo === 1){
            return 'Prestamo';
        }

        if(tipo === 2){
            return 'Devolución';
        }            
    };

    data_infoTool.toolOper.map((item) => {

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
    
    const col_suplier_data = [
        { key: 'id', title: 'ID Proveedor' },        
        { key: 'nombre', title: 'Nombre Proveedor' },        
        { key: 'telefono', title: 'Telefono' },        
        { key: 'ciudad', title: 'Ciudad' },        
        { key: 'fecha_in', title: 'Fecha de ingreso'}      
    ];    

    const btnsInfoHerramienta = [
        {
            btnname:"Editar",
            icobtn:"EditarIcono",
            estiloBoton:"btn-outline-secondary",
            tipo:"button",  
            accion:`/inventario/${useParams().toolId}/editarherramienta`
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
            title="Información Herramienta"
            estiloModal="modal_completo"
            botoncss="btn_ModalIntermedio"
            botones={btnsInfoHerramienta}
            >               

                <ul class="nav nav-pills mb-3" id="nav-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button className="nav-link active" id="nav-home-tab" data-bs-toggle="pill" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home-tab" aria-selected="true">Descripción</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button className="nav-link" id="nav-oper-tab" data-bs-toggle="pill" data-bs-target="#nav-oper" type="button" role="tab" aria-controls="nav-oper-tab" aria-selected="false">Operaciones</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button className="nav-link" id="nav-suplier-tab" data-bs-toggle="pill" data-bs-target="#nav-suplier" type="button" role="tab" aria-controls="nav-suplier-tab" aria-selected="false">Proveedores</button>
                    </li>    
                    <li class="nav-item" role="presentation">
                        <button className="nav-link" id="nav-items-tab" data-bs-toggle="pill" data-bs-target="#nav-items" type="button" role="tab" aria-controls="nav-items-tab" aria-selected="false">Items Herramienta</button>
                    </li>                 
                </ul>

                <div className="tab-content" id="nav-tabContent">

                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        <div className="card tarjeta_tool text-secondary">
                            <div className="card-header bg-transparent text-primary">Detalles Primarios</div>
                            <div className="card-body">
                                <h5 className="card-title text-primary text-center">{data_infoTool.infoTool.nombre}</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item atributo_lista text-secondary">ID: <span className='valor_atributo'>{data_infoTool.infoTool.id}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Categoria: <span className='valor_atributo'>{data_infoTool.infoTool.categoria}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Marca: <span className='valor_atributo'>{data_infoTool.infoTool.marca}</span></li>                                        
                                    <li className="list-group-item atributo_lista text-secondary">Rol: <span className='valor_atributo'>{data_infoTool.infoTool.rol}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Fecha de Ingreso: <span className='valor_atributo'>{data_infoTool.infoTool.fecha_in}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Fecha de Baja: <span className='valor_atributo'>{data_infoTool.infoTool.fecha_out}</span></li>
                                </ul>
                            </div>
                            <div className="card-footer bg-transparent"><li className="list-group-item atributo_lista">Cantidad Total: <span>{data_infoTool.infoTool.cantidad}</span></li></div>
                        </div>


                        <div className="card tarjeta_img_tool">
                            <TraerImagenes size='sizeInfoImg' tipo='1' ancho='450px' alto='450px' imageId={idImagen} />                            
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item atributo_lista text-secondary">En prestamo: <span className='valor_atributo'>{tool_prestamo}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">En kits: <span className='valor_atributo'>{data_infoTool.infoTool.cantidad_kits}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">En inventario: <span className='valor_atributo'>{data_infoTool.infoTool.cantidad_disponible}</span></li>
                                    
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
                                    {data_infoTool.herramientaResumen.listaUsoOperarios.map((item,index)=> (

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
                                    {data_infoTool.herramientaResumen.listaUsoKits.map((item,index)=> (

                                        <>
                                            <div className="card-header bg-transparent text-success">
                                                <li className="list-group-item atributo_listaOpers text-secondary" >Top # =  [ <span className='valor_atributo text-secondary'>{index+1}</span> ]</li>
                                                <li className="list-group-item atributo_listaOpers text-secondary" >ID Kit =  [ <span className='valor_atributo text-secondary'>{item.kit.id}</span> ]</li>
                                                <li className="list-group-item atributo_listaOpers text-secondary" >Nombre = [<span className='valor_atributo text-secondary'>{item.kit.nombre}</span>]</li>    
                                                <li className="list-group-item atributo_listaOpers text-secondary" >Rol = [<span className='valor_atributo text-secondary'>{item.kit.rol}</span>]</li>    
                                                <li className="list-group-item atributo_listaOpers text-secondary" >Cantidad de piezas = [<span className='valor_atributo text-secondary'>{item.cantidad}</span>]</li>                                            
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


                    <div className="tab-pane fade show " id="nav-suplier" role="tabpanel" aria-labelledby="nav-suplier-tab">

                        <div className="card text-secondary operaciones_Tool">
                            <div className="card-header bg-transparent text-primary">Proveedores</div>
                            <div className="card-body">                                
                                <Tablas
                                listado='proveedores'
                                estiloTabla="tabla_info_tool"
                                columns={col_suplier_data}
                                data={data_infoTool.toolSuplier}
                                />                 
                                
                            </div>                            
                        </div>

                    </div>

                    <div className="tab-pane fade show " id="nav-items" role="tabpanel" aria-labelledby="nav-items-tab">

                        <div className="card text-secondary operaciones_Tool">
                                <div className="card-header bg-transparent text-primary">Items Herramienta</div>
                                <div className="card-body">
                                    <ListarHerramientas tipo = '2' herramientas={data_infoTool.herramientaResumen.itemsTool} />
                                </div>                            
                        </div>

                    </div>

                </div>

            </Modal>                                    
        </>
    );
}

export const InfoherramientaLoader = async ({params}) => { 
    
    const token = localStorage.getItem('token');

    const detail = await fetch(`http://localhost:8081/api/herramientas/${params.toolId}`,{
        method:'GET',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
    }); 
    
    const operTool = await fetch(`http://localhost:8081/api/herramientas/${params.toolId}/operaciones`,{
        method:'GET',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
    });  

    const suplierTool = await fetch(`http://localhost:8081/api/herramientas/${params.toolId}/proveedores`,{
        method:'GET',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
    });  

    const resumenHerramienta = await fetch(`http://localhost:8081/api/herramientas/${params.toolId}/resumen`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`},
    })  
    
    const infoTool = await detail.json();

    if (!detail.ok) {
        throw Error('No se pudo cargar la herramienta indicada')
    }

    const toolOper = await operTool.json();

    if (!operTool.ok) {
        throw Error('No se pudo cargar las operaciones de la herramienta indicada')
    }

    const toolSuplier = await suplierTool.json();

    if (!suplierTool.ok) {
        throw Error('No se pudo cargar los proveedores de la herramienta indicada')
    }

    if (!resumenHerramienta.ok) {
        throw Error('No se pudo cargar el resumen de la herramienta indicada')
    }

    const herramientaResumen = await resumenHerramienta.json();

    const dataTool = {infoTool,toolOper,toolSuplier,herramientaResumen};    
    
    return dataTool;
}



