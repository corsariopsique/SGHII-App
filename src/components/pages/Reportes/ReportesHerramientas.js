import './ReportesHerramientas.css';
import { Modal, Graficos } from '../../IndexComponents';
import { useLoaderData, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ReportesHerramientas = () => {

    const data_Tool_Reporte = useLoaderData();
    const [dataH, setDataH] = useState(null);
    const [dataI, setDataI] = useState(null);    
    const [idtool, setIdtool] = useState(null);
    const [toolName, setToolName] = useState(null);    

    useEffect(() => {

        if(idtool!==null){

            const FetchData = async () => {

                const token = localStorage.getItem('token');
                
                const dataTool = await fetch(`http://localhost:8081/api/data/radarTool/${idtool}`,{
                    method:'GET',
                    headers: {'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`}
                }); 
    
                const dataToolItems = await fetch(`http://localhost:8081/api/data/indicesTool/${idtool}`,{
                    method:'GET',
                    headers: {'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`}
                });                
    
                if (!dataTool.ok) {
                    throw Error('No se pudo cargar la data radar indicada')
                }
    
                if (!dataToolItems.ok) {
                    throw Error('No se pudo cargar la data barras indicada')
                }               
    
                const toolData = await dataTool.json();
                const itemsToolData = await dataToolItems.json();                
                
                setDataH(toolData);                
                setDataI(itemsToolData);                
            }
    
            FetchData();   

        }
        
    },[idtool]);   
    

    const HandlerClickTool = (id,nombre) => {
        setIdtool(id);      
        setToolName(nombre);
    }

    return(
        <>
            <Modal
            title="Reportes Herramientas"
            estiloModal="modal_completo"
            botoncss="btn_ModalIntermedio"            
            >
                <div className="dropdown dropdown_Reportes_Herramientas">
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

                <div className="dropdown dropdown_ReportesHerramienta">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuHerramientas" data-bs-toggle="dropdown" aria-expanded="false">
                        Herramientas
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuHerramientas">
                        {data_Tool_Reporte.listaTools.map((item) => (                                                               
                            <li className="dropdown-item" onClick={() => HandlerClickTool(item.id,item.nombre)}>{item.nombre}</li>
                        ))}                        
                    </ul>
                </div> 


                {dataH &&                

                    <>

                        <div className='tituloTool'>
                            <p className='text-wrap badge bg-primary'>ID: <span className='contenidoHerramienta'>{idtool}</span></p>
                            <p className='text-wrap badge bg-primary'>Nombre: <span className='contenidoHerramienta'>{toolName}</span></p>
                            <p className='text-wrap badge bg-primary'>IDA: <span className='contenidoHerramienta'>{dataH.IDA}</span></p>
                        </div>

                        <div className="card grafico1RH">
                            <div className="card-body">
                                <h5 className="card-title">IDA por items</h5>    
                                <h6 className="card-subtitle mb-2 text-muted">Indicador de Desgaste Acumulado</h6>                    
                                <Graficos
                                type = 'bar'            
                                data = {dataI}
                                id = 'grafico3R' />                        
                            </div>
                        </div>

                        <div className="card grafico2RH">
                            <div className="card-body">
                                <h5 className="card-title">IDA (Totalizado) {toolName}</h5>    
                                <h6 className="card-subtitle mb-2 text-muted">Indicador de Desgaste Acumulado</h6>                    
                                <Graficos
                                type = 'radar'            
                                data = {dataH}
                                id = 'grafico3R' />                        
                            </div>
                        </div>

                    </>
                }

                {!dataH &&
                    <>

                        <div className='tituloTool'>
                            <p className='text-wrap badge bg-primary'>Herramientas Activas: <span className='contenidoHerramienta'>{data_Tool_Reporte.herramientasResumen.herramientasActivas}</span></p>
                            <p className='text-wrap badge bg-primary'>Herramientas Inactivas: <span className='contenidoHerramienta'>{data_Tool_Reporte.herramientasResumen.herramientasDeBaja}</span></p>
                            <p className='text-wrap badge bg-primary'>Piezas Disponibles: <span className='contenidoHerramienta'>{data_Tool_Reporte.herramientasResumen.piezasDisponibles}</span></p>
                            <p className='text-wrap badge bg-primary'>Piezas en kits: <span className='contenidoHerramienta'>{data_Tool_Reporte.herramientasResumen.piezasKits}</span></p>
                        </div>

                        <div className="card grafico1RH">
                            <div className="card-body">
                                <h5 className="card-title">Frecuencia de uso (Prestamos)</h5>                                    
                                <Graficos
                                type = 'bar'            
                                data = {data_Tool_Reporte.FreqTools}
                                id = 'grafico1RH' />                        
                            </div>
                        </div>

                        <div className="card grafico2RH">
                            <div className="card-body">
                                <h5 className="card-title">IDA Herramientas (Totalizado) {toolName}</h5>    
                                <h6 className="card-subtitle mb-2 text-muted">Indicador de Desgaste Acumulado</h6>                    
                                <Graficos
                                type = 'bar'            
                                data = {data_Tool_Reporte.IndexWasted}
                                id = 'grafico1R' />                        
                            </div>
                        </div>

                    </>
                
                }

            </Modal>

        </>
    );

}
export default ReportesHerramientas;

export const reportesHerramientasLoader = async () => { 
    
    const token = localStorage.getItem('token');

    const itms = await fetch('http://localhost:8081/api/herramientas',{
        method: 'GET',
        headers: {'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`}
    });

    const resumenHerramientas = await fetch('http://localhost:8081/api/herramientas/resumen',{
        method: 'GET',
        headers: {'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`}
    });      
    
    const dataFreqTools = await fetch(`http://localhost:8081/api/data/freqtools`,{
        method:'GET',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
    });  

    const dataIndexWasted = await fetch(`http://localhost:8081/api/data/indicesAllTools`,{
        method:'GET',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
    });  

    const FreqTools = await dataFreqTools.json();

    if (!dataFreqTools.ok) {
        throw Error('No se pudo cargar la data indicada')
    }

    const IndexWasted = await dataIndexWasted.json();

    if (!dataIndexWasted.ok) {
        throw Error('No se pudo cargar la data indicada')
    }   

    if (!itms.ok) {
        throw Error('No se pudo cargar el listado de herramientas')
    }

    if (!resumenHerramientas.ok) {
        throw Error('No se pudo cargar el resumen de herramientas')
    }   

    const listaTools = await itms.json();
    const herramientasResumen = await resumenHerramientas.json();    

    const totalData = {listaTools,herramientasResumen,FreqTools,IndexWasted};      
    
    return totalData;
}
