import './Operaciones.css';
import { PanelInfoText, Modal, Tablas } from '../../IndexComponents';
import {useLoaderData} from 'react-router-dom';

export default function Operaciones(){   
    
    const data_Operaciones = useLoaderData();    
    const lista_Operaciones = [];

    function textTipo (tipo) {
        if(tipo === 1){
            return 'Prestamo';
        }

        if(tipo === 2){
            return 'Devolución';
        }            
    };

    const tipoArticulo = (herramientas) => {
        if(herramientas.length>0){
            return "Herramientas";            
        }else{
            return "Kits";            
        }
    }   

    data_Operaciones.listaOperaciones.map((item) => {
                
        const oper = {
            id : item.id,  
            id_worker: item.operario.id,
            nombre: item.operario.nombre,          
            tipo : textTipo(item.tipo),
            tipo_articulo: tipoArticulo(item.herramienta),
            fecha_operacion : item.fecha_operacion
        }
        lista_Operaciones.push(oper);
    });    

    const btnsOperaciones = [
        {
            btnname:"Agregar Operación",
            icobtn:"Tool1Icono",
            estiloBoton:"btn-outline-primary",
            tipo:"button",    
            accion:"/operaciones/agregaroperacion"                                              
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
            titulo: "Total Operaciones",
            cantidad: `${data_Operaciones.operacionesResumen.totalOperaciones}`,
            periodo: '∞',
            estiloItemInfo: "text-success"
        },

        {
            titulo: "Operaciones de Prestamo",
            cantidad: `${data_Operaciones.operacionesResumen.prestamos}`,
            periodo: '∞',
            estiloItemInfo: "text-primary"
        },

        {
            titulo: "Operaciones de Devolución",
            cantidad: `${data_Operaciones.operacionesResumen.devoluciones}`,
            periodo: '∞',
            estiloItemInfo: "text-primary"
        },

        {
            titulo: "Operaciones de Herramientas",
            cantidad: `${data_Operaciones.operacionesResumen.operL30dTools}`,
            periodo: 30,
            estiloItemInfo: "text-secondary"
        },

        {
            titulo: "Operaciones de Kits ",
            cantidad: `${data_Operaciones.operacionesResumen.operL30dKits}`,
            periodo: 30,
            estiloItemInfo: "text-secondary"
        },

        {
            titulo: "Promedio Operaciones por Operario",
            cantidad: `${data_Operaciones.operacionesResumen.promedioOperWorker.toFixed(2)}`,
            periodo:'∞',
            estiloItemInfo: "text-info"
        }

    ];          

    const col_data = [
        { key: 'id', title: 'ID Operación' },
        { key: 'id_worker', title: 'ID Operario' },                
        { key: 'nombre', title: 'Nombre Operario' },        
        { key: 'tipo', title: 'Tipo' },        
        { key: 'tipo_articulo', title: 'Articulo' },        
        { key: 'fecha_operacion', title: 'Fecha de operación'}        
    ];        

    return(

        <>

            <PanelInfoText
             title ="Resumen Operaciones" 
             estiloPanelInfoText ="panelinv" 
             info={datos}
            />

            <Modal 
            title='Operaciones'
            estiloModal="modal_intermedio"
            botoncss="btn_ModalIntermedio"
            botones={btnsOperaciones}
            >                         
                <Tablas  
                    listado='operaciones'                  
                    estiloTabla='tabla_Inventario'
                    columns={col_data} 
                    data={lista_Operaciones}
                />   

            </Modal>                       

        </>            
    );
}


export const operacionesLoader = async () => {

    const token = localStorage.getItem('token'); 
    const webServiceUrl = localStorage.getItem('webServiceUrl'); 
    
    const operacionesLista = await fetch(`${webServiceUrl}operaciones`,{
        method:'GET',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
    });    
    
    const resumenOperaciones = await fetch(`${webServiceUrl}operaciones/resumen`,{
        method: 'GET',
        headers: {'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`}
    });

    if (!resumenOperaciones.ok) {
        throw Error('No se pudo cargar el resumen de operaciones')
    }

    if (!operacionesLista.ok) {
        throw Error('No se pudo cargar el listado de operaciones')
    } 

    const operacionesResumen = await resumenOperaciones.json();

    const listaOperaciones = await operacionesLista.json();    
    
    const totalData = { operacionesResumen,listaOperaciones};
    
    return totalData;
};
