import './BarraSuperior.css';
import BarraBusqueda from './BarraBusqueda';
import ima_ava from './images/fotoavatar.jpg';
import { NotificationIcono } from './Iconos/IndexIcons';

function BarraSuperior () {

    return (

        <header id="barrasuperior">
            <div id="cont_av_busq">
                <BarraBusqueda/>  
                <div id="notifav">
                    <div id="ic_notif">
                        <NotificationIcono id="icn_svg" fill="#979aaa"/>                        
                    </div>
                    <div id="avatar">
                        <img id="img_ava" src={ima_ava} alt='avatar'></img>
                    </div>
                </div>              
            </div>            
        </header>
    );
}

export default BarraSuperior;