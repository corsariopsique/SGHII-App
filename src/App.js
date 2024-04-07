import {
  createBrowserRouter,  
  createRoutesFromElements,  
  Route,
  RouterProvider    
} from "react-router-dom";

import PanelPrincipal from "./components/pages/PanelPrincipal";
import Login from "./components/pages/Login";
import Inventario, { inventarioLoader } from "./components/pages/Inventario";
import InfoHerramienta, {InfoherramientaLoader} from "./components/pages/InfoHerramienta";

import RootLayout from './components/layouts/RootLayout';
import InventarioLayout from "./components/layouts/InventarioLayout";

   const router = createBrowserRouter(
    
    createRoutesFromElements(      
      
      <Route path="/" element={<RootLayout />}>        
        <Route path="panelprincipal" element={<PanelPrincipal />} />       
        <Route path="inventario" element={<InventarioLayout />}>
          <Route 
          index 
          element={<Inventario />}
          loader={inventarioLoader}/>
          <Route 
          path=":toolId"
          element={<InfoHerramienta />}   
          loader ={InfoherramientaLoader} 
          />    
        </Route>
      </Route>      
    )
  )    


  export default function App() {
    return <RouterProvider router={router} />;
  }