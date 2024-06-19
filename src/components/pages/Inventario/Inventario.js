import './Inventario.css';
import { PanelInfoText, Modal, Tablas } from '../../IndexComponents';
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
        { key: 'id', title: 'ID' },
        { key: 'nombre', title: 'Herramienta' },
        { key: 'marca', title: 'Marca' },
        { key: 'categoria', title: 'Categoria'},
        { key: 'rol', title: 'Rol Herramienta'},
        { key: 'fecha_in', title: 'Fecha Ingreso'},        
    ];        

    return(

        <>

            <PanelInfoText
             title ="Inventario General" 
             estiloPanelInfoText ="panelinv" 
             info={datos}
            />

            <Modal 
            title='Herramientas'
            estiloModal="modal_intermedio"
            botoncss="btn_ModalIntermedio"
            botones={btnsInventario}
            >                         
               <ListarHerramientas herramientas={data_inventario} />

            </Modal>                      

        </>            
    );
}


export const inventarioLoader = async () => {
    
    const itms = await fetch('http://localhost:8081/api/herramientas')   
    

    if (!itms.ok) {
        throw Error('No se pudo cargar el listado de herramientas')
      }
    
      return itms.json()
};

