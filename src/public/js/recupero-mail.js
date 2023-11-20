const form = document.getElementById('recuperoForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);

    localStorage.setItem('userEmail', obj.mailDeRecupero);

    fetch('/api/recupero/cambio-de-clave', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    .then(result => {
        if (result.status === 200) {
            alert('Mail enviado con éxito');
            window.location.replace('/');
            
            // Realizar el segundo fetch dentro del bloque then del primer fetch
            return fetch('/api/email');
        } else if (result.status === 404) {
            alert("Credencial inválida o errónea");
        }
    })
      
    .then(result => {
        if (result.status === 200) {
            console.log('Solicitud 2 exitosa');
        } else {
            console.log('Solicitud 2 CON ERROR');
        }
            
    })
    
    
    .catch(error => {
        // Manejar errores de las tres solicitudes
        console.error('Error en las solicitudes:', error);
    });
});
