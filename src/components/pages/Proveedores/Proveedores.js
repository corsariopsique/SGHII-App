import './Proveedores.css';
import { PanelInfoText, Modal, Tablas } from '../../IndexComponents';
import {useLoaderData} from 'react-router-dom';

export default function Proveedores(){   
    
    const data_Proveedores = useLoaderData();
   
    const btnsProveedores = [
        {
            btnname:"Agregar Proveedor",
            icobtn:"ProveedorIcono",
            estiloBoton:"btn-outline-primary",
            tipo:"button",    
            accion:"/proveedores/agregarproveedor"                                              
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
            cantidad: `${data_Proveedores.herramientasResumen.piezasActivas}`,
            periodo: '--',
            estiloItemInfo: "text-success"
        },

        {
            titulo: "Operaciones Herramientas",
            cantidad: `${data_Proveedores.operacionesResumen.operL30dTools}`,
            periodo: 30,
            estiloItemInfo: "text-primary"
        },

        {
            titulo: "Herramientas Disponibles",
            cantidad: `${data_Proveedores.herramientasResumen.piezasDisponibles}`,
            periodo: '--',
            estiloItemInfo: "text-success"
        },

        {
            titulo: "Herramientas en Prestamo",
            cantidad: `${data_Proveedores.herramientasResumen.piezasPrestamo}`,
            periodo: '--',
            estiloItemInfo: "text-primary"
        },

        {
            titulo: "Herramientas Escasas ",
            cantidad: `${data_Proveedores.herramientasResumen.herramientaEscasa.length}`,
            periodo: '--',
            estiloItemInfo: "text-danger"
        },

        {
            titulo: "Ultimos Ingresos",
            cantidad: `${data_Proveedores.herramientasResumen.ingresosL30d.length}`,
            periodo: 30,
            estiloItemInfo: "text-success"
        }

    ];          

    const col_data = [
        { key: 'id', title: 'ID Proveedor' },        
        { key: 'nombre', title: 'Nombre Proveedor' },        
        { key: 'telefono', title: 'Telefono' },        
        { key: 'ciudad', title: 'Ciudad' },        
        { key: 'fecha_in', title: 'Fecha de ingreso'}        
    ];        

    return(

        <>

            <PanelInfoText
             title ="Resumen Herramientas" 
             estiloPanelInfoText ="panelinv" 
             info={datos}
            />

            <Modal 
            title='Proveedores'
            estiloModal="modal_intermedio"
            botoncss="btn_ModalIntermedio"
            botones={btnsProveedores}
            >                         
                <Tablas  
                    listado='proveedores'                  
                    estiloTabla='tabla_Inventario'
                    columns={col_data} 
                    data={data_Proveedores.listaProveedores}
                />   

            </Modal>                       

        </>            
    );
}


export const proveedoresLoader = async () => {

    const token = localStorage.getItem('token'); 
    
    const proveedoresLista = await fetch('http://localhost:8081/api/proveedores',{
        method:'GET',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
    });     
    
    const resumenHerramientas = await fetch('http://localhost:8081/api/herramientas/resumen',{
        method: 'GET',
        headers: {'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`}
    });

    const resumenOperaciones = await fetch('http://localhost:8081/api/operaciones/resumen',{
        method: 'GET',
        headers: {'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`}
    });

    if (!resumenHerramientas.ok) {
        throw Error('No se pudo cargar el resumen de herramientas')
    }

    if (!resumenOperaciones.ok) {
        throw Error('No se pudo cargar el resumen de operaciones')
    }

    if (!proveedoresLista.ok) {
        throw Error('No se pudo cargar el listado de proveedores')
    }   
    
    const herramientasResumen = await resumenHerramientas.json();
    const operacionesResumen = await resumenOperaciones.json();
    const listaProveedores = await proveedoresLista.json();

    const totalData = {listaProveedores,herramientasResumen,operacionesResumen}
    
    return totalData;
};
