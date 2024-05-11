import './Kits.css';
import { PanelInfoText, Modal, Tablas } from '../../IndexComponents';
import {useLoaderData} from 'react-router-dom';

export default function Kits(){   
    
    const data_kits = useLoaderData()        

    const btnsKits = [
        {
            btnname:"Agregar Kit",
            icobtn:"Tool1Icono",
            estiloBoton:"btn-outline-primary",
            tipo:"button",    
            accion:"/kits/agregarkits"                                              
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
        { key: 'name', title: 'Nombre' },
        { key: 'rol', title: 'Rol' },        
        { key: 'date_in', title: 'Fecha Ingreso'},        
    ];        

    return(

        <>

            <PanelInfoText
             title ="Inventario General" 
             estiloPanelInfoText ="panelinv" 
             info={datos}
            />

            <Modal 
            title='Kits'
            estiloModal="modal_intermedio"
            botoncss="btn_ModalIntermedio"
            botones={btnsKits}
            >                         
                <Tablas                    
                    estiloTabla='tabla_Inventario'
                    columns={col_data} 
                    data={data_kits}
                />   

            </Modal>                       

        </>            
    );
}


export const kitsLoader = async () => {
    
    const kitsLista = await fetch('http://localhost:4000/kits')   
    

    if (!kitsLista.ok) {
        throw Error('No se pudo cargar el listado de Kits')
      }
    
      return kitsLista.json()
};
