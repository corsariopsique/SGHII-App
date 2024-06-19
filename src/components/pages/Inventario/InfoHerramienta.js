import './InfoHerramienta.css';
import {Modal, Tablas, TraerImagenes} from '../../IndexComponents';
import { useLoaderData, useParams } from 'react-router-dom'


export default function InfoHerramienta(){       
     
    const data_infoTool = useLoaderData()
    const idImagen = useParams().toolId;    

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
            title="Información Herramienta"
            estiloModal="modal_completo"
            botoncss="btn_ModalIntermedio"
            botones={btnsInfoHerramienta}
            >

                <nav className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Descripción</a>                    
                    <a className="nav-link disabled" id="nav-disabled-tab" data-bs-toggle="tab" href="#nav-disabled" role="tab" aria-controls="nav-disabled" tabIndex="-1" aria-disabled="true"> </a>
                </nav>

                <div className="tab-content" id="nav-tabContent">

                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        <div className="card tarjeta_tool text-secondary">
                            <div className="card-header bg-transparent text-primary">Detalles Primarios</div>
                            <div className="card-body">
                                <h5 className="card-title text-primary text-center">{data_infoTool.nombre}</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item atributo_lista text-secondary">ID: <span className='valor_atributo'>{data_infoTool.id}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Categoria: <span className='valor_atributo'>{data_infoTool.categoria}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Marca: <span className='valor_atributo'>{data_infoTool.marca}</span></li>                                        
                                    <li className="list-group-item atributo_lista text-secondary">Rol: <span className='valor_atributo'>{data_infoTool.rol}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Fecha de Ingreso: <span className='valor_atributo'>{data_infoTool.fecha_in}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Fecha de Baja: <span className='valor_atributo'>---</span></li>
                                </ul>
                            </div>
                            <div className="card-footer bg-transparent"><li className="list-group-item atributo_lista">Cantidad Total: <span>{data_infoTool.cantidad}</span></li></div>
                        </div> 


                        <div className="card text-secondary last_oper_tool">
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

                        <div className="card tarjeta_img_tool">
                            <TraerImagenes ancho='450px' alto='450px' imageId={idImagen} />                            
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item atributo_lista text-secondary">En prestamo: <span className='valor_atributo'>15</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">En inventario: <span className='valor_atributo'>6</span></li>
                                </ul>
                            </div>
                        </div> 

                        {/*

                        <div className="card text-secondary proveedor">
                            <div className="card-header bg-transparent text-primary">Proveedores</div>
                            <div className="card-body">
                                <h5 className="card-title text-primary text-center">{data_infoTool.prove.name}</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item atributo_lista text-secondary">ID: <span className='valor_atributo'>{data_infoTool.prove.id_prove}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Telefono: <span className='valor_atributo'>{data_infoTool.prove.phone}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Ciudad: <span className='valor_atributo'>{data_infoTool.prove.city}</span></li>                                    
                                </ul>
                            </div>                            
                        </div> 

    */}
                        
                    </div>                    
                </div>

            </Modal>
                                    
        </div>
    );
}

export const InfoherramientaLoader = async ({params}) => {        
    
    const detail = await fetch(`http://localhost:8081/api/herramientas/${params.toolId}`)           

    if (!detail.ok) {
        throw Error('No se pudo cargar la herramienta indicada')
      }
    
      return detail.json()
}



