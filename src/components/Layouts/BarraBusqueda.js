import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import './BarraBusqueda.css';
import { TraerImagenes } from '../IndexComponents';
import BusquedaIcono from '../Iconos/BusquedaIcono';

const BarraBusqueda = () => {

  const terminoReferenciado = useRef();
  const [results, setResults] = useState({});  
  const [rndSearch, setRndSearch] = useState(false);
  const webServiceUrl = localStorage.getItem('webServiceUrl');  
  const token = localStorage.getItem('token');
  const url = new URL(`${webServiceUrl}busqueda`);  

  const estado = (estado) => {
    if(estado === 1 || estado === true){
        return 'No disponible'
    }else if (estado === 0 || estado === false){
        return 'Disponible'
    }
  } 

  const CerrarBusqueda = () => {  
    setRndSearch(false);   
  }

  const buscaServer = async () => {

    const wordBusca = terminoReferenciado.current.value;
    url.searchParams.append("query", wordBusca);    

    try{
      const response = await fetch(`${url}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`}          
      });

      setResults(await response.json());  
      setRndSearch(true);  
      console.log(url);  
      return response.status;
  
    } catch(error) {            
        console.error('Error al enviar la solicitud:', error);                    
        return false;
    }
  } 

  const Backdrop = () => {
    return <div className="backdrop-root_Search" />;
  };

  const Resultados = () => {
    return (

      <div className="modal-root_Search">   

        <button className='btn btn-primary cerrar_Busqueda' onClick={CerrarBusqueda}>Cerrar</button>       

        {results.tools.length > 0 &&        

          <div className='contenedor_Resultados'>

            <h2>Herramientas</h2>       

            {results.tools && results.tools.map((item,index) => (

              <>           

                <a href={`/inventario/${item.id}`} key={index}>

                  <div className="card ficha_Resultado">
                    <div className="row g-0">

                      <div className="col-5 col-sm-2 border">
                        <TraerImagenes tipo='1' ancho='100px' alto='100px' imageId={item.id} />                
                      </div>

                      <div className="col-7 col-sm-8">
                        <div className="card-body">
                          <h5 className="card-title">Nombre: {item.nombre}</h5>
                          <h6 className="card-subtitle mb-2 text-muted">ID: {item.id}</h6>                  
                        </div>
                      </div>
                    </div>
                  </div>  

                </a>          

              </>

            ))}  

          </div>  
        } 

        {results.items.length > 0 &&    

          <div className='contenedor_Resultados'>

            <h2>Items</h2>      

            {results.items && results.items.map((item,index) => (

              <>           

                <a href={`/inventario/items/${item.id}`} key={index}>

                  <div className="card ficha_Resultado">
                    <div className="row g-0">

                      <div className="col-5 col-sm-2 border">
                        <TraerImagenes tipo='1' ancho='100px' alto='100px' imageId={item.id} />                
                      </div>

                      <div className="col-7 col-sm-8">
                        <div className="card-body">
                          <h5 className="card-title">ID: {item.id}</h5>
                          <h6 className="card-subtitle mb-2 text-muted">Herramienta: {item.herramienta.nombre}</h6>                  
                          <h6 className="card-subtitle mb-2 text-muted">Estado: {estado(item.estado)}</h6>                  
                        </div>
                      </div>
                    </div>
                  </div>  

                </a>          

              </>

            ))}  

          </div>  
        } 

        {results.kits.length > 0 &&  

          <div className='contenedor_Resultados'>

            <h2>Kits</h2>      

            {results.kits && results.kits.map((item,index) => (

              <>           

                <a href={`/kits/${item.id}`} key={index}>

                  <div className="card ficha_Resultado">
                    <div className="row g-0">

                      <div className="col-5 col-sm-2 border">
                        <TraerImagenes tipo='1' ancho='100px' alto='100px' imageId={item.id} />                
                      </div>

                      <div className="col-7 col-sm-8">
                        <div className="card-body">
                          <h5 className="card-title">Nombre: {item.nombre}</h5>
                          <h6 className="card-subtitle mb-2 text-muted">ID: {item.id}</h6>                  
                          <h6 className="card-subtitle mb-2 text-muted">Cantidad items: {item.herramientas.length}</h6>
                          <h6 className="card-subtitle mb-2 text-muted">Estado: {estado(item.disponible)}</h6>                  
                        </div>
                      </div>
                    </div>
                  </div>  

                </a>          

              </>

            ))}  

          </div>   
        }

        {results.operaciones.length > 0 &&      

          <div className='contenedor_Resultados'>

            <h2>Operaciones</h2>      

            {results.operaciones && results.operaciones.map((item,index) => (

              <>           

                <a href={`/operaciones/${item.id}`} key={index}>

                  <div className="card ficha_Resultado">
                    <div className="row g-0">

                      <div className="col-5 col-sm-2 border">
                        <TraerImagenes tipo='2' ancho='100px' alto='100px' imageId={item.operario.id} />                
                      </div>

                      <div className="col-7 col-sm-8">
                        <div className="card-body">
                          <h5 className="card-title">Nombre: {item.operario.nombre}</h5>
                          <h6 className="card-subtitle mb-2 text-muted">ID: {item.id}</h6>                  
                          <h6 className="card-subtitle mb-2 text-muted">Cantidad items: {item.herramienta.length+item.kit.length}</h6>
                          <h6 className="card-subtitle mb-2 text-muted">Fecha: {item.fecha_operacion}</h6>                  
                        </div>
                      </div>
                    </div>
                  </div>  

                </a>          

              </>

            ))}  

          </div>         
        }

        {results.operarios.length > 0 &&     

          <div className='contenedor_Resultados'>

            <h2>Operarios</h2>      

            {results.operarios && results.operarios.map((item,index) => (

              <>           

                <a href={`/operarios/${item.id}`} key={index}>

                  <div className="card ficha_Resultado">
                    <div className="row g-0">

                      <div className="col-5 col-sm-2 border">
                        <TraerImagenes tipo='2' ancho='100px' alto='100px' imageId={item.id} />                
                      </div>

                      <div className="col-7 col-sm-8">
                        <div className="card-body">
                          <h5 className="card-title">Nombre: {item.nombre}</h5>
                          <h6 className="card-subtitle mb-2 text-muted">ID: {item.id}</h6>                  
                          <h6 className="card-subtitle mb-2 text-muted">Telefono: {item.telefono}</h6>
                          <h6 className="card-subtitle mb-2 text-muted">E-mail: {item.email}</h6>                  
                        </div>
                      </div>
                    </div>
                  </div>  

                </a>          

              </>

            ))}  

          </div>
        }

        {results.proveedores.length > 0 &&        

          <div className='contenedor_Resultados'>

            <h2>Proveedores</h2>      

            {results.proveedores && results.proveedores.map((item,index) => (

              <>           

                <a href={`/proveedores/${item.id}`} key={index}>

                  <div className="card ficha_Resultado">
                    <div className="row g-0">

                      <div className="col-5 col-sm-2 border">
                        <TraerImagenes tipo='2' ancho='100px' alto='100px' imageId={item.id} />                
                      </div>

                      <div className="col-7 col-sm-8">
                        <div className="card-body">
                          <h5 className="card-title">Nombre: {item.nombre}</h5>
                          <h6 className="card-subtitle mb-2 text-muted">ID: {item.id}</h6>                  
                          <h6 className="card-subtitle mb-2 text-muted">Telefono: {item.telefono}</h6>
                          <h6 className="card-subtitle mb-2 text-muted">Ciudad: {item.ciudad}</h6>                  
                        </div>
                      </div>
                    </div>
                  </div>  

                </a>          

              </>

            ))}  

          </div>        
        }
        
      </div>
    );
  }


  return (

    <>

      {rndSearch && ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById('backdrop-root')
      )} 

      {rndSearch && ReactDOM.createPortal(
        <Resultados />,
        document.getElementById('overlay-root')
      )}


      <div id="bar_busq">

        <div id="icon_busq">
          <BusquedaIcono fill="#1570EF"/>          
        </div>  

        <div id ="entratexto">

          <input          
            type="text"            
            ref={terminoReferenciado}          
            placeholder="Buscar..."
          />   

          <input 
            type="button"
            value="Buscar"
            onClick={buscaServer}          
            className='btn btn-outline-primary'          
          />

        </div>    
      </div>

    </>
    
  );
};

export default BarraBusqueda;