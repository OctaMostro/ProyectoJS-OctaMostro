 
 
document.addEventListener("DOMContentLoaded", function() {
    const AdminMail = "octavioarias622@gmail.com"; 
    const AdminPassword = "a"; 
    


    const loginForm = document.getElementById("loginForm");

    loginForm.onclick = (e) => {
        e.preventDefault();

        const emailform = document.getElementById("email");
        const passwordform = document.getElementById("password");
        const EmailIngresado = emailform.value;
        const PasswordIngresada = passwordform.value;
        
        if (EmailIngresado === AdminMail && PasswordIngresada === AdminPassword) {
            alert("Inicio de sesión exitoso");
            localStorage.setItem('admin', "true");
            window.location.href = "./index.html"; 
        } else {
            alert("Credenciales incorrectas. Intente nuevamente.");
        }
  
        emailInput.value = "";
        passwordInput.value = "";

    }
});


