import './BarraLateral.css';
import ItemMenuLateral from './ItemMenuLateral';
import LogoIcono from './Iconos/LogoIcono';
import InventarioIcono from './Iconos/InventarioIcono';
import PanelPrincipalIcono from './Iconos/PanelPrincipalIcono';
import KitsIcono from './Iconos/KitsIcono';
import OperacionesIcono from './Iconos/OperacionesIcono';
import OperarioIcono from './Iconos/OperarioIcono';
import ReportesIcono from './Iconos/ReportesIcono';
import SettingsIcono from './Iconos/SettingsIcono';
import LogoutIcono from './Iconos/LogoutIcono';
import Card from './Card';


function BarraLateral(){
    
    return (
        <Card className ="barralateral">

            <div>
                <ItemMenuLateral textitem = "Ingeniar Inoxidables" enlace="https://www.ingeniarinoxidables.com/">
                    <LogoIcono fill="#1570EF"></LogoIcono>
                </ItemMenuLateral>
            </div>

        
            <ul className="nav flex-column opmenu">

                <li className="nav-item contitembar">
                    <ItemMenuLateral textitem = "Panel Principal" enlace="/panelprincipal">
                        <PanelPrincipalIcono fill="#1570EF" stroke='#ffffff'/>
                    </ItemMenuLateral>
                </li>
            
                <li className="nav-item contitembar">
                    <ItemMenuLateral textitem = "Inventario" enlace="/inventario">
                        <InventarioIcono fill='#ffffff' stroke="#1570EF"/>                        
                    </ItemMenuLateral>
                </li>
            
                <li className="nav-item contitembar">
                    <ItemMenuLateral textitem = "Kits" enlace="/kits">
                        <KitsIcono fill="#1570EF" stroke='#5D667'/>
                    </ItemMenuLateral>
                </li>
            
                <li className="nav-item contitembar">
                    <ItemMenuLateral textitem = "Operaciones" enlace="/operaciones">
                        <OperacionesIcono fill="#1570EF" stroke='#5D667'/>
                    </ItemMenuLateral>
                </li>
            
                <li className="nav-item contitembar">
                    <ItemMenuLateral textitem = "Operario" enlace="/operario">
                        <OperarioIcono fill="#1570EF" stroke='#5D667'/>
                    </ItemMenuLateral>
                </li>
            
                <li className="nav-item contitembar">
                    <ItemMenuLateral textitem = "Reportes" enlace="/reportes">
                        <ReportesIcono fill="#1570EF" stroke='#5D667'/>
                    </ItemMenuLateral>
                </li>
            
                <li className="nav-item contitembar">
                    <ItemMenuLateral textitem = "Configuración" enlace="/configuracion">
                        <SettingsIcono stroke="#1570EF"/>
                    </ItemMenuLateral>
                </li>
            
                <li className="nav-item contitembar">
                    <ItemMenuLateral textitem = "Cerrar Sesión" enlace="/">
                        <LogoutIcono fill="#1570EF" stroke='#5D667'/>
                    </ItemMenuLateral>
                </li>

            </ul>          
            
        </Card>
    );   
}

export default BarraLateral;