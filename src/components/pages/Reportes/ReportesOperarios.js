import './ReportesOperarios.css';
import { Modal, Graficos } from '../../IndexComponents';
import { useLoaderData, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ReportesOperarios = () => {

    const data_Worker_Reporte = useLoaderData();
    const [dataT, setDataT] = useState(null);
    const [dataK, setDataK] = useState(null);    
    const [idWorker, setIdWorker] = useState(null);
    const [workerName, setWorkerName] = useState(null);    

    useEffect(() => {

        if(idWorker!==null){

            const FetchData = async () => {

                const token = localStorage.getItem('token');
                const webServiceUrl = localStorage.getItem('webServiceUrl');
                
                const dataWorkerTool = await fetch(`${webServiceUrl}data/prestamosToolWorker/${idWorker}`,{
                    method:'GET',
                    headers: {'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`}
                }); 
    
                const dataWorkerKit = await fetch(`${webServiceUrl}data/prestamosKitWorker/${idWorker}`,{
                    method:'GET',
                    headers: {'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`}
                });                
    
                if (!dataWorkerTool.ok) {
                    throw Error('No se pudo cargar la data radar indicada')
                }
    
                if (!dataWorkerKit.ok) {
                    throw Error('No se pudo cargar la data barras indicada')
                }               
    
                const toolWorker = await dataWorkerTool.json();
                const kitWorker = await dataWorkerKit.json();                
                
                setDataT(toolWorker);                
                setDataK(kitWorker);                
            }
    
            FetchData();   

        }
        
    },[idWorker]);   
    

    const HandlerClickWorker = (id,nombre) => {
        setIdWorker(id);      
        setWorkerName(nombre);
    }

    return(
        <>
            <Modal
            title="Reportes Operarios"
            estiloModal="modal_completo"
            botoncss="btn_ModalIntermedio"            
            >
                 <div className="dropdown dropdown_Reportes_Operarios">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuOpciones" data-bs-toggle="dropdown" aria-expanded="false">
                        Opciones
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuOpciones">
                        <li><Link className="dropdown-item" to="/reportes">Reportes</Link></li>
                        <li><Link className="dropdown-item" to="/reportes/herramientas">Herramienta</Link></li>                        
                        <li><Link className="dropdown-item" to="/reportes/kits">Kits</Link></li>
                        <li><Link className="dropdown-item" to="/reportes/operarios">Operarios</Link></li>
                    </ul>
                </div>       

                <div className="dropdown dropdown_ReportesOperarios">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuOperarios" data-bs-toggle="dropdown" aria-expanded="false">
                        Operarios
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuOperarios">
                        {data_Worker_Reporte.listaWorkers.map((item) => (                                                               
                            <li className="dropdown-item" onClick={() => HandlerClickWorker(item.id,item.nombre)}>{item.nombre}</li>
                        ))}                        
                    </ul>
                </div> 


                {dataT &&                

                    <>

                        <div className='tituloTool'>
                            <p className='text-wrap badge bg-primary'>ID: <span className='contenidoHerramienta'>{idWorker}</span></p>
                            <p className='text-wrap badge bg-primary'>Nombre: <span className='contenidoHerramienta'>{workerName}</span></p>                            
                        </div>

                        <div className="card grafico1RH">
                            <div className="card-body">
                                <h5 className="card-title">Prestamos operario: {workerName}</h5>    
                                <h6 className="card-subtitle mb-2 text-muted">Herramientas</h6>                    
                                <Graficos
                                type = 'bar'            
                                data = {dataT}
                                id = 'grafico3R' />                        
                            </div>
                        </div>

                        <div className="card grafico2RH">
                            <div className="card-body">
                                <h5 className="card-title">Prestamos operario: {workerName}</h5>    
                                <h6 className="card-subtitle mb-2 text-muted">Kits</h6>                    
                                <Graficos
                                type = 'bar'            
                                data = {dataK}
                                id = 'grafico3R' />                        
                            </div>
                        </div>

                    </>
                }

                {!dataT &&
                    <>

                        <div className='tituloTool'>
                            <p className='text-wrap badge bg-primary'>Operarios Activos: <span className='contenidoHerramienta'>{data_Worker_Reporte.resumenWorkers.operariosActivos}</span></p>
                            <p className='text-wrap badge bg-primary'>Operarios Inactivos: <span className='contenidoHerramienta'>{data_Worker_Reporte.resumenWorkers.operariosDeBaja}</span></p>
                            <p className='text-wrap badge bg-primary'>Roles operarios: <span className='contenidoHerramienta'>{data_Worker_Reporte.resumenWorkers.operariosRoles}</span></p>                            
                        </div>

                        <div className="card grafico1RO">
                            <div className="card-body">
                                <h5 className="card-title">Operaciones por operario </h5>                                    
                                <Graficos
                                type = 'bar'            
                                data = {data_Worker_Reporte.operByWorker}
                                id = 'grafico1RH' />                        
                            </div>
                        </div>    

                        <div className="card grafico2RO">
                            <div className="card-body">
                                <h5 className="card-title">Operarios por rol</h5>                                    
                                <Graficos
                                type = 'bar'            
                                data = {data_Worker_Reporte.operariosPorRol}
                                id = 'grafico1RH' />                        
                            </div>
                        </div>                       

                    </>
                
                }                

            </Modal>

        </>
    );

}
export default ReportesOperarios;

export const reportesOperariosLoader = async () => { 
    
    const token = localStorage.getItem('token');
    const webServiceUrl = localStorage.getItem('webServiceUrl');

    const dataWorkers = await fetch(`${webServiceUrl}operarios`,{
        method:'GET',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
    }); 
  
    const dataPrestamosWorker = await fetch(`${webServiceUrl}data/prestamosWorkerTotales`,{
        method:'GET',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
    });  

    const dataResumenWorkers = await fetch(`${webServiceUrl}operarios/resumen`,{
        method:'GET',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
    }); 

    const workersByRole = await fetch(`${webServiceUrl}data/workersByRole`,{
        method:'GET',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
    }); 

    if (!workersByRole.ok) {
        throw Error('No se pudo cargar la data indicada')
    }

    if (!dataPrestamosWorker.ok) {
        throw Error('No se pudo cargar la data indicada')
    }

    if (!dataWorkers.ok) {
        throw Error('No se pudo cargar la data indicada')
    }

    if (!dataResumenWorkers.ok) {
        throw Error('No se pudo cargar la data indicada')
    }

    const operByWorker = await dataPrestamosWorker.json();

    const operariosPorRol = await workersByRole.json();

    const resumenWorkers = await dataResumenWorkers.json();

    const listaWorkers = await dataWorkers.json();

    const totalData = {operByWorker, listaWorkers, resumenWorkers, operariosPorRol};      
    
    return totalData;
}
