import './Operarios.css';
import { PanelInfoText, Modal } from '../../IndexComponents';
import {useLoaderData} from 'react-router-dom';
import ListarOperarios from './ListarOperarios';

export default function Operarios(){   
    
    const data_Operarios = useLoaderData()        

    const btnsOperarios = [
        {
            btnname:"Agregar Operario",
            icobtn:"Oper2PanelIcono",
            estiloBoton:"btn-outline-primary",
            tipo:"button",    
            accion:"/operarios/agregaroperario"                                              
        },

        {
            btnname:"Filtros",
            icobtn:"FiltrosIcono",
            estiloBoton:"btn-outline-primary",
            tipo:"button",   
            accion:"null"         
        }
      ];

      const datos = [      

        {
            titulo: "Total Operarios Registrados",
            cantidad: `${data_Operarios.operariosResumen.operariosReg}`,
            periodo: '∞',
            estiloItemInfo: "text-success"
        },

        {
            titulo: "Operarios Activos",
            cantidad: `${data_Operarios.operariosResumen.operariosActivos}`,
            periodo: '--',
            estiloItemInfo: "text-primary"
        },

        {
            titulo: "Operarios Inactivos ",
            cantidad: `${data_Operarios.operariosResumen.operariosDeBaja}`,
            periodo: '--',
            estiloItemInfo: "text-secondary"
        },

        {
            titulo: "Roles de Operarios",
            cantidad: `${data_Operarios.operariosResumen.operariosRoles}`,
            periodo: '∞',
            estiloItemInfo: "text-info"
        }
               
    ];          

    return(

        <>

            <PanelInfoText
             title ="Resumen Operarios" 
             estiloPanelInfoText ="panelinv" 
             info={datos}
            />

            <Modal 
            title='Operarios'
            estiloModal="modal_intermedio"
            botoncss="btn_ModalIntermedio"
            botones={btnsOperarios}
            >                         
               <ListarOperarios operarios={data_Operarios.trabajadores} />

            </Modal>                      

        </>            
    );
}


export const operariosLoader = async () => {

    const token = localStorage.getItem('token');
    const webServiceUrl = localStorage.getItem('webServiceUrl');  
    
    const workers = await fetch(`${webServiceUrl}operarios`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`},
    });  

    const resumenOperarios = await fetch(`${webServiceUrl}operarios/resumen`,{
        method: 'GET',
        headers: {'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`}
    });    

    if (!resumenOperarios.ok) {
        throw Error('No se pudo cargar el resumen de operarios')
    }    

    if (!workers.ok) {
        throw Error('No se pudo cargar el listado de operarios')
    }
    
    const operariosResumen = await resumenOperarios.json();
    const trabajadores = await workers.json();

    const totalData = {operariosResumen,trabajadores};
    
    return totalData;
};

