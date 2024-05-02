import { useParams } from "react-router";
const FormEditTool = async ({props}) => {

  const urlData = `http://localhost:4000/tools/${useParams().toolId}`;
    
  try {
      const response = fetch(urlData, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(props),
      });
      if (!response.ok) {
        throw new Error('Fallo la actualizacion del registro');
      }
      console.log('Actualizacion de registro se realizo correctamente');

  } catch (error) {
      console.error(error);
  }
}

export default FormEditTool;

