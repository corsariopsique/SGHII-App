import BarraSuperior from '../BarraSuperior';
import BarraLateral from '../BarraLateral';
import PanelInfoText from '../PanelInfoText';


function Inventario(){

    const datos = [

        {
            titulo: "Kits",
            cantidad: 14,
            periodo: 7,
            estilo: "total_Kits"
        },

        {
            titulo: "Herramientas Total",
            cantidad: 622,
            periodo: 7,
            estilo: "total_Tools"
        },

        {
            titulo: "Top Salidas",
            cantidad: 5,
            periodo: 7,
            estilo: "total_Out"
        },

        {
            titulo: "Inventarios Bajos",
            cantidad: 7,
            periodo: 7,
            estilo: "bajos_Inven"
        }
    ]

    return(
        <div>
            <BarraSuperior/>
            <BarraLateral/>
            <PanelInfoText
             title ="Inventario General" 
             estilo ="panelinv" 
             info={datos}
            />
        </div>
    );
}

export default Inventario;