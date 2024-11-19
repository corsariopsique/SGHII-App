
const validatorPassword = (e) => {

    const newPass = document.getElementById('newPassword');
    const btnSubmit = document.getElementById('changePasswordSubmit');
    const message = document.getElementById('message');

    if(e.target.value === newPass.value){
        if(e.target.value === '' && newPass.value === ''){
            message.textContent = "La contraseña no puede estar vacía.";
            message.className = "text-danger";
            btnSubmit.disabled = true;
        }else{
            message.textContent = "Las contraseñas coinciden";
            message.className = "text-success";
            btnSubmit.disabled = false;
        }  

    }else{
        message.textContent = "Las contraseñas no coinciden.";
        message.className = "text-danger";
        btnSubmit.disabled = true;
    }
}
export default validatorPassword;