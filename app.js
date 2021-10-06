// Array de productos4
const productos = {
  producto1: {
    nombre: 'Darth Vader',
    precio: '4.50',
    descripcion: 'Anakin Skywalker, más tarde Darth Vader, es el personaje ficticio central de la famosa saga de Star Wars del director George Lucas. La saga se centra en su conocimiento de la Fuerza y su caída al lado Oscuro.',
    srcImg: 'https://juguetesdecoleccion.com/wp-content/uploads/muneco-darth-vader-star-wars-funko-1024x745.jpg'
  },
  producto2: {
    nombre: 'Obi-Wan Kenobi',
    precio: '4.00',
    descripcion: 'Fue un hombre humano sensible a la Fuerza y un legendario Maestro Jedi y miembro del Alto Consejo Jedi durante la Caída de la República.',
    srcImg: 'https://images-na.ssl-images-amazon.com/images/I/61MDv8vAIpL.__AC_SX300_SY300_QL70_ML2_.jpg'
  },
  producto3: {
    nombre: 'Luke Skywalker',
    precio: '8.50',
    descripcion: 'Fue un humano sensible a la Fuerza y un Maestro Jedi quien, junto a su hermana gemela, la Princesa Leia Organa, luchó en contra del gobierno.',
    srcImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5O2iSvStXSm5tc66La02jx_d_sCVKf4omWw&usqp=CAU'
  },
  producto4: {
    nombre: 'Han Solo',
    precio: '5.50',
    descripcion: 'Han Solo era un hombre humano contrabandista que se convirtió en un líder en la Alianza para Restaurar la República',
    srcImg: 'https://s.fenicio.app/f/xuruuy/productos/star-wars-han-solo-wobblres-full_460x460_1588186451_66f.jpg'
  },
  producto5: {
    nombre: 'K-3P0',
    precio: '5.70',
    descripcion: 'K-3PO era un droide de protocolo serie C-3PO en tiempos de la Antigua República y del Imperio.',
    srcImg: 'https://e7.pngegg.com/pngimages/807/404/png-clipart-c-3po-funko-luke-skywalker-bodhi-rook-action-toy-figures-pop-star-action-toy-figures-toy.png'
  },
  producto6: {
    nombre: 'Maestro Yoda',
    precio: '5.60',
    descripcion: 'Yoda fue un miembro masculino de una especie misteriosa. Era un reverenciado Maestro Jedi que sirvió como Gran Maestro de la Orden Jedi',
    srcImg: 'https://e7.pngegg.com/pngimages/201/496/png-clipart-yoda-luke-skywalker-r2-d2-dagobah-funko-pop-star-fictional-character-anakin-skywalker-thumbnail.png'
  },
  producto7: {
    nombre: 'General Grievous',
    precio: '4.90',
    descripcion: 'Fue el líder del ejército de droides más poderoso que la galaxia haya visto, fue un señor de la guerra kaleesh que sirvió como oficial al mando en las fuerzas armadas de la Confederación',
    srcImg: 'https://cdn.idealo.com/folder/Product/5320/4/5320487/s11_produktbild_gross/funko-star-wars-bobble-head-general-grievous-pop.jpg'
  },
  producto8: {
    nombre: 'The Mandalorian',
    precio: '7.50',
    descripcion: 'Mando es un pistolero solitario y cazarrecompensas que se abre paso a través de las fronteras más remotas de la galaxia, lejos de la jurisdicción de la Nueva República.',
    srcImg: 'https://www.fuikaomar.es/39102-tm_thickbox_default/funko-pop-star-wars-kylo-ren-308.jpg'
  }
}
// Se captura el template de los productos
const templateProd = document.getElementById('template-prod').content
const contenedorProd = document.querySelector('.contenedor-productos')
const fragment = document.createDocumentFragment()


// TODO LO RELACIONADO A AGREGAR LOS PRODUCTOS AL DOM
Object.values(productos).forEach( producto => {
  templateProd.querySelector('.div-info .nombre-prod').textContent = producto.nombre
  templateProd.querySelector('.div-precio-boton .precio').textContent = producto.precio
  templateProd.querySelector('.div-info .descripcion-prod').textContent = producto.descripcion
  templateProd.querySelector('.contenedor-img img').setAttribute('alt', producto.nombre)
  templateProd.querySelector('.contenedor-img img').setAttribute('src', producto.srcImg)
  const clone = templateProd.cloneNode(true)
  fragment.appendChild(clone)
})
contenedorProd.appendChild(fragment)

// TODO LO RELACIONADO AL CARRITO DE COMPRA
let carrito = {}
const templateTabla = document.getElementById('agregar-producto-al-carro').content
const tbodyCarrito = document.getElementById('carrito-body')
const fragmentTabla = document.createDocumentFragment()
const templateFoot = document.getElementById('tfooter').content
const tfootCarrito = document.getElementById('footer')

contenedorProd.addEventListener('click', e => {
  
  if(e.target.textContent === "Agregar") {
    setCarrito(e.target.parentElement.parentElement)
  }
  e.stopPropagation();
})
const setCarrito = e => {
  const pivoteCarrito = {
    nombre: e.querySelector('.div-info .nombre-prod').textContent,
    precio: e.querySelector('.div-precio-boton .precio').textContent,
    cantidad: 1
  }
  if(carrito.hasOwnProperty(pivoteCarrito.nombre)){
    carrito[pivoteCarrito.nombre].cantidad += 1
  } else {
    carrito[pivoteCarrito.nombre] = {...pivoteCarrito}
  }
  pintarTabla(carrito)
}

const pintarTabla = objetoCarrito => {
  Object.values(objetoCarrito).forEach( objeto => {
    const cloneTabla = templateTabla.cloneNode(true)
    cloneTabla.getElementById('producto').textContent = objeto.nombre
    cloneTabla.getElementById('cant').textContent = objeto.cantidad
    cloneTabla.getElementById('precio-uni').textContent = objeto.precio
    let precioTotal = parseFloat(objeto.precio) * objeto.cantidad
    cloneTabla.getElementById('precio-total-prod').textContent = precioTotal.toFixed(2)
    fragmentTabla.appendChild(cloneTabla)
  })
  tbodyCarrito.innerHTML = ''
  tbodyCarrito.appendChild(fragmentTabla)
  pintarFooter()
}
const pintarFooter = () => {
  tfootCarrito.innerHTML = ''
  if(Object.keys(carrito).length === 0) {
    tfootCarrito.innerHTML = '<tr><td colspan = 4>¡No hay ningun elemento en el carrito!</td></tr>'
  } else {
    const total = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + (cantidad * precio),0)
    templateFoot.getElementById('total-a-pagar').textContent = total.toFixed(2)
    const cloneFoot = templateFoot.cloneNode(true)
    fragment.appendChild(cloneFoot)
    tfootCarrito.appendChild(fragment)
    //Boton Vaciar carrito
    const botonVaciar = document.getElementById('vaciar-tabla')
botonVaciar.addEventListener('click', () => {
      carrito = {}
      pintarTabla(carrito)
      pintarFooter()
    })
    
    //Botones aumentar y disminuir cantidades
    
  }
}
tbodyCarrito.addEventListener('click', e => {
  
  if(e.target.classList.contains('button')) {
    aumentarDisminuir(e.target)
  }
})
const aumentarDisminuir = boton => {
  if(boton.textContent === '+'){
    const indicador = boton.parentElement.parentElement.firstElementChild.textContent
    Object.values(carrito).forEach( elemento => {
      if(elemento.nombre === indicador) {
      carrito[elemento.nombre].cantidad++  
      }
    })
  }
  if(boton.textContent === '-') {
    const indicador = boton.parentElement.parentElement.firstElementChild.textContent
    Object.values(carrito).forEach( elemento => {
      if(elemento.nombre === indicador) {
      carrito[elemento.nombre].cantidad--
        if(carrito[elemento.nombre].cantidad === 0) {
          delete carrito[elemento.nombre]
        }
      }
    })
  }
  pintarTabla(carrito)
  pintarFooter()
}
    //Agrego algo de JQuery

$("#texto")
  .animate({
      "opacity":0,
      "font-size":"70px"
      },2000)
  .animate({
      "opacity":1,
      "font-size":"40px"
      },2000)

$.get("https://swapi.dev/api/people/1/",(res)=>{

  $(".masVendi").append(`
    <h3>Jueguete mas vendido</h3> <h2>${res.name}</h2>

   `)
})