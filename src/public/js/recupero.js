const form = document.getElementById('recuperoForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);

    const obj = {};
    data.forEach((value, key) => obj[key] = value);

    const userEmail = localStorage.getItem('userEmail');
    obj.userEmail = userEmail;

    fetch('/api/recupero/clave-exitosa', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    .then(result => {
        if (result.status === 200) {
            alert('Clave restablecida');
            window.location.replace('/');
        }else if (result.status === 404) {
            alert("Credencial inválida o errónea");
        }else if (result.status === 202) {
            alert("Su clave fue usada anteriomente, elija otra");
        }
    })
    .catch(error => {
        // Manejar errores de las tres solicitudes
        console.error('Error en las solicitudes:', error);
    });

})