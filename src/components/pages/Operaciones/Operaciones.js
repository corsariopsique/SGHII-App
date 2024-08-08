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

    data_Operaciones.map((item) => {
                
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
             title ="Inventario General" 
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
    
    const operacionesLista = await fetch('http://localhost:8081/api/operaciones',{
        method:'GET',
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}
    });                 

    if (!operacionesLista.ok) {
        throw Error('No se pudo cargar el listado de operaciones')
    }     
    
    return await operacionesLista.json();
};
