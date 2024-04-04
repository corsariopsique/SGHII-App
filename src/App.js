import {
  createBrowserRouter,  
  createRoutesFromElements,  
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";


import PanelPrincipal from "./components/pages/PanelPrincipal";
import Login from "./components/pages/Login";
import Inventario from "./components/pages/Inventario";
import InfoHerramienta from "./components/pages/InfoHerramienta";


import EditarHerramienta from "./components/pages/EditarHerramienta";
import AgregarHerramienta from "./components/pages/AgregarHerramienta";
import RootLayout from "./components/Layouts/RootLayout";

  const router = createBrowserRouter([
    { path: "*", Component: Root },
    { path: "/", Component: Login },  
    { path: "/panelprincipal", Component:PanelPrincipal},
    { path: "/inventario",Component:Inventario},
    { path: "/inventario/:toolId", Component:InfoHerramienta},    
    { path: "inventario/agregarherramienta", Component:AgregarHerramienta}
  ]);

  {/*const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<PanelPrincipal />} />
        <Route path="inventario" element={<Inventario />} />
        <Route path=
      </Route>
    )
  )
    */}


  export default function App() {
    return <RouterProvider router={router} />;
  }

  function Root() {

    return (    

      <div>   
        <Routes>        
          <Route path="/" element={<Login />} exact>
            <Route path="/panelprincipal" element={<PanelPrincipal />}exact />
            <Route path="/inventario" element={<Inventario />}exact>
              <Route path=":toolId"
              loader={({ params }) => {
                console.log(params.toolId);
              }}
              action={({ params }) => {
                console.log(params.toolId);
              }}
              element={<InfoHerramienta />} />
              <Route path=":toolId/editarherramienta" element={<EditarHerramienta />} />
              <Route path="agregarherramienta" element={<AgregarHerramienta />} exact/>              
            </Route>
          </Route>








          {/*<Route path="/" element={<Login />} exact/>   
          <Route path="/panelprincipal" element={<PanelPrincipal/>} exact/>  
          <Route 
          path="/inventario/:toolId"
          loader={({ params }) => {
            console.log(params.toolId);
          }}
          action={({ params }) => {}} 
          element={<InfoHerramienta/>}          
        />*/}
        </Routes>   
      </div>  

    );

  }
