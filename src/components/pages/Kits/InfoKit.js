import './InfoKit.css';
import {Modal, Tablas} from '../../IndexComponents';
import * as Icons from '../../Iconos/IndexIcons';
import ListarKits from './ListarKits';
import { useLoaderData, useParams, useNavigate } from 'react-router-dom'

export default function InfoKit(){       
     
    const data_infoKit = useLoaderData(); 
    const navigate = useNavigate();  
    
    const lista_Oper_Kit = [];

    function textTipo (tipo) {
        if(tipo === 1){
            return 'Prestamo';
        }

        if(tipo === 2){
            return 'Devolución';
        }            
    };

    data_infoKit.operKit.map((item) => {
                
        const oper = {
            id : item.id,  
            id_worker: item.operario.id,
            nombre: item.operario.nombre,          
            tipo : textTipo(item.tipo),            
            fecha_operacion : item.fecha_operacion
        }
        lista_Oper_Kit.push(oper);
});    

    const col_oper_data = [
        { key: 'id', title: 'ID Operación' },
        { key: 'id_worker', title: 'ID Operario' },                
        { key: 'nombre', title: 'Nombre Operario' },        
        { key: 'tipo', title: 'Tipo' },        
        { key: 'fecha_operacion', title: 'Fecha de operación'}        
    ];      


    const kit_Estado = (estado) => {
        if(!estado){
            return 'Disponible'
        }else{
            return 'Prestado'
        }
    };    

    const numTool = data_infoKit.kitDetail.herramientas.length; 
    const enlaceEditarKit = `/kits/${useParams().kitId}/editarkits`;   

    const handlerClickButton = () => {
        if(!data_infoKit.kitDetail.disponible){
            navigate(enlaceEditarKit);            
        }else{
            alert(`El kit con id ${data_infoKit.id} no es editable porque se encuentra en prestamo`);            
        }
    };
   
    return(
        <div>
            <Modal 
            title="Información Kits"
            estiloModal="modal_completo"            
            >

                <div className="btn-group btn_ModalIntermedio" role="group" aria-label="Large button group">                    

                    <button                              
                        type="button" 
                        className="btn botonEditKit btn-outline-secondary"
                        onClick={handlerClickButton}                                       
                    >                
                        <Icons.EditarIcono id="icobtnEditKit"/>Editar              

                    </button>                    
                    
                    <button  
                        type="button" 
                        className="btn botonEditKit btn-outline-secondary"                                                                                   
                    >                
                        <Icons.DownloadIcono id="icobtnEditKit"/>Descargar              

                    </button>            

                </div> 

                <ul class="nav nav-pills mb-3" id="nav-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button className="nav-link active" id="nav-home-tab" data-bs-toggle="pill" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home-tab" aria-selected="true">Descripción</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button className="nav-link" id="nav-oper-tab" data-bs-toggle="pill" data-bs-target="#nav-oper" type="button" role="tab" aria-controls="nav-oper-tab" aria-selected="false">Operaciones</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button className="nav-link disable" id="nav-disabled-tab" data-bs-toggle="pill" data-bs-target="#nav-disabled" type="button" role="tab" aria-controls="nav-disabled-tab" aria-selected="false"></button>
                    </li>
                </ul>

                <div className="tab-content" id="nav-tabContentKit">

                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        <div className="card tarjeta_kit text-secondary">
                            <div className="card-header bg-transparent text-primary">Detalles Primarios</div>
                            <div className="card-body">
                                <h5 className="card-title text-primary text-center">{data_infoKit.kitDetail.nombre}</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item atributo_lista text-secondary">ID: <span className='valor_atributo'>{data_infoKit.kitDetail.id}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Rol: <span className='valor_atributo'>{data_infoKit.kitDetail.rol}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Estado: <span className='valor_atributo'>{kit_Estado(data_infoKit.kitDetail.disponible)}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Fecha de Ingreso: <span className='valor_atributo'>{data_infoKit.kitDetail.fecha_in}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Fecha de Baja: <span className='valor_atributo'>---</span></li>
                                </ul>
                            </div>
                            
                            <div className="card-footer bg-transparent"><li className="list-group-item atributo_lista">Cantidad total de herramientas : <span>{numTool}</span></li></div>
                        </div> 

                        <div className="card tarjeta_Top_Workers tab-pane fade show active" >                            
                            <div className="card-body">
                            <h5 className="card-header bg-transparent text-primary">Top - Operarios</h5>
                                {data_infoKit.resumenKits.listaUsoOperarios.map((item,index)=> (

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

                        <div className="card tarjeta_img_kit">
                            <div className="card-header bg-transparent text-primary">Listado Herramientas</div>
                            <ListarKits tipo = '1' herramientas={data_infoKit.kitDetail.herramientas} />                                                                 
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
                                data={lista_Oper_Kit}
                                />                 
                                
                            </div>                            
                        </div>

                    </div>

                </div>

            </Modal>
                                    
        </div>
    );
}

export const InfoKitLoader = async ({params}) => {  
    
    const token = localStorage.getItem('token'); 
    
    const detailKit = await fetch(`http://localhost:8081/api/kits/${params.kitId}`, {
        method:'GET',
        headers: {'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`},
    })     
    
    const kitOper = await fetch(`http://localhost:8081/api/kits/${params.kitId}/operaciones`, {
        method:'GET',
        headers: {'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`},
    })    
    
    const kitResumen = await fetch(`http://localhost:8081/api/kits/${params.kitId}/resumen`, {
        method:'GET',
        headers: {'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`},
    })   

    if (!detailKit.ok) {
        throw Error('No se pudo cargar el kit indicado')
    }

    if (!kitResumen.ok) {
        throw Error('No se pudo cargar el resumen del kit indicado')
    }

    if (!kitOper.ok) {
        throw Error('No se pudo cargar las operaciones del kit indicado')
    }

    const kitDetail = await detailKit.json();

    const operKit = await kitOper.json();

    const resumenKits =  await kitResumen.json();

    const totalData = {kitDetail,operKit,resumenKits};
    
    return totalData;
}
