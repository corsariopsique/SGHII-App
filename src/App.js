import {
  createBrowserRouter,  
  createRoutesFromElements,  
  Route,
  RouterProvider    
} from "react-router-dom";

// componentes iniciales SGHII
import Login from "./components/pages/Login";
import PanelPrincipal from "./components/pages/PanelPrincipal";

//componentes inventario
import Inventario, { inventarioLoader } from "./components/pages/Inventario/Inventario";
import InfoHerramienta, {InfoherramientaLoader} from "./components/pages/Inventario/InfoHerramienta";
import EditarHerramienta, { editarherramientaLoader, EditarHerrramientaAction } from "./components/pages/Inventario/EditarHerramienta";
import AgregarHerramienta, {AgregarHerrramientaAction} from "./components/pages/Inventario/AgregarHerramienta";
import AlertBorra from "./components/pages/Inventario/AlertBorra";

// Layouts
import RootLayout from './components/Layouts/RootLayout';
import InventarioLayout from "./components/Layouts/InventarioLayout";



   const router = createBrowserRouter(
    
    createRoutesFromElements(      
      
      <Route path="/" element={<RootLayout />}>    

        <Route path="panelprincipal" element={<PanelPrincipal />} />               
        <Route path="inventario" element={<InventarioLayout />}>

          <Route
          index
          element={<Inventario />}
          loader={inventarioLoader} />                           
         
         <Route 
          path=":toolId"
          element={<InfoHerramienta />}   
          loader ={InfoherramientaLoader}/>
          
          <Route
          path="agregarherramienta"  
          element={<AgregarHerramienta />}                                     
          action={AgregarHerrramientaAction} />    
          
          <Route
          path=":toolId/editarherramienta"
          element={<EditarHerramienta />}
          action={EditarHerrramientaAction} 
          loader={editarherramientaLoader}>  
            <Route
            path=":toolId/deleteherramienta"
            element={<AlertBorra />} />
          </Route>

        </Route>

      </Route>      
    )
  )    


  export default function App() {
    return <RouterProvider router={router} />;
  }