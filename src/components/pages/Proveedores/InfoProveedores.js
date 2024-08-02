import './InfoProveedores.css';
import {Modal, Tablas} from '../../IndexComponents';
import * as Icons from '../../Iconos/IndexIcons';
import { useLoaderData, useParams, useNavigate } from 'react-router-dom'
import ListarToolSuplier from './ListarToolSuplier';

export default function InfoProveedores(){       
     
    const data_infoProveedor = useLoaderData(); 
    const navigate = useNavigate();   
    
    const numTool_Suplier = data_infoProveedor.herramientas.length; 
    const enlaceEditarProveedor = `/proveedores/${useParams().suplierId}/editarproveedor`;   

    const handlerClickButton = () => {
        navigate(enlaceEditarProveedor);        
    }    

    const columns = [
        { key: 'id', title: 'ID' },
        { key: 'name', title: 'Nombre Operario' },        
        { key: 'date',title: 'Fecha Operación'},
    ];      
      
    const data = [
        { id: 'S1', name: 'Jose', date:"2024-02-15"},
        { id: 'A3', name: 'Carlos', date:"2024-01-25"},
        { id: 'S8', name: 'Roberto', date:"2023-12-21"},
        { id: 'D5', name: 'Jose Maria', date:"2024-01-09"},
    ];           

    return(
        <div>
            <Modal 
            title="Información Proveedores"
            estiloModal="modal_completo"            
            >

                <div className="btn-group btn_ModalIntermedio" role="group" aria-label="Large button group">                    

                    <button                              
                        type="button" 
                        className="btn botonEditSuplier btn-outline-secondary"
                        onClick={handlerClickButton}                                       
                    >                
                        <Icons.EditarIcono id="icobtnEditSuplier"/>Editar              

                    </button>                    
                    
                    <button  
                        type="button" 
                        className="btn botonEditKit btn-outline-secondary"                                                                                   
                    >                
                        <Icons.DownloadIcono id="icobtnEditKit"/>Descargar              

                    </button>            

                </div> 

                <nav className="nav nav-tabs" id="nav-tabSuplier" role="tablist">
                    <a className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Descripción</a>                    
                    <a className="nav-link disabled" id="nav-disabled-tab" data-bs-toggle="tab" href="#nav-disabled" role="tab" aria-controls="nav-disabled" tabIndex="-1" aria-disabled="true"> </a>
                </nav>

                <div className="tab-content" id="nav-tabContentSuplier">

                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        <div className="card tarjeta_Suplier text-secondary">
                            <div className="card-header bg-transparent text-primary">Detalles Primarios</div>
                            <div className="card-body">
                                <h5 className="card-title text-primary text-center">{data_infoProveedor.nombre}</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item atributo_lista text-secondary">ID: <span className='valor_atributo'>{data_infoProveedor.id}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Telefono: <span className='valor_atributo'>{data_infoProveedor.telefono}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Ciudad: <span className='valor_atributo'>{data_infoProveedor.ciudad}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Fecha de Ingreso: <span className='valor_atributo'>{data_infoProveedor.fecha_in}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Fecha de Baja: <span className='valor_atributo'>---</span></li>
                                </ul>
                            </div>
                            
                            <div className="card-footer bg-transparent"><li className="list-group-item atributo_lista">Cantidad total de herramientas : <span>{numTool_Suplier}</span></li></div>
                        </div> 


                        <div className="card text-secondary last_oper">
                            <div className="card-header bg-transparent text-primary">Ultimas Operaciones</div>
                            <div className="card-body">
                                <Tablas
                                listado='transaccion'
                                estiloTabla="tabla_info_tool"
                                columns={columns}
                                data={data}
                                />                                
                            </div>
                        </div>   

                        <div className="card tarjeta_img_kit">
                            <div className="card-header bg-transparent text-primary">Listado Herramientas</div>
                            <ListarToolSuplier herramientas={data_infoProveedor.herramientas} />                                                                 
                        </div>                                        
                        
                    </div>                    
                </div>

            </Modal>
                                    
        </div>
    );
}

export const InfoSuplierLoader = async ({params}) => {  
    
    const token = localStorage.getItem('token'); 
    
    const detailSuplier = await fetch(`http://localhost:8081/api/proveedores/${params.suplierId}`, {
        method:'GET',
        headers: {'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`},
    })           

    if (!detailSuplier.ok) {
        throw Error('No se pudo cargar el kit indicado')
      }
    
      return detailSuplier.json()
}
