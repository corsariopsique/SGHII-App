import './TraerImagenes.css';
import React, { useEffect, useState } from 'react';
import {Tool1Icono} from './Iconos/IndexIcons';

const TraerImagenes = ( props ) => {
    const [imageSrc, setImageSrc] = useState(null);
    const [activaIco, setactivaIco] = useState(false);
    const id_tool = props.imageId;

    useEffect(() => {
        const fetchImage = async () => {    

            try {
                const response = await fetch(`http://localhost:8081/api/images/${id_tool}`);
                                
                if(!response.ok){
                    setactivaIco(true);
                    console.log('Respuesta del servidor:', response.ok);                    
                }
                
                const result = await response.blob();                
                const reader = new FileReader();

                reader.onloadend = () => {                     
                    setImageSrc(`data:image/png;base64,${reader.result}`);                     
                };

                reader.readAsText(result);                                     

            } catch (error) {
                setactivaIco(true);
                console.error('Error al solicitar la imagen:', error);                                
            }           
        };

        fetchImage();
               
    }, []);

    return (
        <>
            {imageSrc && !activaIco && (<img src={imageSrc} alt="Fetched from server" />)}  
            {(!imageSrc) || (activaIco) && (<Tool1Icono className="card-img-top img_info" width={props.ancho} height={props.alto} viewBox ="0 0 16 16" fill="#cec8c6"/>)} 
        </>
    );
        
}
export default TraerImagenes;
