import './InfoKit.css';
import {Modal, Tablas} from '../../IndexComponents';
import { useLoaderData, useParams } from 'react-router-dom'

export default function InfoKit(props){       
     
    const data_infoKit = useLoaderData()
    let totalTools = 0;

    for(let x in data_infoKit.tools){
        totalTools += Number(data_infoKit.tools[x].cant);
    }      
  
    const btnsInfoKit = [
        {
            btnname:"Editar",
            icobtn:"EditarIcono",
            estiloBoton:"btn-outline-secondary",
            tipo:"button",  
            accion:`/inventario/${useParams().kitId}/editarkit`
        },

        {
            btnname:"Descargar",
            icobtn:"DownloadIcono",
            estiloBoton:"btn-outline-secondary",
            accion:"null",
            tipo:"button",            
        }
      ];

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

      const columnsKit = [
        { key: 'id', title: 'ID' },
        { key: 'cant', title: 'Cantidad' },                
      ];      

    return(
        <div>
            <Modal 
            title="Información Kits"
            estiloModal="modal_completo"
            botoncss="btn_ModalIntermedio"
            botones={btnsInfoKit}
            >

                <nav className="nav nav-tabs" id="nav-tabKit" role="tablist">
                    <a className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Descripción</a>                    
                    <a className="nav-link disabled" id="nav-disabled-tab" data-bs-toggle="tab" href="#nav-disabled" role="tab" aria-controls="nav-disabled" tabIndex="-1" aria-disabled="true"> </a>
                </nav>

                <div className="tab-content" id="nav-tabContentKit">

                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        <div className="card tarjeta_tool text-secondary">
                            <div className="card-header bg-transparent text-primary">Detalles Primarios</div>
                            <div className="card-body">
                                <h5 className="card-title text-primary text-center">{data_infoKit.name}</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item atributo_lista text-secondary">ID: <span className='valor_atributo'>{data_infoKit.id}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Rol: <span className='valor_atributo'>{data_infoKit.rol}</span></li>                                    
                                    <li className="list-group-item atributo_lista text-secondary">Fecha de Ingreso: <span className='valor_atributo'>{data_infoKit.date_in}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Fecha de Baja: <span className='valor_atributo'>---</span></li>
                                </ul>
                            </div>

                            {/* aca voy estar pendiente */}
                            <div className="card-footer bg-transparent"><li className="list-group-item atributo_lista">Cantidad total de herramientas : <span>{totalTools}</span></li></div>
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
                            <Tablas
                                listado='transaccion'
                                estiloTabla="tabla_info_tool"
                                columns={columnsKit}
                                componente='inventario'
                                data={data_infoKit.tools}
                            />                                                                      
                        </div>                                        
                        
                    </div>                    
                </div>

            </Modal>
                                    
        </div>
    );
}

export const InfoKitLoader = async ({params}) => {        
    
    const detailKit = await fetch(`http://localhost:4000/kits/${params.kitId}`)           

    if (!detailKit.ok) {
        throw Error('No se pudo cargar la herramienta indicada')
      }
    
      return detailKit.json()
}