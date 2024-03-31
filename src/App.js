import { Route, Routes} from "react-router-dom";
import PanelPrincipal from "./components/pages/PanelPrincipal";
import Login from "./components/pages/Login";
import Inventario from "./components/pages/Inventario";
import AgregarHerramienta from "./components/pages/AgregarHerramienta";

function App() { 

  return (

    <div>   
      <Routes>        
        <Route path="/" element={<Login />}/>   
        <Route path="/panelprincipal" element={<PanelPrincipal/>} exact/>   
        <Route path="/inventario" element={<Inventario/>} exact/>    
        <Route path="/inventario/agregarherramienta" element={<AgregarHerramienta/>} exact/>             
      </Routes>   
    </div>
     
  );
}

export default App;
