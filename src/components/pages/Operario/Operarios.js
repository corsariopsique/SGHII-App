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
            title='Operarios'
            estiloModal="modal_intermedio"
            botoncss="btn_ModalIntermedio"
            botones={btnsOperarios}
            >                         
               <ListarOperarios operarios={data_Operarios} />

            </Modal>                      

        </>            
    );
}


export const operariosLoader = async () => {
    
    const workers = await fetch('http://localhost:8081/api/operarios')   
    

    if (!workers.ok) {
        throw Error('No se pudo cargar el listado de operarios')
      }
    
      return workers.json()
};

