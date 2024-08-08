import './InfoOperacion.css';
import {Modal, Tablas} from '../../IndexComponents';
import * as Icons from '../../Iconos/IndexIcons';
import ListarElementosOperaciones from './ListarElementosOperaciones';
import { useLoaderData } from 'react-router-dom';

export default function InfoOperacion(){     
        
    const data_infoOperacion = useLoaderData();    

    const oper_Estado = (estado) => {
        if(estado === 1){
            return 'Prestamo'
        }else if (estado === 2){
            return 'Devolución'
        }
    };  
    
    const tipoArticulo = () => {
        if(data_infoOperacion.herramienta.length>0){            
            return true;
        }else{            
            return false; 
        }
    }   

    const numElement = () => {

        if(tipoArticulo()){
            const numToolOper = data_infoOperacion.herramienta.length;    
            return numToolOper;
        }else{            
            return '1';
        }      
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
        <>
            <Modal 
            title="Información Operaciones"
            estiloModal="modal_completo"            
            >

                <div className="btn-group btn_ModalIntermedio" role="group" aria-label="Large button group">                                     
                    
                    <button  
                        type="button" 
                        className="btn botonOperInfo btn-outline-secondary"                                                                                   
                    >                
                        <Icons.DownloadIcono id="icobtnOper"/>Descargar              

                    </button>            

                </div> 

                <nav className="nav nav-tabs" id="nav-tabOper" role="tablist">
                    <a className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Descripción</a>                    
                    <a className="nav-link disabled" id="nav-disabled-tab" data-bs-toggle="tab" href="#nav-disabled" role="tab" aria-controls="nav-disabled" tabIndex="-1" aria-disabled="true"> </a>
                </nav>

                <div className="tab-content" id="nav-tabContentOper">

                    <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        <div className="card tarjeta_Oper text-secondary">
                            <div className="card-header bg-transparent text-primary">Detalles Primarios</div>
                            <div className="card-body">
                                <h5 className="card-title text-primary text-center">{data_infoOperacion.id}</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item atributo_lista text-secondary">Nombre Operario: <span className='valor_atributo'>{data_infoOperacion.operario.nombre}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">ID Operario: <span className='valor_atributo'>{data_infoOperacion.operario.id}</span></li>                                    
                                    <li className="list-group-item atributo_lista text-secondary">Tipo: <span className='valor_atributo'>{oper_Estado(data_infoOperacion.tipo)}</span></li>
                                    <li className="list-group-item atributo_lista text-secondary">Fecha de Operación: <span className='valor_atributo'>{data_infoOperacion.fecha_operacion}</span></li>                                    
                                </ul>
                            </div>
                            
                            <div className="card-footer bg-transparent"><li className="list-group-item atributo_lista">Cantidad total de elementos : <span>{numElement()}</span></li></div>
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

                        { tipoArticulo() &&  

                            <div className="card tarjeta_img_Oper">
                                <div className="card-header bg-transparent text-primary">Listado Herramientas</div>
                                <ListarElementosOperaciones tipoElemento={tipoArticulo()} herramientas={data_infoOperacion.herramienta} />                                                                 
                            </div>                        
                        }

                        { !tipoArticulo() &&  

                            <div className="card tarjeta_img_Oper">
                                <div className="card-header bg-transparent text-primary">Listado Kits</div>
                                <ListarElementosOperaciones tipoElemento={tipoArticulo()} kit={data_infoOperacion.kit} />                                                                 
                            </div>                        
                        }
                        
                    </div>

                </div>

            </Modal>
                                    
        </>
    );
}

export const InfoOperacionLoader = async ({params}) => {       
    
    const token = localStorage.getItem('token'); 
    
    const detailoper = await fetch(`http://localhost:8081/api/operaciones/${params.operId}`,{
        method:'GET',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
    });                      

    if (!detailoper.ok) {
        throw Error('No se pudo cargar la operación indicada')
      }
    
      return detailoper.json()
}
