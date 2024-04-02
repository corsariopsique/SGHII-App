
import PanelPrincipal from "./components/pages/PanelPrincipal";
import Login from "./components/pages/Login";
import Inventario from "./components/pages/Inventario";
import InfoHerramienta from "./components/pages/InfoHerramienta";
import {
  createBrowserRouter,  
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

  const router = createBrowserRouter([
    { path: "*", Component: Root },
    { path: "/", Component: Login },  
    { path: "/inventario",Component:Inventario}
  ]);

  export default function App() {
    return <RouterProvider router={router} />;
  }

  function Root() {

    return (
    
      <div>   

        <Routes>        

          <Route path="/" element={<Login />} exact/>   
          <Route path="/panelprincipal" element={<PanelPrincipal/>} exact/>   
          <Route          
          path="/inventario/:toolId"          
          loader={({ params }) => {
            console.log(params.toolId); 
          }}          
          action={({ params }) => {}}
          element={<InfoHerramienta />}
          />;       

        </Routes>   

      </div>  
       
    );

  }


 




