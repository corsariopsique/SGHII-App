const FormEditProveedor = async (id,data) => {
  
  const token = localStorage.getItem('token');
  const webServiceUrl = localStorage.getItem('webServiceUrl'); 
  
  try{
    const response = await fetch(`${webServiceUrl}proveedores/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`},
    body: JSON.stringify(data)
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
export default FormEditProveedor;