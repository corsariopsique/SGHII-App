import React, { useState } from 'react';
import './BarraBusqueda.css';
import BusquedaIcono from './Iconos/BusquedaIcono';

const BarraBusqueda = () => {
  const [buscTerm, setBuscTerm] = useState('');

  const escuBusca = (event) => {
    setBuscTerm(event.target.value);
    // Aquí lógica de búsqueda
  };

  return (
    <div id="bar_busq">

      <div id="icon_busq">
        <BusquedaIcono fill="#1570EF"/>          
      </div>
      
      <form id="entratexto">
        <input
            id ="entratexto"
            type="text"
            value={buscTerm}
            onChange={escuBusca}
            placeholder="Buscar..."
        />        
      </form>
      <input 
            id="b_busca"
            type="submit"
            value="Buscar"
            form='entratexto'
        />
        
    </div>
    
  );
};

export default BarraBusqueda;