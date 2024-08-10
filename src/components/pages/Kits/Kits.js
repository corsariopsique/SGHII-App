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
            titulo: "Kits Activos",
            cantidad: `${data_kits.kitsResumen.kitsActivos}`,
            periodo: '--',
            estiloItemInfo: "text-success"
        },       

        {
            titulo: "Kits Disponibles",
            cantidad: `${data_kits.kitsResumen.kitsDisponibles}`,
            periodo: '--',
            estiloItemInfo: "text-success"
        },

        {
            titulo: "Kits en Prestamo",
            cantidad: `${data_kits.kitsResumen.kitsPrestados}`,
            periodo: '--',
            estiloItemInfo: "text-primary"
        },

        {
            titulo: "Total Herramientas en Kits ",
            cantidad: `${data_kits.kitsResumen.totalPiezasKits}`,
            periodo: '--',
            estiloItemInfo: "text-info"
        },       

    ];          

    return(

        <>

            <PanelInfoText
             title ="Resumen Kits" 
             estiloPanelInfoText ="panelinv" 
             info={datos}
            />

            <Modal 
            title='Kits'
            estiloModal="modal_intermedio"
            botoncss="btn_ModalIntermedio"
            botones={btnsKits}
            >                         
                <ListarKits tipo = '2' kitsLista={data_kits.listaKits} />

            </Modal>                       

        </>            
    );
}


export const kitsLoader = async () => {

    const token = localStorage.getItem('token'); 
    
    const kitsLista = await fetch('http://localhost:8081/api/kits', {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`},
    })   

    const resumenKits = await fetch('http://localhost:8081/api/kits/resumen',{
        method: 'GET',
        headers: {'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`}
    });   

    if (!resumenKits.ok) {
        throw Error('No se pudo cargar el resumen de kits')
    }    

    if (!kitsLista.ok) {
        throw Error('No se pudo cargar el listado de Kits')
    }

    const listaKits = await kitsLista.json();    

    const kitsResumen = await resumenKits.json();

    const totalData = {listaKits,kitsResumen};
    
    return totalData;
};
