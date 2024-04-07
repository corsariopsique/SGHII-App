import './Inventario.css';
import { PanelInfoText, Modal, Tablas } from '../IndexComponents';
import AgregarHerramienta from './AgregarHerramienta';
import { useLoaderData } from 'react-router-dom';


export default function Inventario(){   
    
    const data_inventario = useLoaderData()    

    const btnsInventario = [
        {
            btnname:"Agregar Herramienta",
            icobtn:"Tool1Icono",
            estiloBoton:"btn-outline-primary",
            tipo:"button",            
            d_toggle:"modal",
            d_target:"#add_t_modal"
        },

        {
            btnname:"Filtros",
            icobtn:"FiltrosIcono",
            estiloBoton:"btn-outline-primary",
            tipo:"button",            
        },

        {
            btnname:"Descargar",
            icobtn:"DownloadIcono",
            estiloBoton:"btn-outline-primary",
            tipo:"button",            
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
        { key: 'tool', title: 'Herramienta' },
        { key: 'brand', title: 'Marca' },
        { key: 'cat', title: 'Categoria'},
        { key: 'rol', title: 'Rol Herramienta'},
        { key: 'date_in', title: 'Fecha Ingreso'},
        { key: 'prove', title: 'Proveedor'}
      ];      
      

    return(

        <div>            

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
                <Tablas                    
                    estiloTabla='tabla_Inventario'
                    columns={col_data} 
                    data={data_inventario}
                />   

            </Modal>  

            <div className='modal' id="add_t_modal">
                <div className="modal-dialog">
                    <AgregarHerramienta />         
                </div>
            </div>

        </div>
    );
}


export const inventarioLoader = async () => {
    
    const itms = await fetch('http://localhost:4000/tools')   
    

    if (!itms.ok) {
        throw Error('No se pudo cargar el listado de herramientas')
      }
    
      return itms.json()
};

