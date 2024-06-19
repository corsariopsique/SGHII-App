export default function FormAddToolKit(id,tools) {  

    fetch(`http://localhost:8081/api/kits/${id}/herramientas`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(tools)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Respuesta del servidor:', data);
      // Hacer algo con la respuesta del servidor      
    })
    .catch(error => {
      console.error('Error al enviar la solicitud:', error);
    });   
  }