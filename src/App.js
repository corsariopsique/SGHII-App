import { Route, Routes } from "react-router-dom";
import PanelPrincipal from "./components/pages/PanelPrincipal";
import Login from "./components/pages/Login";
import Inventario from "./components/pages/Inventario";

function App() { 

  return (

    <div>   
      <Routes>
        <Route path="/" element={<Login />}/>   
        <Route path="/panelprincipal" element={<PanelPrincipal/>}/>   
        <Route path="/inventario" element={<Inventario/>}/> 
      </Routes>   
    </div>
     
  );
}

export default App;
