const FormAddToolKit = async (id,tools) => {

  const token = localStorage.getItem('token'); 
  const webServiceUrl = localStorage.getItem('webServiceUrl');   

  try{
    const response = await fetch(`${webServiceUrl}kits/${id}/herramientas`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`},
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