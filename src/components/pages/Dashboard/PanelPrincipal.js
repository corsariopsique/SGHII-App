import PanelInfo from "./PanelInfo";
import Graficos from "../../generalUseComponents/Graficos";
import Tablas from "../../generalUseComponents/Tablas";
import PanelListado from "./PanelListado";
import { useLoaderData } from "react-router";

function PanelPrincipal () {

  const data_Dashboard = useLoaderData(); 

  const salida_h =[
    {
      icono: 'FlechaAlsaIcono',
      cantidad: `${data_Dashboard.operacionesResumen.operL7dP}`,
      nombre: 'Prestamos Ult.7d',
      color: "#1570EF"     
    },

    {
      icono: 'OperPanelIcono',
      cantidad: `${data_Dashboard.operacionesResumen.workersOperPL7d}`,
      nombre: 'Operarios Ult.7d',
      color: "#1570EF"
    },

    {
      icono: 'Tool1Icono',
      cantidad: `${data_Dashboard.operacionesResumen.kitsOperL7dP}`,
      nombre: 'Kits Op. Ult.7d',
      color: "#1570EF"
    },

    {
      icono: 'Tool2Icono',
      cantidad: `${data_Dashboard.operacionesResumen.toolsOperL7dP}`,
      nombre: 'Herr. Op. Ult.7d',
      color: "#1570EF"
    }    
  ]
  
  const entrada_h =[
    {
      icono: 'FlechaAbajoIcono',
      cantidad: `${data_Dashboard.operacionesResumen.operL7dD}`,
      nombre: 'Devolu. Ult.7d',
      color: "#1570EF"     
    },

    {
      icono: 'OperPanelIcono',
      cantidad: `${data_Dashboard.operacionesResumen.workersOperDL7d}`,
      nombre: 'Operarios Ult.7d',
      color: "#1570EF"
    },

    {
      icono: 'Tool1Icono',
      cantidad: `${data_Dashboard.operacionesResumen.kitsOperL7dD}`,
      nombre: 'Kits Op. Ult.7d',
      color: "#1570EF"
    },

    {
      icono: 'Tool2Icono',
      cantidad: `${data_Dashboard.operacionesResumen.toolsOperL7dD}`,
      nombre: 'Herr. Op. Ult.7d',
      color: "#1570EF"
    }    
  ]

  const resumen_inventario =[

    {
      icono: 'Tool3Icono',
      cantidad: `${data_Dashboard.herramientasResumen.piezasDisponibles}`,
      nombre: 'H. Disponibles',
      color: '#536878'
    },

    {
      icono: 'Tool4Icono',
      cantidad: `${data_Dashboard.herramientasResumen.piezasPrestamo}`,
      nombre: 'H. Por recibir',
      color: '#536878'
    },

    {
      icono: 'Tool1Icono',
      cantidad: `${data_Dashboard.herramientasResumen.piezasKits}`,
      nombre: 'H. Kits',
      color: '#536878'
    },

    {
      icono: 'Tool2Icono',
      cantidad: `${data_Dashboard.herramientasResumen.piezasActivas}`,
      nombre: 'H. Totales',
      color: '#536878'
    },
  ]
  
  const resumen_operarios =[

    {
      icono: 'Oper2PanelIcono',
      cantidad: `${data_Dashboard.operariosResumen.operariosReg}`,
      nombre: '# Operarios',
      color: '#666699'
    },

    {
      icono: 'OperarioActivoIcono',
      cantidad: `${data_Dashboard.operariosResumen.operariosActivos}`,
      nombre: '# Operarios Activos',
      color: '#666699'
    },

    {
      icono: 'OperarioBajaIcono',
      cantidad: `${data_Dashboard.operariosResumen.operariosDeBaja}`,
      nombre: '# Operarios Inactivos',
      color: '#666699'
    },

    {
      icono: 'OperRolIcono',
      cantidad: `${data_Dashboard.operariosResumen.operariosRoles}`,
      nombre: '# Roles',
      color: '#666699'
    }
  ]
  
  const columns = [
    { key: 'id', title: 'ID Herramienta' },
    { key: 'nombre', title: 'Nombre' },
    { key: 'cantidad', title: 'Cantidad' },
    { key: 'fecha_in',title: 'Fecha Ingreso'},
  ]; 

  const lista = []
  
  data_Dashboard.herramientasResumen.herramientaEscasa.map((item) => {
    const tool = {
      imagen: item.id,      
      nombre: item.nombre,
      cantidad: item.cantidad_disponible
    }
    lista.push(tool);
  });
  
  return (
    <>   

      <PanelInfo 
      title ="Salidas de Inventario" 
      estiloPanelInfo ="panelinfo1" 
      dato={salida_h}/>   

      <PanelInfo 
      title ="Entradas de Inventario" 
      estiloPanelInfo ="panelinfo2" 
      dato={entrada_h}/> 

      <PanelInfo 
      title ="Resumen Inventario" 
      estiloPanelInfo ="panelres1" 
      dato={resumen_inventario}/>  

      <PanelInfo 
      title ="Resumen Operarios" 
      estiloPanelInfo ="panelres2" 
      dato={resumen_operarios}/>        

      <PanelListado
      title="Cantidades bajas en inventario"
      tool_list={lista}/>   

      <Graficos
      type = 'line'            
      data = {data_Dashboard.dataSetOper}
      id = 'grafico' />

      <Tablas
      listado='inventario'
      estiloTabla='tabla_Panel'
      columns={columns} 
      data={data_Dashboard.herramientasResumen.ingresosL30d}
      />

    </>   
    
  );

}
export default PanelPrincipal;

export const dataResumen = async () => {

  const token = localStorage.getItem('token'); 
  const webServiceUrl = localStorage.getItem('webServiceUrl'); 
 

  const resumenOperaciones = await fetch(`${webServiceUrl}operaciones/resumen`,{
      method: 'GET',
      headers: {'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`}
  });

  const resumenOperarios = await fetch(`${webServiceUrl}operarios/resumen`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`}
  });

  const resumenHerramientas = await fetch(`${webServiceUrl}herramientas/resumen`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`}
  });

  const operDataSet = await fetch(`${webServiceUrl}data/oper7d`,{
      method: 'GET',
      headers: {'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`}
  });

 
  if (!operDataSet.ok) {
    throw Error('No se pudo cargar data de prestamos')
  } 

  if (!resumenOperaciones.ok) {
      throw Error('No se pudo cargar el resumen de operaciones')
  }

  if (!resumenOperarios.ok) {
    throw Error('No se pudo cargar el resumen de operarios')
  }
  
  if (!resumenHerramientas.ok) {
    throw Error('No se pudo cargar el resumen de herramientas')
  }

  const operacionesResumen = await resumenOperaciones.json();  

  const operariosResumen = await resumenOperarios.json();

  const herramientasResumen = await resumenHerramientas.json();

  const dataSetOper = await operDataSet.json();  

  const totalData = {operacionesResumen,operariosResumen,herramientasResumen, dataSetOper};

  return totalData;      

}