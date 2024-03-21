import BarraLateral from "./components/BarraLateral";
import BarraSuperior from "./components/BarraSuperior";
import PanelInfo from "./components/PanelInfo";
import Graficos from "./components/Graficos";
import Tablas from "./components/Tablas";


function App() {

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
    { key: 'name', title: 'Name' },
    { key: 'age', title: 'Age' },
  ];
  
  const data = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 35 },
    { id: 4, name: 'Perrito', age:2000},
  ];  

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
      <Tablas
      estilo='tabla'
      columns={columns} 
      data={data}
      />
    </div>    
  );
}

export default App;
