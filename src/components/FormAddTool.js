export default async function FormAddTool(props) {   

  try{
    const response = await fetch('http://localhost:8081/api/herramientas', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(props)
    });
    
    const result = await response.json();
    console.log('Respuesta del servidor:', result);
    return response.ok;

  } catch(error) {
    console.error('Error al enviar la solicitud:', error);        
  }    
}


