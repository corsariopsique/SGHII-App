const FormAddToolKit = async (id,tools) => {
  try{
    const response = await fetch(`http://localhost:8081/api/kits/${id}/herramientas`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(tools)
  })
  const result = response.ok;
    console.log('Respuesta del servidor:', result);
    return result;
  }
  catch(error){
    console.error('Error al enviar la solicitud:', error);
  };  
}
export default FormAddToolKit;