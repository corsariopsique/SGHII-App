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
            titulo: "Kits",
            cantidad: 14,
            periodo: 7,
            estiloItemInfo: "total_Kits"
        },

        {
            titulo: "Herramientas Total",
            cantidad: 622,
            periodo: 7,
            estiloItemInfo: "total_Tools"
        },

        {
            titulo: "Top Salidas",
            cantidad: 5,
            periodo: 7,
            estiloItemInfo: "total_Out"
        },

        {
            titulo: "Inventarios Bajos",
            cantidad: 7,
            periodo: 7,
            estiloItemInfo: "bajos_Inven"
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
             title ="Inventario General" 
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
                    data={data_Proveedores}
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

    if (!proveedoresLista.ok) {
        throw Error('No se pudo cargar el listado de proveedores')
    }     
    
    return await proveedoresLista.json();
};
