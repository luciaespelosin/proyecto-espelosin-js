/* 
---- index ----
*/

//Variables
const carrito = document.getElementById('carrito');
const articulos = document.getElementById('lista-articulos');
const listaArticulos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

//Listeners
cargarEventListeners();

function cargarEventListeners() {
    // agregar al carrito
    articulos.addEventListener('click', comprarArticulo);
    // eliminar del carrito
    carrito.addEventListener('click', eliminarArticulo);
    // vaciar carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    // localStorage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}


function comprarArticulo(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const articulo = e.target.parentElement.parentElement
        leerDatosArticulo(articulo);
    }

}

function leerDatosArticulo(articulo){
    const infoArticulo = {
        imagen: articulo.querySelector('img').src,
        titulo: articulo.querySelector('h4').textContent,
        precio: articulo.querySelector('.precio span').textContent,
        id: articulo.querySelector('a').getAttribute('data-id')
    }
    
    insertarCarrito(infoArticulo);
}

function insertarCarrito(infoArticulo){
    // estructura card del carrito
    const row = document.createElement('tr');
    row.innerHTML=`
    <td><img width="100" src="${infoArticulo.imagen}" /></td>
    <td>${infoArticulo.titulo}</td>
    <td>${infoArticulo.precio}</td>
    <td><a href="#" class="borrar-articulo" data-id="${infoArticulo.id}">X<a/></td>
    `;

    listaArticulos.appendChild(row);
    guardarArticuloLocalStorage(infoArticulo);
}

function eliminarArticulo(e){
    e.preventDefault();
    
    let articulo, articuloId;
    if(e.target.classList.contains('borrar-articulo')){
        articulo = e.target.parentElement.parentElement;
        articuloId = articulo.querySelector('a').getAttribute('data-id');
        e.target.parentElement.parentElement.remove();
    }
    eliminarArticuloLocalStorage(articuloId);
}

function vaciarCarrito(){
    while(listaArticulos.firstChild){ 
        listaArticulos.removeChild(listaArticulos.firstChild)
    }
    vaciarLocalStorage();

    return false;
}

function guardarArticuloLocalStorage(articulo){
    let articulos;

    articulos = obtenerArticulosLocalStorage();

    articulos.push(articulo);
    
    localStorage.setItem('articulos', JSON.stringify(articulos))
}

function obtenerArticulosLocalStorage() {
    let articulosLS;
    
    // if(localStorage.getItem('articulos')===null){
    //     articulosLS = [];
    // }else{
    //     articulosLS = JSON.parse(localStorage.getItem('articulos'));
    // }
    localStorage.getItem('articulos')===null ? articulosLS = [] : articulosLS = JSON.parse(localStorage.getItem('articulos'))
    return articulosLS;
}

function leerLocalStorage () {
    let articulosLS;

    articulosLS = obtenerArticulosLocalStorage();

    articulosLS.forEach(function (articulo) {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img width="100" src="${articulo.imagen}" /></td>
        <td>${articulo.titulo}</td>
        <td>${articulo.precio}</td>
        <td><a href="#" class="borrar-articulo" data-id="${articulo.id}">X<a/></td>
        `;

        listaArticulos.appendChild(row);
    })
}

function eliminarArticuloLocalStorage(articuloId){
    let articulosLS;

    articulosLS = obtenerArticulosLocalStorage();

    articulosLS.forEach(function(articuloLS, index){
        // if (articuloLS.id === articuloId){
        //     articulosLS.splice(index, 1);
        // }

        articuloLS.id === articuloId && articulosLS.splice(index, 1)
    });

    localStorage.setItem('articulos', JSON.stringify(articulosLS));
}

function vaciarLocalStorage(){
    localStorage.clear();
}





