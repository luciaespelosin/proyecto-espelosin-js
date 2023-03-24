/* 
---- contacto ----
*/

// variables
const botonForm = document.getElementById("botonForm");
const formulario = document.getElementById("form");
const campo = document.getElementById("campo")

// Listeners
botonForm.addEventListener("click", (alertaBoton))

function alertaBoton() {
    Swal.fire({
        title: 'Estas seguro de enviar el formulario?',
        text: "Su solicitud sera enviada, aunque puede realizar otra.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, estoy seguro!'
    }).then(async (result) => {
        if (result.isConfirmed) {
        setTimeout( async () =>{
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-right',
                iconColor: 'white',
                customClass: {
                popup: 'colored-toast'
            },
                showConfirmButton: false,
                timerProgressBar: true
            })
            await Toast.fire({
                title: 'Enviando mensaje'
            }, 1000)
        })
        setTimeout( () =>{
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Su mensaje ha sido enviado!',
                showConfirmButton: false,
              })
        }, 1500)
                
        }
    })
}