import './Inventario.css';
import BarraSuperior from '../BarraSuperior';
import BarraLateral from '../BarraLateral';
import PanelInfoText from '../PanelInfoText';
import Modal from '../Modal';
import Tablas from '../Tablas';


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
        { key: 'name', title: 'Nombre' },
        { key: 'tool', title: 'Herramienta' },
        { key: 'oper',title: 'Operación'},
      ];
      
      const numeros = [
        { id: 'S1', name: 'Jose', tool: "Martillo", oper:"Prestamo"},
        { id: 'A3', name: 'Carlos', tool: "Pulidora", oper:"Prestamo"},
        { id: 'S8', name: 'Roberto', tool: "Tijera", oper:"Entrega"},
        { id: 'D5', name: 'Jose Maria', tool:"Escuadra", oper:"Prestamo"},
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
            <Modal title='Herramientas'>                
                <Tablas
                    estilo='tabla_Inventario'
                    columns={columnas} 
                    data={numeros}
                />                
            </Modal>
        </div>
    );
}

export default Inventario;