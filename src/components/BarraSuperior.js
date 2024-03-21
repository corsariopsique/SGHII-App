import './BarraSuperior.css';
import BarraBusqueda from './BarraBusqueda';
import ic_notif from './images/notification.svg';
import ima_ava from './images/fotoavatar.jpg';


function BarraSuperior () {

    return (

        <header id="barrasuperior">
            <div id="cont_av_busq">
                <BarraBusqueda/>  
                <div id="notifav">
                    <div id="ic_notif">
                        <img id="icn_svg" src = {ic_notif}></img>
                    </div>
                    <div id="avatar">
                        <img id="img_ava" src={ima_ava}></img>
                    </div>
                </div>              
            </div>            
        </header>
    );
}

export default BarraSuperior;