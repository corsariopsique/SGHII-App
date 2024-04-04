import './InfoHerramienta.css';
import {Modal, BarraLateral, BarraSuperior, Tablas} from '../IndexComponents';
import EditarHerramienta from './EditarHerramienta';
import AlertBorra from './AlertBorra';


function InfoHerramienta(props){    

    const ruta_img = require('../images/martillo.png'); 

    const btns = [
        {
            btnname:"Editar",
            icobtn:"EditarIcono",
            estilo:"btn-outline-secondary",
            tipo:"button",            
            d_toggle:"modal",
            d_target:"#edit_t_modal"          
        },

        {
            btnname:"Descargar",
            icobtn:"DownloadIcono",
            estilo:"btn-outline-secondary",
            tipo:"button",            
        }
      ];

      const columns = [
        { key: 'id', title: 'ID' },
        { key: 'name', title: 'Nombre Operario' },        
        { key: 'date',title: 'Fecha Operación'},
      ];
      
      const data = [
        { id: 'S1', name: 'Jose', date:"2024-02-15"},
        { id: 'A3', name: 'Carlos', date:"2024-01-25"},
        { id: 'S8', name: 'Roberto', date:"2023-12-21"},
        { id: 'D5', name: 'Jose Maria', date:"2024-01-09"},
      ];  

    return(
        <div>
            <Modal 
            title="Información Herramienta"
            estilo="modal_completo"
            botoncss="btn_ModalIntermedio"
            botones={btns}
            >

                <nav class="nav nav-tabs" id="nav-tab" role="tablist">
                    <a class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Descripción</a>                    
                    <a class="nav-link disabled" id="nav-disabled-tab" data-bs-toggle="tab" href="#nav-disabled" role="tab" aria-controls="nav-disabled" tabindex="-1" aria-disabled="true"> </a>
                </nav>

                <div class="tab-content" id="nav-tabContent">

                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        <div class="card tarjeta_tool text-secondary">
                            <div class="card-header bg-transparent text-primary">Detalles Primarios</div>
                                <div class="card-body">
                                    <h5 class="card-title">Martillo</h5>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item atributo_lista text-secondary">ID: <span className='valor_atributo'>M4</span></li>
                                        <li class="list-group-item atributo_lista text-secondary">Categoria: <span className='valor_atributo'>Manual</span></li>
                                        <li class="list-group-item atributo_lista text-secondary">Marca: <span className='valor_atributo'>Colima</span></li>
                                        <li class="list-group-item atributo_lista text-secondary">Modelo: <span className='valor_atributo'>25mm</span></li>
                                        <li class="list-group-item atributo_lista text-secondary">Fecha de Ingreso: <span className='valor_atributo'>2021-07-15</span></li>
                                        <li class="list-group-item atributo_lista text-secondary">Fecha de Baja: <span className='valor_atributo'>---</span></li>
                                    </ul>
                                </div>
                            <div class="card-footer bg-transparent"><li class="list-group-item atributo_lista">Cantidad Total: <span>38</span></li></div>
                        </div>    

                        <div class="card text-secondary last_oper">
                            <div class="card-header bg-transparent text-primary">Ultimas Operaciones</div>
                            <div class="card-body">
                                <Tablas
                                listado='transaccion'
                                estilo="tabla_info_tool"
                                columns={columns}
                                data={data}
                                />                                
                            </div>
                        </div>  

                        <div class="card tarjeta_img_tool">
                            <img src={ruta_img} class="card-img-top img_info" alt="card-img-top"/>
                            <div class="card-body">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item atributo_lista text-secondary">En prestamo: <span className='valor_atributo'>15</span></li>
                                    <li class="list-group-item atributo_lista text-secondary">En inventario: <span className='valor_atributo'>6</span></li>
                                </ul>
                            </div>
                        </div> 

                        <div class="card text-secondary proveedor">
                            <div class="card-header bg-transparent text-primary">Proveedores</div>
                            <div class="card-body">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item atributo_lista text-secondary">Distribuciones J&S: <span className='valor_atributo'>12345678</span></li>
                                    <li class="list-group-item atributo_lista text-secondary">FerreColombia: <span className='valor_atributo'>98765421</span></li>
                                </ul>                                                         
                            </div>
                        </div>   

                    </div>                    
                </div>

            </Modal>

            <BarraLateral/>
            <BarraSuperior/>

            <div className='modal' id="edit_t_modal">
                <div className="modal-dialog">
                    <EditarHerramienta/>         
                </div>
            </div>

            <div className='modal' id="ver_delete">
                <div className="modal-dialog">
                    <AlertBorra/>                       
                </div>
            </div> 
                        
        </div>
    );
}
export default InfoHerramienta;