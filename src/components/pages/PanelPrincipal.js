import BarraLateral from '../BarraLateral';
import BarraSuperior from "../BarraSuperior";
import PanelInfo from "../PanelInfo";
import Graficos from "../Graficos";
import Tablas from "../Tablas";
import PanelListado from "../PanelListado";

function PanelPrincipal () {

    const salida_h =[

        {
          icono: 'FlechaAlsaIcono',
          cantidad: '45',
          nombre: 'Salidas',
          color: "#1570EF"     
        },
    
        {
          icono: 'OperPanelIcono',
          cantidad: '5',
          nombre: 'Operarios',
          color: "#1570EF"
        },
    
        {
          icono: 'FlechaAbajoIcono',
          cantidad: '28',
          nombre: 'Kits',
          color: "#1570EF"
        },
    
        {
          icono: 'OperPanelIcono',
          cantidad: '12',
          nombre: 'Operarios',
          color: "#1570EF"
        }
      ]
    
      const entrada_h =[
    
        {
          icono: 'FlechaAlsaIcono',
          cantidad: '45',
          nombre: 'Entradas',
          color: "#1570EF"     
        },
    
        {
          icono: 'OperPanelIcono',
          cantidad: '5',
          nombre: 'Operarios',
          color: "#1570EF"
        },
    
        {
          icono: 'FlechaAbajoIcono',
          cantidad: '28',
          nombre: 'Kits',
          color: "#1570EF"
        },
    
        {
          icono: 'OperPanelIcono',
          cantidad: '12',
          nombre: 'Operarios',
          color: "#1570EF"
        }
      ]
    
      const resumen_inventario =[
    
        {
          icono: 'Tool2Icono',
          cantidad: '45',
          nombre: 'H. Disponibles',
          color: '#536878'
        },
    
        {
          icono: 'Tool1Icono',
          cantidad: '5',
          nombre: 'H. Por recibir',
          color: '#536878'
        }
      ]
    
      const resumen_operarios =[
    
        {
          icono: 'Oper2PanelIcono',
          cantidad: '45',
          nombre: '# Operarios',
          color: '#666699'
        },
    
        {
          icono: 'OperRolIcono',
          cantidad: '5',
          nombre: '# Roles',
          color: '#666699'
        }
      ]
    
      const columns = [
        { key: 'id', title: 'ID' },
        { key: 'name', title: 'Nombre' },
        { key: 'tool', title: 'Herramienta' },
        { key: 'oper',title: 'Operación'},
      ];
      
      const data = [
        { id: 'S1', name: 'Jose', tool: "Martillo", oper:"Prestamo"},
        { id: 'A3', name: 'Carlos', tool: "Pulidora", oper:"Prestamo"},
        { id: 'S8', name: 'Roberto', tool: "Tijera", oper:"Entrega"},
        { id: 'D5', name: 'Jose Maria', tool:"Escuadra", oper:"Prestamo"},
      ];  
    
      const lista = [
        {
          imagen:"martillo",
          tipo:"muchos",
          nombre:"Martillo",
          cantidad:10,
        },
    
        {
          imagen:"lima",
          tipo:"pocos",
          nombre:"Lima",
          cantidad:1,
        },
    
        {
          imagen:"pulidora",
          tipo:"pocos",
          nombre:"Pulidora",
          cantidad:0,
        }
      ]
    
    return (

        <div>
        <BarraSuperior></BarraSuperior>
        <BarraLateral></BarraLateral>
        <PanelInfo 
        title ="Salida de Herramienta" 
        estilo ="panelinfo1" 
        dato={salida_h}/>      
        <PanelInfo 
        title ="Entrada de herramienta" 
        estilo ="panelinfo2" 
        dato={entrada_h}/> 
        <PanelInfo 
        title ="Resumen Inventario" 
        estilo ="panelres1" 
        dato={resumen_inventario}/>           
        <PanelInfo 
        title ="Resumen Operarios" 
        estilo ="panelres2" 
        dato={resumen_operarios}/>           
        <Graficos></Graficos>   
        <PanelListado
        title="Cantidades en inventario"
        tool_list={lista}/>   
        <Tablas
        estilo='tabla'
        columns={columns} 
        data={data}
        />
      </div>    
      
    );

}
export default PanelPrincipal;