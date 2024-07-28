import { Outlet, useLocation, Navigate } from 'react-router-dom'
import { Modal, BarraLateral, BarraSuperior } from '../IndexComponents'
import { LogoCompletoIcono } from "../Iconos/IndexIcons";
import { useContext } from 'react';
import AutenticacionContexto from '../authentication/AutenticacionContexto';

export default function HomeLayout() {

  const auteCtx = useContext(AutenticacionContexto);

  let ubicacion_Actual = useLocation().pathname;
  
  return (
    <>
    { auteCtx.isLoggedIn &&
      <>
        <BarraSuperior />
        <BarraLateral /> 
      </>
    }

      { auteCtx.isLoggedIn && ubicacion_Actual ==='/' &&
        <Modal        
        estiloModal="modal_completo icono-root">
          <LogoCompletoIcono />           
        </Modal>            
      }

      {!auteCtx.isLoggedIn && (<Navigate to="/login" replace={true} />)}
              
      <Outlet />
      
    </>
  )
}
