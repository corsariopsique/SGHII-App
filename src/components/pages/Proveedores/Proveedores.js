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
            titulo: "Herramientas registradas",
            cantidad: `${data_Proveedores.herramientasResumen.herramientasReg}`,
            periodo: '--',
            estiloItemInfo: "text-secondary"
        },   
        
        {
            titulo: "Herramientas activas ",
            cantidad: `${data_Proveedores.herramientasResumen.herramientasActivas}`,
            periodo: '--',
            estiloItemInfo: "text-success"
        },

        {
            titulo: "Herramientas Inactivas",
            cantidad: `${data_Proveedores.herramientasResumen.herramientasDeBaja}`,
            periodo: '--',
            estiloItemInfo: "text-danger"
        },

        {
            titulo: "Items en Prestamo",
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
    const webServiceUrl = localStorage.getItem('webServiceUrl');
    
    const proveedoresLista = await fetch(`${webServiceUrl}proveedores`,{
        method:'GET',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
    });     
    
    const resumenHerramientas = await fetch(`${webServiceUrl}herramientas/resumen`,{
        method: 'GET',
        headers: {'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`}
    });
   

    if (!resumenHerramientas.ok) {
        throw Error('No se pudo cargar el resumen de herramientas')
    }    

    if (!proveedoresLista.ok) {
        throw Error('No se pudo cargar el listado de proveedores')
    }   
    
    const herramientasResumen = await resumenHerramientas.json();    
    const listaProveedores = await proveedoresLista.json();

    const totalData = {listaProveedores,herramientasResumen}
    
    return totalData;
};
