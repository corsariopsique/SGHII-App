import './PazYSalvo.css';
import { generatePDF, TraerImagenes } from '../../IndexComponents';
import * as Icons from '../../Iconos/IndexIcons';
import { Navigate, useLoaderData, useNavigate, useParams, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { useState } from 'react';

const PazYsalvo = () => {

    const dataWorker = useLoaderData();
    const navigate = useNavigate();
    const idWorker = useParams().workerId;
    const enlaceCancelar = `/operarios/${idWorker}`;
    const [rndrmodal, setRndrModal] = useState(true);
    const [rndCert, setRndCert] = useState(false);

    const handlerButton = () => {
        generatePDF('card_Certificate',`PYS_Worker_${idWorker}`,'landscape');
        setRndrModal(false);
    }

    const worker_Estado = (estado) => {
        if(!estado){
            return 'Activo'
        }else{
            return 'Dado de baja'
        }
    };
    
    const CertificadoPYS = () => {

        return (
            <div className="card modal-root checkedWorker" id='card_Certificate'>
                <div className="row g-0">
                    <div className="col-5 col-sm-4">
                    <TraerImagenes tipo='2' ancho='200px' alto='200px' imageId={idWorker} />
                    </div>
                    <div className="col-7 col-sm-8">
                        <div className="card-body">
                            <h5 className="card-title badge bg-success text-wrap fs-3">Paz y Salvo a nombre de: {dataWorker.dataWorker.nombre}</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item atributo_lista text-secondary">Cédula: <span className='valor_atributo'>{dataWorker.dataWorker.id}</span></li>                                    
                                <li className="list-group-item atributo_lista text-secondary">Rol: <span className='valor_atributo'>{dataWorker.dataWorker.rol}</span></li>
                                <li className="list-group-item atributo_lista text-secondary">Telefono: <span className='valor_atributo'>{dataWorker.dataWorker.telefono}</span></li>
                                <li className="list-group-item atributo_lista text-secondary">Email: <span className='valor_atributo'>{dataWorker.dataWorker.email}</span></li>
                                <li className="list-group-item atributo_lista text-secondary">Estado: <span className='valor_atributo'>{worker_Estado(dataWorker.dataWorker.estado)}</span></li>
                                <li className="list-group-item atributo_lista text-secondary">Fecha de Ingreso: <span className='valor_atributo'>{dataWorker.dataWorker.fecha_in}</span></li>
                                <li className="list-group-item atributo_lista text-secondary">Fecha de Baja: <span className='valor_atributo'>{dataWorker.dataWorker.fecha_out}</span></li>
                            </ul>
                            <button className='btn btn-outline-success ok_Btn' onClick={handlerButton}>OK</button>
                        </div>
                    </div>
                </div>
            </div>            

        );
    }

    const HandleronClickPazYSalvo = () => {

        if(dataWorker.pendientesWorker.herramientas.length === 0 && dataWorker.pendientesWorker.kits.length === 0){

            setRndCert(true);            

        }else{
            alert(`El operario con el ID: ${idWorker} tiene operaciones pendientes. No puede ser generado el paz y salvo.`);
            navigate(enlaceCancelar);
        }        
    }; 
    
    const Backdrop = () => {
        return <div className="backdrop-root" />;
    };

    const ModalPazYSalvo = () => {

        return (
            
            <div className="card text-white bg-success modal-root checkedWorker">
                <div className="card-header">Paz Y Salvo Operario</div>
                <div className="card-body verificacionWorker">                    
                    <p className="card-text text-start">¿Esta usted segur@ de generar este Paz Y Salvo?</p>
                    <div className="btn-group" role="group" aria-label="Large button group">

                        <button  
                            type="button" 
                            className="btn botonWorker btn-success"                                                                                             
                            onClick={HandleronClickPazYSalvo}        
                        >                
                            <Icons.DownloadIcono id="icobtn"/>Descargar              
                    
                        </button> 

                        <Link to={enlaceCancelar}>
                            <button  
                                type="button" 
                                className="btn boton btn-secondary"                                                                                   
                            >                
                                <Icons.CancelIcono id="icobtn"/>Cancelar              
                        
                            </button>            
                        </Link>
                    </div>
                </div>
            </div>        
        );
    }

    return(        

        <>            

            {!rndrmodal && (<Navigate to="/operarios" replace={true} />)}

            {rndrmodal && ReactDOM.createPortal(
                <Backdrop />,
                document.getElementById('backdrop-root')
            )} 

            {rndrmodal && !rndCert && ReactDOM.createPortal(
                <ModalPazYSalvo />,
                document.getElementById('overlay-root')
            )}

            {rndrmodal && rndCert && ReactDOM.createPortal(
                <CertificadoPYS />,
                document.getElementById('overlay-root')
            )}

        </>
    );
}
export default PazYsalvo;

export const PazYSalvoLoader = async ({params}) => { 
    
    const token = localStorage.getItem('token');  
    const webServiceUrl = localStorage.getItem('webServiceUrl');  
    
    const operacionesPendientesTrabajador = await fetch(`${webServiceUrl}operarios/${params.workerId}/prestamo`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`},
    })    
    
    const trabajador = await fetch(`${webServiceUrl}operarios/${params.workerId}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`},
    })

    if (!operacionesPendientesTrabajador.ok) {
        throw Error('No se pudo cargar las operaciones pendientes del operador indicado')
    }   

    if (!trabajador.ok) {
        throw Error('No se pudo cargar el operador indicado')
    }

    const dataWorker = await trabajador.json();
    const pendientesWorker = await operacionesPendientesTrabajador.json();
    
    const totalData = {dataWorker, pendientesWorker};    
    
    return totalData;    
}