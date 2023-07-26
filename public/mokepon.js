
const seleccionarMokepon = document.getElementById("seleccionarMokepon")  //llama a a la seccion de seleccion del html
    seleccionarMokepon.style.display = "block"      //mantiene la pantalla de seleccion activa

const seleccion = document.getElementById("mokeponseleccionado")        //llama al boton
    seleccion.addEventListener("click", mokeponSeleccionado)        //funcion de evento del boton

    //funcion botonTierra

const botonReinicio = document.getElementById("botonReinicio")      //llama al boton para reiniciiar
    botonReinicio.addEventListener("click", reiniciarJuego)         //evento del boton Reinicio

const reiniciar = document.getElementById("reinicio")           //llama a la seccion para que aparezca el boton
    reiniciar.style.display = "none"        //style.display sirve patra ocultar las section con "none" para que desaparezca y "block para que se quede"

joinGame()

function joinGame() {
    fetch("https://mokepon-qqxx.onrender.com/join")
        .then(function (res) {
            console.log(res)
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        playerId = respuesta
                    })
            }
        })
}

const sectionAtaque = document.getElementById("selecionarAtaque")  //seccion de batalla
    sectionAtaque.style.display = "none"            //hace que aun no aparezca la battalla

const textoEnemigo = document.getElementById("mokeponEnemigo")  //llama los elementos del html
const textoVidaMokepon = document.getElementById("vidasDelMokepon") //
const textoVidaEnemigo = document.getElementById("vidaEnemigo") //
const sectionParrafo = document.getElementById("result")    //
const playerAttack = document.getElementById("playerAttack")    //
const enemyAttack = document.getElementById("enemyAttack")  //
const reiniciarPartida = document.getElementById("reinicio")     
const textoMascota = document.getElementById("mokeponseleccionado")     //
const textoVida = document.getElementById("mokeponJugador")     //

const mokeponContainer = document.getElementById("mokeponContainer")  //llama al elemento donde estan las targetas mokepones en el html
const mokeponButtonAttacks = document.getElementById("buttonAttacks")

const sectionOfMap = document.getElementById("map")
const map = document.getElementById("mapMokepon")


//variables globales 
vidasMokepon = 3
vidaEnemigo = 3
let ataqueJugador
let mokeponJugador
let enemigo = []
let mokepon
let mokeponDelEnemigo
let mokeponJugadorObjeto
let Ajolotex     
let Cangrenauro  
let Dragonar    
let Ratigueya  
let Capipepo     
let Hipodogue 
let bontonFuego
let botonAgua   
let botones = []
let botonTierra
let ataquePlayer = []
let ataquesMokeponEnemigo
let textAtaqueJugador
let textAtaqueEnemigo
let victoriasMokepon = 0
let victoriasEnemigo = 0
let lienzo = map.getContext("2d")
let intervalo
let mapBackground = new Image()
mapBackground.src = "./pictures/mokemap.png"
let widthSearch = window.innerWidth - 20
let heightSearch
const maxWidth = 800
let playerId = null
let mokeponesEnemys = []
let enemyId = null
let tecla

if(widthSearch > maxWidth) {
    widthSearch = maxWidth - 20
}

heightSearch = widthSearch * 600/800

map.width = widthSearch
map.height = heightSearch

var move = {
    LEFT: 65,
    RIGHT: 68,
    DOWN: 83,
    UP: 87
  };

     //llama boton tierra
 
class Mokepon {     //crea una clase con los objetos de los mokepones
    constructor(name, type, picture, life, pictureOnMap, id = null) {
        this.id = id
        this.name = name;
        this.type = type;
        this.picture = picture;
        this.life = life;
        this.ataques = [] ;
        this.width = widthSearch * 80/800;
        this.height = heightSearch * 80/600;
        this.x = aleatorio(0, map.width - this.width);
        this.y = aleatorio(0, heightSearch - this.height);
        this.mapMokepon = new Image();
        this.mapMokepon.src = pictureOnMap;
        this.speedX = 0;
        this.speedY = 0;
    }

     drawMokepon() {
        lienzo.drawImage(
            this.mapMokepon,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}

let mokepones = []  //crea el array donde se van a almacenar los mokepones

let mokeponesOptions

let mokeponesAtaquesM


let ajolotex = new Mokepon("Ajolotex", "Agua", "./pictures/ajolotex.png", 150, "./pictures/AjolotexOnMap.png")      //agrega los objetos a la clase

let cangrenauro = new Mokepon("Cangrenauro", "Agua/Tierra", "./pictures/cangrejo.png", 80, "./pictures/cangrejoOnMap.png")     //

let dragonar = new Mokepon("Dragonar", "Fuego", "./pictures/dragonar.png", 200, "./pictures/dragonarOnMap.png")      //

let ratigueya = new Mokepon("Ratigueya", "Tierra/Fuego", "./pictures/rata.png", 120, "./pictures/rataOnMap.png")        //

let capipepo = new Mokepon("Capipepo", "Tierra", "./pictures/capibara.png", 70, "./pictures/capibaraOnMap.png")   //

let hipodogue = new Mokepon("Hipodogue", "Fuego/Agua", "./pictures/perro.png", 85, "./pictures/hipodogeOnMap.png")  

const ATAQUES_AJOLOTEX = [    
    {name: "splash", id: "agua"},//
    {name: "tsunami", id: "agua"},//
    {name: "fire ball", id: "fuego"},//
    {name: "terreno", id: "tierra"},
    {name: "jacinto", id: "fuego"}
]

ajolotex.ataques.push(...ATAQUES_AJOLOTEX)
const ATAQUES_CANGRENAURO = [  
    {name: "splash", id: "agua"},//
    {name: "wet", id: "agua"},//
    {name: "coconut", id: "tierra"},
    {name: "warm", id: "fuego"},//
    {name: "terreno", id: "tierra"}
]

cangrenauro.ataques.push(...ATAQUES_CANGRENAURO)
const ATAQUES_DRAGONAR = [  
    {name: "fire ball", id: "fuego"},//
    {name: "inundacion", id: "agua"},//
    {name: "enterrado", id: "tierra"},
    {name: "flame", id: "fuego"},//
    {name: "terreno", id: "tierra"}
]

dragonar.ataques.push(...ATAQUES_DRAGONAR) 
const ATAQUES_RATIGUEYA = [  
    {name: "bury", id: "tierra"},
    {name: "splash", id: "agua"},//
    {name: "hibernate", id: "tierra"},
    {name: "warm", id: "fuego"},//
    {name: "terreno", id: "tierra"}
]

ratigueya.ataques.push(...ATAQUES_RATIGUEYA) 

const ATAQUES_CAPIPEPO = [  
    {name: "splash", id: "agua"},//
    {name: "tsumani", id: "agua"},//
    {name: "plant", id: "tierra"},
    {name: "fire ball", id: "fuego"},//
    {name: "terreno", id: "tierra"}
]

capipepo.ataques.push(...ATAQUES_CAPIPEPO) 

const ATAQUES_HIPODOGUE = [  
    {name: "below zero", id: "agua"},//
    {name: "tsunami", id: "agua"},//
    {name: "flare", id: "fuego"},//
    {name: "coconut", id: "tierra"},
    {name: "terreno", id: "tierra"}
]

hipodogue.ataques.push(...ATAQUES_HIPODOGUE) 


mokepones.push(ajolotex, cangrenauro, dragonar, ratigueya, capipepo, hipodogue) //agrega los objetos al array

mokepones.forEach(Mokepon => {    
    sectionOfMap.style.display = "none"
      //recorre el array
    mokeponesOptions = `                                            
    <input name="Mokepones" id=${Mokepon.name} type="radio">        
    <label class="TargetOfMokepon" for=${Mokepon.name}> 
        <img src=${Mokepon.picture} alt=${Mokepon.name}>
        <input name="Mokepones" id=${Mokepon.name} type="radio"
        <p>  ${Mokepon.name} Tipo: ${Mokepon.type}</p> 

    </label><br>`;      //crea nuestras targetas  de html desde js de forma "automatica" con los objetos ya creados

    mokeponContainer.innerHTML += mokeponesOptions      //agrega directamente a nuestro html

     Ajolotex = document.getElementById("Ajolotex")    
     Cangrenauro = document.getElementById("Cangrenauro")  
     Dragonar = document.getElementById("Dragonar")    
     Ratigueya = document.getElementById("Ratigueya")  
     Capipepo = document.getElementById("Capipepo")    
     Hipodogue = document.getElementById("Hipodogue") 
});




//funcion de condicionales para la eleccion de los mokepones
function mokeponSeleccionado() { 
    //constantes del llamado de los id 
    //variable para nombre del mokepon
    if (Ajolotex.checked === true) {
        textoVida.innerHTML = Ajolotex.id
        mokeponJugador = Ajolotex.id
        display()
    }
    else if (Cangrenauro.checked === true) {
        textoVida.innerHTML = Cangrenauro.id
        mokeponJugador = Cangrenauro.id
        display()
    }
    else if(Dragonar.checked === true) {
        textoVida.innerHTML = Dragonar.id
        mokeponJugador = Dragonar.id
        display()
     }
    else if(Ratigueya.checked === true) {
        textoVida.innerHTML = Ratigueya.id
        mokeponJugador = Ratigueya.id
        display()
    }
    else if(Capipepo.checked === true) {
        textoVida.innerHTML = Capipepo.id
        mokeponJugador = Capipepo.id
        display()
   }
    else if(Hipodogue.checked === true) {
        textoVida.innerHTML = Hipodogue.id
        mokeponJugador = Hipodogue.id
        display()
    }
    else {
        alert("Selecciona un Mokepon")
        seleccionarMokepon.style.display = "block"
    }
    //llamada de funcion de la eleccion del mokepon del enemigo, despues de que jugador elija
    
    mokeponselection(mokeponJugador)
    mokeponAtaqueEnemigo(mokeponJugador)
}

function mokeponselection(mokeponJugador) {
    fetch("https://mokepon-qqxx.onrender.com/playmokepon/" + playerId, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mokeponJugador
        })
    })
}

//funcion para ocultar nuestras secciones
function display() {
    sectionOfMap.style.display = "flex"
    chargemap()
    seleccionarMokepon.style.display = "none"
    //
    Ajolotex.disabled = true
    Cangrenauro.disabled = true
    Dragonar.disabled = true
    Ratigueya.disabled = true
    Capipepo.disabled = true
    Hipodogue.disabled = true
}

function Atacar(ataquesMokepones) {
    ataquesMokepones.forEach((ataques) => { 
             //recorre el array
        mokeponesAtaquesM = `                                            
        <button id=${ataques.id} class="buttonAttack BAtaque">${ataques.name}</button>`;      //crea nuestras targetas  de html desde js de forma "automatica" con los objetos ya creados
      
        mokeponButtonAttacks.innerHTML += mokeponesAtaquesM      //agrega directamente a nuestro html

        bontonFuego = document.getElementById("fuego")
        botonAgua = document.getElementById("agua")
        botonTierra = document.getElementById("tierra")
        botones = document.querySelectorAll(".BAtaque") //queryselectorall sirvee para tomar todos los elementos de algo, no se hace co id debido a que id solo deja tener 1
    });
        bontonFuego.addEventListener("click", ataqueFuego);
        botonAgua.addEventListener("click", ataqueAgua);
        botonTierra.addEventListener("click", ataqueDeTierra);
 }
    // funcion eleccion del mokepon del enemigo aleatoriamente
    function mokeponAtaqueEnemigo(mokeponJugador) {
        let ataquesMokepones
        for (let i = 0; i < mokepones.length; i++) {
            if (mokeponJugador == mokepones[i].name) {
                ataquesMokepones = mokepones[i].ataques
            }
            
        }
        Atacar(ataquesMokepones)
    }
    //variables de ataque jugador
 
 

 function secuenciaDeAtaques() {
    botones.forEach((boton) => { 
        boton.addEventListener("click", (e) => {
            if ((e.target.textContent === "splash") || (e.target.textContent === "tsunami") || (e.target.textContent === "wet") || (e.target.textContent === "inundacion") || (e.target.textContent === "below zero")) {
                ataquePlayer.push("AGUA 💧")
                console.log(ataquePlayer)
                boton.style.background = "#112f58"
                //disabled sirve para desactivar funciones del html y asise hace desde el js
                boton.disabled = true
                
                
            }
            else if((e.target.textContent === "fire ball") || (e.target.textContent === "warm") || (e.target.textContent === "flare") || (e.target.textContent === "flame") || (e.target.textContent === "jacinto")) {
                ataquePlayer.push("FUEGO 🔥")
                console.log(ataquePlayer)
                boton.style.background = "#112f58"
                boton.disabled = true
                
            }
            else {
                ataquePlayer.push("TIERRA 🌱")
                console.log(ataquePlayer)
                boton.style.background = "#112f58"
                boton.disabled = true
            }
            if(ataquePlayer.length === 5) {
            sendAttacks()
            }
        })
        
    })

 }
 

 function sendAttacks () {
    fetch("https://mokepon-qqxx.onrender.com/playmokepon/" + playerId + "/ataques", {
        method: "post",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataquePlayer
        }),
    })
    intervalo = setInterval(getAttacks, 1000)
 }
 function getAttacks() {
    fetch("https://mokepon-qqxx.onrender.com/playmokepon/" + enemyId + "/ataques")
        .then(function (res) {
            if (res.ok) {
                res.json()
                .then(function ({ataques}) {
                    if(ataques.length === 5 ) {
                        enemigo = ataques
                        combateMokepones()
                    }
                })
            }
        })
 }

 function mokeponEnemigo(enemy) { 
    //llamado del id
//variable para mokepones aleatorios
    textoEnemigo.innerHTML = enemy.name
    ataquesMokeponEnemigo = enemy.ataques
    secuenciaDeAtaques()
    
}

 function ataqueFuego() {
    ataqueJugador = "FUEGO 🔥"
      //
 }
function ataqueAgua() {
    ataqueJugador = "AGUA 💧"
      //
}
function ataqueDeTierra() {
    ataqueJugador  = "TIERRA 🌱"
      //llama la funcion del ataque enemigo
}


    //variables de ataque enemigo
function ataqueEnemigo() {
    let ataque = aleatorio(0, ataquesMokeponEnemigo.length - 1)
    if(ataque === 0  || ataque === 1) {
        enemigo.push("FUEGO 🔥")  
    }
    else if(ataque === 2 || ataque === 3) {
        enemigo.push("AGUA 💧")
    }
    else {
        enemigo.push("TIERRA 🌱")
    }
    console.log(enemigo)
    inicioPeleaMokepones()

}

function inicioPeleaMokepones() {
    
    if(ataquePlayer.length === 5){
        combateMokepones()
    }
}

function varTextMokepones(textPlayer, textEnemy) {
    textAtaqueJugador = ataquePlayer[textPlayer]
    textAtaqueEnemigo = enemigo[textEnemy]
}

 //funcion parametros de victoria
function combateMokepones() {
        clearInterval(intervalo)

    for(let mok = 0; mok < ataquePlayer.length; mok++){
        if(ataquePlayer[mok] === enemigo[mok]) {
            varTextMokepones(mok, mok)
            mensajeAtaque("Empataste esta ronda")//
        }
        else  if(ataquePlayer[mok] === "FUEGO 🔥" &&  enemigo[mok] === "TIERRA 🌱" || ataquePlayer[mok] === "AGUA 💧" &&  enemigo[mok] === "FUEGO 🔥" || ataquePlayer[mok] === "TIERRA 🌱" &&  enemigo[mok] === "AGUA 💧") {
            varTextMokepones(mok, mok)
            mensajeAtaque("Ganaste esta ronda") //llama a la funcion cambiandole su propio parametro
            victoriasMokepon++
            textoVidaMokepon.innerHTML = victoriasMokepon
        }
        else {
            varTextMokepones(mok, mok)
            mensajeAtaque("Perdiste esta ronda")
            victoriasEnemigo++
            textoVidaEnemigo.innerHTML = victoriasEnemigo
        }
    }
    cicloVidas()
}


function cicloVidas() {
    if(victoriasMokepon > victoriasEnemigo) {
        mensajeFinal("Ganaste esta ballata Mokepon!!")
        reiniciarPartida.style.display = "block"
    }
    else if(victoriasEnemigo > victoriasMokepon) {
        mensajeFinal("Lo siento, perdiste bro")
        reiniciarPartida.style.display = "block"
    }
    else{
        mensajeFinal("Empataste ma broda")
        reiniciarPartida.style.display = "block"
    }
}
//mensaje de victorias, empates o derrotas
function mensajeAtaque(combate) {
    let newPlayerAttack = document.createElement("p")
    let newEnemyAttack = document.createElement("p")

    sectionParrafo.innerHTML = combate
    newPlayerAttack.innerHTML = textAtaqueJugador
    newEnemyAttack.innerHTML = textAtaqueEnemigo

    enemyAttack.appendChild(newEnemyAttack)
    playerAttack.appendChild(newPlayerAttack)
}
function mensajeFinal(final) {
    sectionParrafo.innerHTML = final

}
function reiniciarJuego() {
    location.reload()
    reload() 
}
function reload() {
    lienzo.clearRect(0, 0, map.width, map.height)
    lienzo.drawImage(
        mapBackground,
        0,
        0,
        map.width,
        map.height
    )
}

function drawMap() { 
    mokeponJugadorObjeto.x += mokeponJugadorObjeto.speedX;
    mokeponJugadorObjeto.y += mokeponJugadorObjeto.speedY;
    reload() 
    mokeponJugadorObjeto.drawMokepon()
    sendposition(mokeponJugadorObjeto.x, mokeponJugadorObjeto.y)

    mokeponesEnemys.forEach(function (mokepon) {
        colision(mokepon)
        mokepon.drawMokepon()
        
    })

}

function sendposition(x, y) {
    fetch(`https://mokepon-qqxx.onrender.com/playmokepon/${playerId}/position`, {
        method: "post",
        headers:  {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x, 
            y
        })
    })
    .then(function (res) {
            if(res.ok) {
                res.json()
                    .then(function ({enemys}) {
                        console.log(enemys)
                        mokeponesEnemys = enemys.map(function (enemy) {
                            const mokeponName = enemy.mokepon.name || ""
                            let mokeponEnemy = null
                            if (mokeponName === "Ajolotex") {
                                mokeponEnemy = new Mokepon("Ajolotex", "Agua", "./pictures/ajolotex.png", 150, "./pictures/AjolotexOnMap.png", enemy.id)
                            }
                            else if (mokeponName === "Cangrenauro") {
                                mokeponEnemy = new Mokepon("Cangrenauro", "Agua/Tierra", "./pictures/cangrejo.png", 80, "./pictures/cangrejoOnMap.png", enemy.id)
                            }
                            else if(mokeponName === "Dragonar") {
                                mokeponEnemy = new Mokepon("Dragonar", "Fuego", "./pictures/dragonar.png", 200, "./pictures/dragonarOnMap.png", enemy.id)
                            }
                            else if(mokeponName === "Ratigueya") {
                                mokeponEnemy = new Mokepon("Ratigueya", "Tierra/Fuego", "./pictures/rata.png", 120, "./pictures/rataOnMap.png", enemy.id)  
                            }
                            else if(mokeponName === "Capipepo") {
                                mokeponEnemy = new Mokepon("Capipepo", "Tierra", "./pictures/capibara.png", 70, "./pictures/capibaraOnMap.png", enemy.id)
                            }
                            else {
                                mokeponEnemy = new Mokepon("Hipodogue", "Fuego/Agua", "./pictures/perro.png", 85, "./pictures/hipodogeOnMap.png", enemy.id)
                            }
                            mokeponEnemy.x = enemy.x
                            mokeponEnemy.y = enemy.y
                            enemyId = enemy.id
                            return mokeponEnemy
                        })
                    })
            }
    })
}

function stopMoving(){
    mokeponJugadorObjeto.speedX = 0
    mokeponJugadorObjeto.speedY = 0
}
//function moveWithMouse(evento) {}

function movimientoMokepon(evento) {
    let tecla = evento.keyCode;
    switch (tecla) {
        case move.UP:
            mokeponJugadorObjeto.speedY = -5
            drawMap()
            console.log("up")
            break
        case move.DOWN:
            mokeponJugadorObjeto.speedY = 5
            drawMap()
            console.log("down")
            break
        case move.LEFT:
            mokeponJugadorObjeto.speedX = -5
            drawMap()
            console.log("left")
            break
        case move.RIGHT:
            mokeponJugadorObjeto.speedX  = 5
            drawMap()
            console.log("right")
            break

        default:
            console.log("otra teclas")
            break;
    }
}

function chargemap() {
    mokeponJugadorObjeto = getElementMokepon(mokeponJugador)
    console.log(mokeponJugadorObjeto, mokeponJugador)
    intervalo = setInterval(drawMap, 50)
    document.addEventListener("keydown", movimientoMokepon)
    document.addEventListener("keyup" , stopMoving)
    drawMap()
    reload()
}

function getElementMokepon() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mokeponJugador == mokepones[i].name) {
            return mokepones[i]
        }
        
    }
}
function moveUp() {
    mokeponJugadorObjeto.speedY = -5
}
function moveDown() {
    mokeponJugadorObjeto.speedY = 5
}
function moveLeft() {
    mokeponJugadorObjeto.speedX = -5
}
function moveRight() {
    mokeponJugadorObjeto.speedX  = 5
}

function colision(enemy) {
    let upEnemy = enemy.y
    let downEnemy = enemy.y + enemy.height
    let rigthEnemy = enemy.x + enemy.width
    let leftEnemy = enemy.x

    let upMokepon = mokeponJugadorObjeto.y + 25
    let downMokepon = mokeponJugadorObjeto.y + mokeponJugadorObjeto.height - 25
    let rigthMokepon = mokeponJugadorObjeto.x + mokeponJugadorObjeto.width - 25
    let leftMokepon = mokeponJugadorObjeto.x + 25
    
    if(downMokepon < upEnemy || upMokepon > downEnemy || rigthMokepon < leftEnemy || leftMokepon > rigthEnemy) {
        return;
    }

        

    stopMoving()
    clearInterval(intervalo)
    console.log("guerrita")
    sectionAtaque.style.display = "flex"
    sectionOfMap.style.display = "none"
    mokeponEnemigo(enemy)
    move = {}
}


//funcion de aletoriedad
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}