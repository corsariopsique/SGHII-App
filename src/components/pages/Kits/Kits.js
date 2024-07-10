import './Kits.css';
import { PanelInfoText, Modal } from '../../IndexComponents';
import ListarKits from './ListarKits';
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
                <ListarKits tipo = '2' kitsLista={data_kits} />

            </Modal>                       

        </>            
    );
}


export const kitsLoader = async () => {
    
    const kitsLista = await fetch('http://localhost:8081/api/kits')   
    

    if (!kitsLista.ok) {
        throw Error('No se pudo cargar el listado de Kits')
    }
    
    return await kitsLista.json()
};
