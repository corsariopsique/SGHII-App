import { Outlet, useLocation } from 'react-router-dom'
import { Modal, BarraLateral, BarraSuperior } from '../IndexComponents'
import { LogoCompletoIcono } from "../Iconos/IndexIcons";

export default function RootLayout() {

  let ubicacion_Actual = useLocation().pathname;
  
  return (
    <div>
        <BarraSuperior />
        <BarraLateral />

        { ubicacion_Actual ==='/' &&
          <Modal        
          estiloModal="modal_completo icono-root">
            <LogoCompletoIcono />           
          </Modal>            
        }
                
        <Outlet />
    </div>
  )
}
