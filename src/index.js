function initGame() {
  $('#play-game').click(function() {
    $('body').attr('style', 'background-image : url(./img/1769.jpg)')
    $('#instructions-container').hide()
    $('#background-image > img').hide()
    $('#points-container').attr('style', 'display : grid')
    $('#container').attr('style', 'display : flex')
  })
}
//nombres de las imágenes y posiciones de las mismas en el DOM (divs que los contienen)
const imgFrontCards = ['icon-1', 'icon-2', 'icon-3', 'icon-4', 'icon-5', 'icon-6', 'icon-7', 'icon-8', 'icon-9', 'icon-10', 'icon-11', 'icon-12', 'icon-1', 'icon-2', 'icon-3', 'icon-4', 'icon-5', 'icon-6', 'icon-7', 'icon-8', 'icon-9', 'icon-10', 'icon-11', 'icon-12']
const cardsPosition = ['card1', 'card2', 'card3', 'card4', 'card5', 'card6', 'card7', 'card8', 'card9', 'card10', 'card11', 'card12', 'card13', 'card14', 'card15', 'card16', 'card17', 'card18', 'card19', 'card20', 'card21', 'card22', 'card23', 'card24']

//estructura de datos vacía
var gameStructure = Array(24).fill().map(
  () => ({ position:  "position", image: "image", status : "back"})
);

//contadores de parejas acertadas y de intentos fallidos
let counterSucces = 0
let counterFailure = 0

//añadir a la estructura de datos, el nombre de la posición que será fija en la estructura de datos
function addImgFrontCards(game) {
  for(let i in game) {
    game[i].position = cardsPosition[i]
  }
}

//añadir a la estructura de datos el nombre que la imagen tendrá en el DOM de manera aleatoria, de manera que en cada juego, el orden de las cartas será diferente
function getRandomCardPosition(game) {
  let imgFrontCard = [...imgFrontCards]; //copia del array de posiciones
  let counter = game.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * imgFrontCard.length);
    game[counter -1].image = imgFrontCard.splice(index, 1) [0];
    counter --;
  }
}

//función que coloca cada imagen en su lugar correspondiente en el DOM, dependiendo de la posición random elegida por las funciones anteriores.
function setImagesInDom(game) {
  game.forEach(elem => {
    $('#' + elem.position + '> img.front').attr('src', "./img/" + elem.image + ".jpg")
  })
}

//función que llama a las anteriores y coloca cada carta en su sitio.
function setRandomCards(game) {
  addImgFrontCards(game)
  getRandomCardPosition(game)
  setImagesInDom(game)
}

//función que comprueba si las cartas elegidas son pareja y establece puntos de acierto o de fallo.
function checkIfPairs(game) {
  if(game.length === 2) {
    for(let i in game) {
      if(game[0].image === game[1].image) {
        game[i].status = 'pair'
        counterSucces += 0.5;
        $('#matches').text('Matches: ' + counterSucces)
      } else {
        function callbackFunction() {
          $('#' + game[i].position + '> img.front').hide()
          $('#' + game[i].position + '> img.back').show()
          game[i].status = 'back'
        }
        var timeoutId = setTimeout(callbackFunction, 800)
        counterFailure += 0.5;
        $('#failures').text('Failures: ' + counterFailure)
      }
    }
  }
}
//función que comprueba cuando el usuario gana, que es cuando ha emparejado todas las cartas
function checkIfWin(game) {
  let cardsPair = game.filter(elem => elem.status === 'pair')
  if(cardsPair.length === 24) {
    $('#win').attr('style', 'display: flex')
    $('#win > h1').text('YOU WIN WITH ' + counterFailure + ' ATTEMPTS!')
    $('#container').hide()
    $('body').attr('style', 'background-color : #750760; justify-content: center')
    $('#points-container').hide()
  }
}

//al presionar el botón de play again, el juego se resetea para volver a jugar
function playAgain(game) {
  $('#play-again').click(function() {
    $('#win').hide();
    $('body').attr('style', 'background-image : url(./img/1769.jpg)')
    $('#container').attr('style', 'display : flex')
    $('#points-container').attr('style', 'display : grid')
    counterSucces = 0
    counterFailure = 0
    $('#matches').text('Matches: ' + counterSucces)
    $('#failures').text('Failures: ' + counterFailure)
    game.forEach(elem => {
    elem.status = 'back';
    elem.image = 'new';
    $('#' + elem.position + '> img.front').hide()
    $('#' + elem.position + '> img.back').show()
    })
    matchingGame(game)
  })
}

//función general que llama a la función que coloca las cartas en su lugar aleatorio, que muestra las dos cartas elegidas por el usuario y llama a la función que comprueba si son pareja, y llama a la función que comprueba si se ha ganado.
function matchingGame(game) {
  initGame()
  setRandomCards(game)
  game.forEach(elem => {
    $('#' + elem.position).click(function() {
      $('#' + elem.position + '> img.back').hide()
      $('#' + elem.position + '> img.front').show()
      elem.status = 'front'
      let cardsWithFront = game.filter(elem => elem.status === "front")
      if(cardsWithFront.length === 2) {
        checkIfPairs(cardsWithFront)
        checkIfWin(game)
        playAgain(game)
      }
    })
  })
}
matchingGame(gameStructure)