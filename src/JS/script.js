document.addEventListener("DOMContentLoaded", () => {
    
    // Seleccionamos nuestro formulario por su id
    const formRegistro = document.getElementById("formRegistro");

    // Escuchamos el evento 'submit' cuando el usuario presiona el boton de enviar
    formRegistro.addEventListener("submit", (evento) => {
        
        // Evitamos que la pagina se recargue automaticamente para poder validar y guardar datos
        evento.preventDefault();
        // Obtenemos los valores que el usuario escribio o selecciono en los campos
        const nickname = document.getElementById("nickname").value.trim();
        const correo = document.getElementById("correo").value.trim();
        
        // Obtenemos el campus seleccionado del button que tenga la propiedad checked
        const campusSeleccionado = document.querySelector('input[name="campus"]:checked');

        // Validacion sencilla: revisamos si falta el campus
        if (!campusSeleccionado) {
            alert("Por favor selecciona un campus.");
            return;
        }
        const campus = campusSeleccionado.value;

        // Capturamos todos los checkboxes de intereses que hayan sido marcados
        const checkboxesIntereses = document.querySelectorAll('input[name="intereses[]"]:checked');
        let listaIntereses = [];
        
        // Recorremos los checkboxes marcados para guardar sus valores en un arreglo
        checkboxesIntereses.forEach((checkbox) => {
            listaIntereses.push(checkbox.value);
        });

        // Guardamos la informacion en el localStorage del navegador como piden las instrucciones
        localStorage.setItem("user_nickname", nickname);
        localStorage.setItem("user_correo", correo);
        localStorage.setItem("user_campus", campus);
        // Convertimos el arreglo de intereses a texto JSON para poder guardarlo
        localStorage.setItem("user_intereses", JSON.stringify(listaIntereses));

        // Mensaje de prueba en consola para verificar que todo se guardo bien
        console.log("Datos guardados en localStorage correctamente.");

        // Como el formulario tiene un action hacia PHP, despues de guardar en localStorage dejamos que el formulario continue su envio hacia el servidor (XAMPP).
        // Quitamos temporalmente el preventDefault enviando el formulario de manera nativa:
        formRegistro.submit();
    });

});