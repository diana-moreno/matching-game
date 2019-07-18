//función que cambia el aspecto visual de la página mostrando el juego
function initGame() {
  $('body').attr('style', 'background-image : url(./img/1769.jpg)')
  $('#instructions-container').hide()
  $('#background-image > img').hide()
  $('#points-container').attr('style', 'display : grid')
  $('#container').attr('style', 'display : flex')
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

//función que genera el funcionamiento principal del juego: gira las cartas seleccionadas, comprueba si son pareja y si se ha ganado
function addPlayBehaviorToCards(game) {
  game.forEach(card => {
    $('#' + card.position).click(function() {
      $('#' + card.position + '> img.back').hide()
      $('#' + card.position + '> img.front').show()
      card.status = 'front'
      let cardsWithFront = game.filter(card => card.status === "front")
      if(cardsWithFront.length === 2) {
        checkIfPairs(cardsWithFront)
        checkIfWin(game)
      }
    })
  })
}


/**
 * Checks if the given cardsWithFront array are a pair and adds the points
 *   accordingly depending of a hit or miss
 * @param  {array} cardsWithFront blalbalabab
 */
function checkIfPairs(cardsWithFront) {
  for(let i in cardsWithFront) {
    if(cardsWithFront[0].image === cardsWithFront[1].image) {
      cardsWithFront[i].status = 'pair'
      counterSucces += 0.5;
      $('#matches').text('Matches: ' + counterSucces)
    } else {
      function callbackFunction() {
        $('#' + cardsWithFront[i].position + '> img.front').hide()
        $('#' + cardsWithFront[i].position + '> img.back').show()
        cardsWithFront[i].status = 'back'
      }
      var timeoutId = setTimeout(callbackFunction, 800)
      counterFailure += 0.5;
      $('#failures').text('Failures: ' + counterFailure)
    }
  }
}


/**
 * Checks if we have a win condition when all the cards have a flipped pair
 * @param  {Array} game the status of the game
 */
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


/**
 * Alters the dom elements to reflect a new game
 */
function playAgain() {
  $('#win').hide();
  $('body').attr('style', 'background-image : url(./img/1769.jpg)')
  $('#container').attr('style', 'display : flex')
  $('#points-container').attr('style', 'display : grid')
  counterSucces = 0
  counterFailure = 0
  $('#matches').text('Matches: ' + counterSucces)
  $('#failures').text('Failures: ' + counterFailure)
  gameStructure.forEach(elem => {
    elem.status = 'back';
    $('#' + elem.position + '> img.front').hide()
    $('#' + elem.position + '> img.back').show()
  })
  setRandomCards(gameStructure)
}

/**
 * Main function that sets the event listeners to the dom nodes and
 *   sets up the game for playing
 */
function main() {
  $('#play-game').click(initGame)
  $('#play-again').click(playAgain)
  setRandomCards(gameStructure);
  addPlayBehaviorToCards(gameStructure)
}
main()