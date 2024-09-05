import './ReportesKits.css';
import { Modal, Graficos } from '../../IndexComponents';
import { useLoaderData, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ReportesKits = () => {

    const data_Kit_Reporte = useLoaderData();    
    const [dataRK, setDataRK] = useState(null);    
    const [idKit, setIdKit] = useState(null);
    const [kitName, setKitName] = useState(null);    

    useEffect(() => {

        if(idKit!==null){

            const FetchData = async () => {

                const token = localStorage.getItem('token');
                
                const dataRadarKit = await fetch(`http://localhost:8081/api/data/radarKit/${idKit}`,{
                    method:'GET',
                    headers: {'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`}
                });                              
    
                if (!dataRadarKit.ok) {
                    throw Error('No se pudo cargar la data radar indicada')
                }                             
    
                const kitRadarData = await dataRadarKit.json();                
                
                setDataRK(kitRadarData);
            }
    
            FetchData();
        }
        
    },[idKit]);   
    

    const HandlerClickKit = (id,nombre) => {
        setIdKit(id);      
        setKitName(nombre);
    }

    return(
        <>
            <Modal
            title="Reportes Kits"
            estiloModal="modal_completo"
            botoncss="btn_ModalIntermedio"            
            >
                <div className="dropdown dropdown_Reportes_Kits">
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

                <div className="dropdown dropdown_ReportesKits">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuKits" data-bs-toggle="dropdown" aria-expanded="false">
                        Kits
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuKits">
                        {data_Kit_Reporte.listaKits.map((item) => (                                                               
                            <li className="dropdown-item" onClick={() => HandlerClickKit(item.id,item.nombre)}>{item.nombre}</li>
                        ))}                        
                    </ul>
                </div> 


                {dataRK &&                

                    <>

                        <div className='tituloTool'>
                            <p className='text-wrap badge bg-primary'>ID: <span className='contenidoHerramienta'>{idKit}</span></p>
                            <p className='text-wrap badge bg-primary'>Nombre: <span className='contenidoHerramienta'>{kitName}</span></p>
                            <p className='text-wrap badge bg-primary'>IDA: <span className='contenidoHerramienta'>{dataRK.IDA}</span></p>
                        </div>                        

                        <div className="card grafico3RK">
                            <div className="card-body">
                                <h5 className="card-title">IDA (Totalizado) {kitName}</h5>    
                                <h6 className="card-subtitle mb-2 text-muted">Indicador de Desgaste Acumulado</h6>                    
                                <Graficos
                                type = 'radar'            
                                data = {dataRK}
                                id = 'grafico3R' />                        
                            </div>
                        </div>

                    </>
                }

                {!dataRK &&
                    <>

                        <div className='tituloTool'>
                            <p className='text-wrap badge bg-primary'>Kits Activos: <span className='contenidoHerramienta'>{data_Kit_Reporte.kitResumen.kitsActivos}</span></p>
                            <p className='text-wrap badge bg-primary'>Kits Inactivos: <span className='contenidoHerramienta'>{data_Kit_Reporte.kitResumen.kitsDeBaja}</span></p>
                            <p className='text-wrap badge bg-primary'>Kits Disponibles: <span className='contenidoHerramienta'>{data_Kit_Reporte.kitResumen.kitsDisponibles}</span></p>
                            <p className='text-wrap badge bg-primary'>Piezas en kits: <span className='contenidoHerramienta'>{data_Kit_Reporte.kitResumen.totalPiezasKits}</span></p>
                        </div>

                        <div className="card grafico1RK">
                            <div className="card-body">
                                <h5 className="card-title">Frecuencia de uso (Prestamos)</h5>                                    
                                <Graficos
                                type = 'bar'            
                                data = {data_Kit_Reporte.kitsPrestamos}
                                id = 'grafico1RH' />                        
                            </div>
                        </div>

                        <div className="card grafico2RK">
                            <div className="card-body">
                                <h5 className="card-title">IDA Herramientas (Totalizado) {kitName}</h5>    
                                <h6 className="card-subtitle mb-2 text-muted">Indicador de Desgaste Acumulado</h6>                    
                                <Graficos
                                type = 'bar'            
                                data = {data_Kit_Reporte.kitsIndexWasted}
                                id = 'grafico1R' />                        
                            </div>
                        </div>

                    </>
                
                }

            </Modal>

        </>
    );

}
export default ReportesKits;

export const reportesKitsLoader = async () => { 
    
    const token = localStorage.getItem('token');

    const itemsKits = await fetch('http://localhost:8081/api/kits',{
        method: 'GET',
        headers: {'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`}
    });

    const resumenKits = await fetch('http://localhost:8081/api/kits/resumen',{
        method: 'GET',
        headers: {'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`}
    });      
    
    const dataPrestamosKits = await fetch(`http://localhost:8081/api/data/prestamosByKit`,{
        method:'GET',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
    });  

    const dataIndexWastedKits = await fetch(`http://localhost:8081/api/data/indicesKit`,{
        method:'GET',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
    });    

    if (!itemsKits.ok) {
        throw Error('No se pudo cargar la data indicada')
    }    

    if (!resumenKits.ok) {
        throw Error('No se pudo cargar la data indicada')
    }   

    if (!dataPrestamosKits.ok) {
        throw Error('No se pudo cargar la data solicitada')
    }

    if (!dataIndexWastedKits.ok) {
        throw Error('No se pudo cargar la data solicitada')
    }

    const listaKits = await itemsKits.json();    
    const kitResumen = await resumenKits.json();
    const kitsPrestamos = await dataPrestamosKits.json();
    const kitsIndexWasted = await dataIndexWastedKits.json();    

    const totalData = {listaKits,kitResumen,kitsPrestamos,kitsIndexWasted};      
    
    return totalData;
}
