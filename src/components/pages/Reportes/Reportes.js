import './Reportes.css';
import { Modal, Graficos } from '../../IndexComponents';
import { useLoaderData, Link, Outlet } from 'react-router-dom';

const Reportes = () => {
    const data_Reporte = useLoaderData();   

    return(
        <>
            <Modal
            title="Reportes"
            estiloModal="modal_completo"
            botoncss="btn_ModalIntermedio"            
            >
                <div className="dropdown dropdown_Reportes">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuOpciones" data-bs-toggle="dropdown" aria-expanded="false">
                        Opciones
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuOpciones">
                        <li><Link className="dropdown-item" to="/reportes/herramientas">Herramienta</Link></li>                        
                        <li><Link className="dropdown-item" to="/reportes/kits">Kits</Link></li>
                        <li><Link className="dropdown-item" to="/reportes/operarios">Operarios</Link></li>
                    </ul>
                </div>                

                <div className="card grafico1">
                    <div className="card-body">
                        <h5 className="card-title">Disponibilidad items por herramienta</h5>                        
                        <Graficos
                        type = 'bar'            
                        data = {data_Reporte.freeItems}
                        id = 'grafico1R' />                        
                    </div>
                </div>    

                <div className="card grafico4R">
                    <div className="card-body">
                        <h5 className="card-title">Herramientas por categorias</h5>                        
                        <Graficos
                        type = 'bar'            
                        data = {data_Reporte.catTools}
                        id = 'grafico1R'/>
                    </div>
                </div>    

                <div className="card grafico3R">
                    <div className="card-body">
                        <h5 className="card-title">Herramientas por roles</h5>                        
                        <Graficos
                        type = 'pie'            
                        data = {data_Reporte.roleTools}
                        id = 'grafico1R' 
                        position = 'left' />                        
                    </div>
                </div>   

                 <div className="card grafico2R">
                    <div className="card-body">
                        <h5 className="card-title">Items de baja por herramienta</h5>                        
                        <Graficos
                        type = 'bar'            
                        data = {data_Reporte.toolBajas}
                        id = 'grafico1R' />
                    </div>
                </div>                            

            </Modal>

            <Outlet />
        </>
    );

}
export default Reportes;

export const reportesLoader = async () => { 
    
    const token = localStorage.getItem('token');

    const dataItemsFree = await fetch(`http://localhost:8081/api/data/disponiblesByTool`,{
        method:'GET',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
    });   

    const dataToolsByCat = await fetch(`http://localhost:8081/api/data/toolsByCat`,{
        method:'GET',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
    });   

    const dataToolsByRole = await fetch(`http://localhost:8081/api/data/toolsByRole`,{
        method:'GET',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
    });
    
    const dataBajasByTool = await fetch(`http://localhost:8081/api/data/bajasByTool`,{
        method:'GET',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
    }); 
    
    const freeItems = await dataItemsFree.json();

    if (!dataItemsFree.ok) {
        throw Error('No se pudo cargar la data indicada')
    }

    const catTools = await dataToolsByCat.json();

    if (!dataToolsByCat.ok) {
        throw Error('No se pudo cargar la data indicada')
    }

    const roleTools = await dataToolsByRole.json();

    if (!dataToolsByCat.ok) {
        throw Error('No se pudo cargar la data indicada')
    }

    const toolBajas = await dataBajasByTool.json();

    if (!dataBajasByTool.ok) {
        throw Error('No se pudo cargar la data indicada')
    }
    
    const totalData = {freeItems,catTools,roleTools,toolBajas};
    
    return totalData;
}