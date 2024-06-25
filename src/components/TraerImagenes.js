import './TraerImagenes.css';
import React, { useEffect, useState } from 'react';
import {Tool1Icono, OperRolIcono} from './Iconos/IndexIcons';

const TraerImagenes = ( props ) => {
    const [imageSrc, setImageSrc] = useState(null);
    const [activaIco, setactivaIco] = useState(false);    
    const id = props.imageId;

    const toolDir = `http://localhost:8081/api/images/${id}`;
    const workerDir = `http://localhost:8081/api/imagesworker/${id}`;    

    const handlerTipo = (tipoImagen) => {
        if(tipoImagen === '1') {
            return toolDir;
        }

        if(tipoImagen === '2') {
            return workerDir;
        }
    }

    const useDir = handlerTipo(props.tipo);   


    useEffect(() => {
        const fetchImage = async () => {    

            try {
                const response = await fetch(useDir);
                                
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
            {imageSrc && !activaIco && (<img id='foto' className='size_Img img_info'src={imageSrc} alt="Fetched from server" />)}  
            {(!imageSrc) || (activaIco) && (props.tipo === '1') && (<Tool1Icono className="card-img-top img_info size_Img" width={props.ancho} height={props.alto} viewBox ="0 0 16 16" fill="#cec8c6"/>)} 
            {(!imageSrc) || (activaIco) && (props.tipo === '2') && (<OperRolIcono className="card-img-top img_info size_Img" width={props.ancho} height={props.alto} viewBox ="0 0 16 16" fill="#cec8c6"/>)} 
        </>
    );
        
}
export default TraerImagenes;

