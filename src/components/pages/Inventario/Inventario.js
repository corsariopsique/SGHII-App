import './Inventario.css';
import { PanelInfoText, Modal } from '../../IndexComponents';
import {useLoaderData} from 'react-router-dom';
import ListarHerramientas from './ListarHerramientas';

export default function Inventario(){   
    
    const data_inventario = useLoaderData()        

    const btnsInventario = [
        {
            btnname:"Agregar Herramienta",
            icobtn:"Tool1Icono",
            estiloBoton:"btn-outline-primary",
            tipo:"button",    
            accion:"/inventario/agregarherramienta"                                              
        },

        {
            btnname:"Filtros",
            icobtn:"FiltrosIcono",
            estiloBoton:"btn-outline-primary",
            tipo:"button",   
            accion:"null"         
        },

        {
            btnname:"Descargar",
            icobtn:"DownloadIcono",
            estiloBoton:"btn-outline-primary",
            tipo:"button",            
            accion:"null"
        }
      ];

      const datos = [      

        {
            titulo: "Herramientas Activas",
            cantidad: `${data_inventario.herramientasResumen.piezasActivas}`,
            periodo: '--',
            estiloItemInfo: "text-success"
        },       

        {
            titulo: "Herramientas Disponibles",
            cantidad: `${data_inventario.herramientasResumen.piezasDisponibles}`,
            periodo: '--',
            estiloItemInfo: "text-success"
        },

        {
            titulo: "Herramientas en Prestamo",
            cantidad: `${data_inventario.herramientasResumen.piezasPrestamo}`,
            periodo: '--',
            estiloItemInfo: "text-primary"
        },

        {
            titulo: "Herramientas Escasas ",
            cantidad: `${data_inventario.herramientasResumen.herramientaEscasa.length}`,
            periodo: '--',
            estiloItemInfo: "text-danger"
        },

        {
            titulo: "Ultimos Ingresos",
            cantidad: `${data_inventario.herramientasResumen.ingresosL30d.length}`,
            periodo: 30,
            estiloItemInfo: "text-success"
        }

    ];          

    return(

        <>

            <PanelInfoText
             title ="Resumen Herramientas" 
             estiloPanelInfoText ="panelinv" 
             info={datos}
            />

            <Modal 
            title='Herramientas'
            estiloModal="modal_intermedio"
            botoncss="btn_ModalIntermedio"
            botones={btnsInventario}
            >                         
               <ListarHerramientas herramientas={data_inventario.listaTools} />

            </Modal>                      

        </>            
    );
}


export const inventarioLoader = async () => {
    
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

    if (!itms.ok) {
        throw Error('No se pudo cargar el listado de herramientas')
    }

    if (!resumenHerramientas.ok) {
        throw Error('No se pudo cargar el resumen de herramientas')
    }   

    const listaTools = await itms.json();
    const herramientasResumen = await resumenHerramientas.json();    

    const totalData = {listaTools,herramientasResumen}
    
    return totalData;
};

