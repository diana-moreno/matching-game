
//nombres de las imágenes y posiciones de las mismas en el DOM (divs que los contienen)
const imgFrontCards = ['icon-1', 'icon-2', 'icon-3', 'icon-4', 'icon-5', 'icon-6', 'icon-7', 'icon-8', 'icon-9', 'icon-10', 'icon-11', 'icon-12', 'icon-1', 'icon-2', 'icon-3', 'icon-4', 'icon-5', 'icon-6', 'icon-7', 'icon-8', 'icon-9', 'icon-10', 'icon-11', 'icon-12']
const cardsPosition = ['card1', 'card2', 'card3', 'card4', 'card5', 'card6', 'card7', 'card8', 'card9', 'card10', 'card11', 'card12', 'card13', 'card14', 'card15', 'card16', 'card17', 'card18', 'card19', 'card20', 'card21', 'card22', 'card23', 'card24']


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


function flipCardAndCheckMatch(game, card) {
  flipUpCard(card.position);
  card.status = 'front'
  let cardsWithFront = game.filter(card => card.status === "front")
  if(cardsWithFront.length === 2) {
    checkIfPairs(cardsWithFront)
    checkIfWin(game)
  }
}

function checkIfWin(game) {
  let cardsPair = game.filter(elem => elem.status === 'pair')
  if(cardsPair.length === 24) {
    domBehaviorIfWin()
  }
}


function addPoints(failureOrSuccess) {
  if(failureOrSuccess === 'failure') {
    counters.counterFailure += 0.5;
  }
  else {
    counters.counterSuccess += 0.5;
  }
  domBehaviorIfAddPoints(failureOrSuccess)
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
      console.log(cardsWithFront[i].status)
      addPoints('success')
    } else {
      function callbackFunction() {
        flipDownCard(cardsWithFront[i].position)
        cardsWithFront[i].status = 'back'
      }
      var timeoutId = setTimeout(callbackFunction, 500)
      addPoints('failure')
    }
  }
}

function resetCounters() {
  counters.counterSuccess = 0
  counters.counterFailure = 0
}