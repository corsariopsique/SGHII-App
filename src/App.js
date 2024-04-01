
import PanelPrincipal from "./components/pages/PanelPrincipal";
import Login from "./components/pages/Login";
import Inventario from "./components/pages/Inventario";
import {
  createBrowserRouter,  
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";


  const router = createBrowserRouter([
    { path: "*", Component: Root },
    { path: "/", Component: Login },    
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
          <Route path="/inventario" element={<Inventario/>}/>                           
        </Routes>   
      </div>  
       
    );

  }


 




