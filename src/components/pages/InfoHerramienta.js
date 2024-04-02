import './InfoHerramienta.css';
import {Modal, BarraLateral, BarraSuperior} from '../Index';

function InfoHerramienta(props){

    const btns = [
        {
            btnname:"Editar",
            icobtn:"EditarIcono",
            estilo:"btn-outline-secondary",
            tipo:"button",            
            d_toggle:"modal"            
        },

        {
            btnname:"Descargar",
            icobtn:"DownloadIcono",
            estilo:"btn-outline-secondary",
            tipo:"button",            
        }
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
                    <a class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Proveedores</a>
                    <a class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Historial</a>
                    <a class="nav-link disabled" id="nav-disabled-tab" data-bs-toggle="tab" href="#nav-disabled" role="tab" aria-controls="nav-disabled" tabindex="-1" aria-disabled="true"> </a>
                </nav>

                <div class="tab-content" id="nav-tabContent">

                    <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        <div class="card tarjeta_tool">
                            <div class="card-header bg-transparent text-info">Detalles Primarios</div>
                                <div class="card-body">
                                    <h5 class="card-title">Martillo</h5>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item atributo_lista">ID: <span className='valor_atributo'>M4</span></li>
                                        <li class="list-group-item atributo_lista">Categoria: <span className='valor_atributo'>Manual</span></li>
                                        <li class="list-group-item atributo_lista">Marca: <span className='valor_atributo'>Colima</span></li>
                                        <li class="list-group-item atributo_lista">Modelo: <span className='valor_atributo'>25mm</span></li>
                                        <li class="list-group-item atributo_lista">Fecha de Ingreso: <span className='valor_atributo'>2021-07-15</span></li>
                                        <li class="list-group-item atributo_lista">Fecha de Baja: <span className='valor_atributo'>---</span></li>
                                    </ul>
                                </div>
                                <div class="card-footer bg-transparent"><li class="list-group-item atributo_lista">Cantidad Total: <span>38</span></li></div>
                            </div>                           
                        </div>

                    <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, natus sed soluta necessitatibus tempore aspernatur? Praesentium, odit explicabo distinctio dolore adipisci officia iure, ut magnam optio aliquam at similique veritatis.</div>
                    <div class="tab-pane fade" id="nav-disabled" role="tabpanel" aria-labelledby="nav-disabled-tab">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium minima repellat incidunt facilis obcaecati blanditiis corrupti ad officia doloribus ullam sapiente ipsum, nemo a, excepturi voluptatem voluptatibus velit eum dignissimos ut, nam tempora? Reiciendis illo itaque veritatis eligendi fuga, mollitia ratione totam veniam esse in.</div>
                </div>

            </Modal>

            <BarraLateral/>
            <BarraSuperior/>
        </div>
    );
}
export default InfoHerramienta;