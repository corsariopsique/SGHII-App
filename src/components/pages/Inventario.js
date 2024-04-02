import './Inventario.css';
import BarraSuperior from '../BarraSuperior';
import BarraLateral from '../BarraLateral';
import PanelInfoText from '../PanelInfoText';
import Modal from '../Modal';
import Tablas from '../Tablas';
import AgregarHerramienta from './AgregarHerramienta';


function Inventario(){      

    const datos = [

        {
            titulo: "Kits",
            cantidad: 14,
            periodo: 7,
            estilo: "total_Kits"
        },

        {
            titulo: "Herramientas Total",
            cantidad: 622,
            periodo: 7,
            estilo: "total_Tools"
        },

        {
            titulo: "Top Salidas",
            cantidad: 5,
            periodo: 7,
            estilo: "total_Out"
        },

        {
            titulo: "Inventarios Bajos",
            cantidad: 7,
            periodo: 7,
            estilo: "bajos_Inven"
        }
    ]

    const columnas = [
        { key: 'id', title: 'ID' },
        { key: 'name', title: 'Herramienta' },
        { key: 'date', title: 'Fecha Ingreso' },
        { key: 'disp',title: 'Disponibilidad'},
      ];
      
      const numeros = [
        { id: 'M1', name: 'Martillo', date: "06/08/2021", disp:"Disponible"},
        { id: 'E1', name: 'Escuadra', date: "09/07/2021", disp:"Sin Inventario"},
        { id: 'P4', name: 'Pulidora', date: "14/05/2021", disp:"Disponible"},
        { id: 'XD6', name: 'Escoriador', date: "06/08/2021", disp:"Disponible"},
        { id: 'M1', name: 'Martillo', date: "06/08/2021", disp:"Disponible"},
        { id: 'E1', name: 'Escuadra', date: "09/07/2021", disp:"Sin Inventario"},
        { id: 'P4', name: 'Pulidora', date: "14/05/2021", disp:"Disponible"},
        { id: 'XD6', name: 'Escoriador', date: "06/08/2021", disp:"Disponible"},
        { id: 'M1', name: 'Martillo', date: "06/08/2021", disp:"Disponible"},
        { id: 'E1', name: 'Escuadra', date: "09/07/2021", disp:"Sin Inventario"},
        { id: 'P4', name: 'Pulidora', date: "14/05/2021", disp:"Disponible"},
        { id: 'XD6', name: 'Escoriador', date: "06/08/2021", disp:"Disponible"},
        { id: 'M1', name: 'Martillo', date: "06/08/2021", disp:"Disponible"},
        { id: 'E1', name: 'Escuadra', date: "09/07/2021", disp:"Sin Inventario"},
        { id: 'P4', name: 'Pulidora', date: "14/05/2021", disp:"Disponible"},
        { id: 'XD6', name: 'Escoriador', date: "06/08/2021", disp:"Disponible"},
        { id: 'M1', name: 'Martillo', date: "06/08/2021", disp:"Disponible"},
        { id: 'E1', name: 'Escuadra', date: "09/07/2021", disp:"Sin Inventario"},
        { id: 'P4', name: 'Pulidora', date: "14/05/2021", disp:"Disponible"},
        { id: 'XD6', name: 'Escoriador', date: "06/08/2021", disp:"Disponible"},
      ];  


      const btns = [
        {
            btnname:"Agregar Herramienta",
            icobtn:"Tool1Icono",
            estilo:"btn-outline-primary",
            tipo:"button",            
            d_toggle:"modal",
            d_target:"#add_t_modal"
        },

        {
            btnname:"Filtros",
            icobtn:"FiltrosIcono",
            estilo:"btn-outline-primary",
            tipo:"button",            
        },

        {
            btnname:"Descargar",
            icobtn:"DownloadIcono",
            estilo:"btn-outline-primary",
            tipo:"button",            
        }
      ];

    return(

        <div>

            <BarraSuperior/>
            <BarraLateral/>

            <PanelInfoText
             title ="Inventario General" 
             estilo ="panelinv" 
             info={datos}
            />

            <Modal 
            title='Herramientas'
            estilo="modal_intermedio"
            botoncss="btn_ModalIntermedio"
            botones={btns}
            >                         
                <Tablas
                    estilo='tabla_Inventario'
                    columns={columnas} 
                    data={numeros}
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

export default Inventario;