const admin = document.getElementById('closeAdmin');

admin.addEventListener('click', () => {
    // Realiza una solicitud al servidor para destruir la sesión
    fetch('/api/products/pages/1', {
        method: 'POST', // Puedes utilizar el método POST para enviar una solicitud al servidor para destruir la sesión
    })
    .then(response => {
        if (response.ok) {
            // Si la solicitud fue exitosa, redirige a la página de inicio de sesión
            window.location.replace('/'); // Corrección aquí
        } else {
            console.error('Error al cerrar sesión');
        }
    })
    .catch(error => {
        console.error('Error al cerrar sesión:', error);
    });
});