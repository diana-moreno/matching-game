//estructura de datos vacía
var gameStructure = Array(24).fill().map(
  () => ({ position:  "position", image: "image", status : "back"})
);


//contadores de parejas acertadas y de intentos fallidos
let counters = {counterSuccess : 0, counterFailure : 0}


//función que llama a las anteriores y coloca cada carta en su sitio.
function setRandomCards(game) {
  addImgFrontCards(game)
  getRandomCardPosition(game)
  setImagesInDom(game)
}


//función que genera el funcionamiento principal del juego: gira las cartas seleccionadas, comprueba si son pareja y si se ha ganado
function addPlayBehaviorToCards(game) {
  game.forEach(card =>
    $('#' + card.position).click(() => flipCardAndCheckMatch(game, card))
  )
}

function playAgain() {
  resetCounters()
  domBehaviorIfPlayAgain()
  gameStructure.forEach(elem => {
    elem.status = 'back';
    flipDownCard(elem.position)
  })
  setRandomCards(gameStructure)
}

/**
 * Main function that sets the event listeners to the dom nodes and
 *   sets up the game for playing
 */
function main() {
  $('#play-game').click(domBehaviorIfInitGame)
  $('#play-again').click(playAgain)
  setRandomCards(gameStructure);
  addPlayBehaviorToCards(gameStructure)
}
main()