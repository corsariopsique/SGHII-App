export default function FormAddKit(props) {  

  fetch('http://localhost:4000/kits', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(props)
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

