const FormAddKit = async (props) => {  
  try{
    const response = await fetch('http://localhost:8081/api/kits', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(props)
  })
  const result = response.ok;  
    console.log('Respuesta del servidor:', result);
    return result;
    // Hacer algo con la respuesta del servidor  
  }
  catch(error) {
    console.error('Error al enviar la solicitud:', error);
  };   
}
export default FormAddKit;

