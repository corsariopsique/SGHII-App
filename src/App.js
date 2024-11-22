import {
  createBrowserRouter,  
  createRoutesFromElements,      
  Route,
  RouterProvider  
} from "react-router-dom";

//componente sesion de usuario
import { useContext } from "react";
import AutenticacionContexto from "./components/authentication/AutenticacionContexto";
import Login from "./components/authentication/Login";
import Logout from "./components/authentication/Logout";

// componentes iniciales SGHII

import PanelPrincipal, { dataResumen } from "./components/pages/Dashboard/PanelPrincipal";

//componentes inventario
import Inventario, { inventarioLoader } from "./components/pages/Inventario/Inventario";
import InfoHerramienta, {InfoherramientaLoader} from "./components/pages/Inventario/InfoHerramienta";
import EditarHerramienta, { editarherramientaLoader, EditarHerrramientaAction } from "./components/pages/Inventario/EditarHerramienta";
import AgregarHerramienta, {AgregarHerrramientaAction} from "./components/pages/Inventario/AgregarHerramienta";
import AlertBorra, { alertBorraLoader } from "./components/pages/Inventario/AlertBorra";
import InfoItem, { InfoItemLoader } from "./components/pages/Inventario/InfoItem";
import BajaItem, {bajaItemLoader} from "./components/pages/Inventario/BajaItem";

//componentes Kits
import Kits, { kitsLoader } from "./components/pages/Kits/Kits";
import AgregarKits, {agregarKitsLoader, AgregarKitsAction} from "./components/pages/Kits/AgregarKits";
import InfoKit, {InfoKitLoader} from "./components/pages/Kits/InfoKit";
import EditarKits, { EditarKitsLoader, EditarKitsAction } from "./components/pages/Kits/EditarKits";
import BorrarKits from "./components/pages/Kits/BorrarKits";

// componentes Operarios
import AgregarOperario, { AgregarOperarioAction } from "./components/pages/Operario/AgregarOperario";
import InfoOperario, { InfoOperarioLoader } from "./components/pages/Operario/InfoOperario";
import Operarios, { operariosLoader } from "./components/pages/Operario/Operarios";
import EditarOperario, { EditarOperarioAction, editarOperarioLoader } from "./components/pages/Operario/EditarOperario";
import BorrarOperario, {BorrarOperarioLoader} from "./components/pages/Operario/BorrarOperario";
import PazYsalvo, { PazYSalvoLoader } from "./components/pages/Operario/PazYSalvo";

// componentes Operaciones
import Operaciones, {operacionesLoader} from "./components/pages/Operaciones/Operaciones";
import AgregarOperacion, { AgregarOperacionAction, agregarOperacionLoader } from "./components/pages/Operaciones/AgregarOperacion";
import InfoOperacion, { InfoOperacionLoader } from "./components/pages/Operaciones/InfoOperacion";

// componente Proveedores
import Proveedores, { proveedoresLoader } from "./components/pages/Proveedores/Proveedores";
import AgregarProveedor, { AgregarProveedorAction, agregarProveedorLoader } from "./components/pages/Proveedores/AgregarProveedor";
import InfoProveedores, {InfoSuplierLoader} from "./components/pages/Proveedores/InfoProveedores";
import EditarProveedor, {EditarProveedorLoader, EditarProveedorAction} from "./components/pages/Proveedores/EditarProveedor";
import BorrarProveedor from "./components/pages/Proveedores/BorrarProveedor";

// componentes Reportes
import Reportes, { reportesLoader } from "./components/pages/Reportes/Reportes";
import ReportesHerramientas, { reportesHerramientasLoader } from "./components/pages/Reportes/ReportesHerramientas";
import ReportesOperarios, { reportesOperariosLoader } from "./components/pages/Reportes/ReportesOperarios";
import ReportesKits, { reportesKitsLoader } from "./components/pages/Reportes/ReportesKits";

// componentes Configuracion
import Configuracion, { ConfiguracionAction, configuracionLoader } from "./components/pages/Configuracion/Configuracion";
import ModificarUsuario, { ModificarUserAction } from "./components/pages/Configuracion/ModificarUsuario";
import BorrarUsuario from "./components/pages/Configuracion/BorrarUsuario";
import RegistrarUsuario, { RegistrarUserAction } from "./components/pages/Configuracion/RegistrarUsuario";

// Layouts
import HomeLayout from './components/Layouts/HomeLayout';
import InventarioLayout from "./components/Layouts/InventarioLayout";
import KitsLayout from "./components/Layouts/KitsLayout";
import OperariosLayout from './components/Layouts/OperariosLayout';
import OperacionesLayout from "./components/Layouts/OperacionesLayout";
import ProveedoresLayout from "./components/Layouts/ProveedoresLayout";
import ReportesLayout from "./components/Layouts/ReportesLayout";
import ConfiguracionLayout from "./components/Layouts/ConfiguracionLayout";




export default function App() {  

  const auteCtx = useContext(AutenticacionContexto);    

   const router = createBrowserRouter(
    
    createRoutesFromElements(      

      // Gestor de rutas

      <Route path="/" element={<HomeLayout />}>

        <Route path="/login" element={<Login />}/>        

        {auteCtx.isLoggedIn && (            
          <>
          
            <Route path="panelprincipal" 
              element={<PanelPrincipal />}
              loader={dataResumen} />  

            <Route path="inventario" element={<InventarioLayout />}>
              <Route
                index
                element={<Inventario />}
                loader={inventarioLoader} /> 

              <Route
                  path="agregarherramienta"  
                  element={<AgregarHerramienta />}                                     
                  action={AgregarHerrramientaAction} />  
            
              <Route 
                  path=":toolId"
                  element={<InfoHerramienta />}   
                  loader ={InfoherramientaLoader}/>                  
                
              <Route
                path=":toolId/editarherramienta"
                element={<EditarHerramienta />}
                action={EditarHerrramientaAction} 
                loader={editarherramientaLoader}>  
                <Route
                  path="deleteherramienta"
                  element={<AlertBorra />} 
                  loader={alertBorraLoader}/>
              </Route>

              <Route
              path="items/:itemId"
              element={<InfoItem />}
              loader={InfoItemLoader}>
                <Route
                path="deleteitem"
                element={<BajaItem />}
                loader={bajaItemLoader} />
              </Route>               

            </Route>

            <Route path="kits" element={<KitsLayout />}>

              <Route
                index
                element={<Kits />}
                loader={kitsLoader} />
              
              <Route
                path="agregarkits"
                element={<AgregarKits />}
                loader={agregarKitsLoader} 
                action={AgregarKitsAction}/>

              <Route 
                path=":kitId"
                element={<InfoKit />}   
                loader ={InfoKitLoader}/>

              <Route
                path=":kitId/editarkits"
                element={<EditarKits />}
                action={EditarKitsAction} 
                loader={EditarKitsLoader}>
                <Route
                  path="deletekits"
                  element={<BorrarKits />} />            
              </Route>          

            </Route>

            <Route path="operarios" element={<OperariosLayout />}>
              <Route 
                index
                element={<Operarios />}
                loader={operariosLoader}/>

              <Route
                path="agregaroperario"
                element={<AgregarOperario />}
                action={AgregarOperarioAction}/>

              <Route 
                path=":workerId"
                element={<InfoOperario />}   
                loader ={InfoOperarioLoader}>

                  <Route
                  path="pazysalvo"
                  element={<PazYsalvo />}
                  loader={PazYSalvoLoader}/>
              </Route>

              <Route
                path=":workerId/editaroperario"
                element={<EditarOperario />}
                action={EditarOperarioAction}
                loader={editarOperarioLoader}>
                <Route
                  path="deleteoperario"
                  element={<BorrarOperario />}
                  loader={BorrarOperarioLoader}/>            
              </Route>

            </Route>

            <Route path="operaciones" element={<OperacionesLayout />}>
              <Route 
                index
                element={<Operaciones />}
                loader={operacionesLoader}/>

              <Route
                path="agregaroperacion"
                element={<AgregarOperacion />}
                loader={agregarOperacionLoader}
                action={AgregarOperacionAction} />

              <Route
                path= ":operId"
                element={<InfoOperacion />}
                loader={InfoOperacionLoader}/> 

            </Route>

            <Route path="proveedores" element={<ProveedoresLayout />}>
              <Route
                index
                element={<Proveedores />}
                loader={proveedoresLoader}/>

              <Route 
                path="agregarproveedor"
                element={<AgregarProveedor/>}
                loader={agregarProveedorLoader}
                action={AgregarProveedorAction} />

              <Route
                path= ":suplierId"
                element={<InfoProveedores />}
                loader={InfoSuplierLoader}/> 

              <Route
                path=":suplierId/editarproveedor"
                element={<EditarProveedor />}
                action={EditarProveedorAction}
                loader={EditarProveedorLoader}> 
                <Route
                  path="deleteproveedor"
                  element={<BorrarProveedor />} />  

              </Route>

            </Route>

            <Route path="reportes" element={<ReportesLayout />}>

              <Route
                index
                element={<Reportes />}
                loader={reportesLoader} />

              <Route
                path="herramientas"
                element={<ReportesHerramientas />}
                loader={reportesHerramientasLoader}/>

              <Route 
                path="operarios"
                element={<ReportesOperarios />}
                loader={reportesOperariosLoader}/>

              <Route 
                path="kits"
                element={<ReportesKits />}
                loader={reportesKitsLoader}/>

            </Route>           

            <Route path="configuracion" element={<ConfiguracionLayout />}>

              <Route
                index
                element={<Configuracion />}
                loader={configuracionLoader}/>  

              <Route
                path="registrar"
                element={<RegistrarUsuario />}
                action={RegistrarUserAction} />

              <Route
                path="changePass"
                element={<Logout />}
                action={ConfiguracionAction}/>

              <Route
                path=":username/update"
                element={<ModificarUsuario />}
                action={ModificarUserAction} />

              <Route
                path=":username/delete"
                element={<BorrarUsuario />} />                         
            
            </Route>
             

            <Route path="logout" element={<Logout />} />

          </>
        )} 

      </Route>          
    )
  )

  return <RouterProvider router={router} />;

}