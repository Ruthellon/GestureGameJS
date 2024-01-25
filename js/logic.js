function startedDrawing(triggered, { game, playerId, allPlayerIds }) {
  if (triggered === false) {
    Rune.gameOver({
      players: {
        [playerId]: "LOST",
        [allPlayerIds.find((id) => id !== playerId)]: "WON",
      },
    })
  }
}

function finishedDrawing({score, drawTime}, { game, playerId, allPlayerIds }) {
  game.scores[playerId] = Math.max(1, ((score.Score * 100) - (drawTime / 100)));
  
  let otherPlayer = allPlayerIds.find((id) => id !== playerId);

  if (game.scores[otherPlayer] !== 0) {
    Rune.gameOver({
      players: {
        [playerId]: game.scores[playerId],
        [otherPlayer]: game.scores[otherPlayer],
      },
    });
  }
}

// logic.js
Rune.initLogic({
    minPlayers: 2,
    maxPlayers: 2,
    setup: (allPlayerIds) => {
      const delay = Math.random() * (10 - 3) + 3;
      const drawing = Math.floor(Math.random() * 16);
      const scores = {}
      for (let playerId of allPlayerIds) {
        scores[playerId] = 0
      }
      return { scores, delay, drawing }
    },
    actions: {
      startedDrawing,
      finishedDrawing
    },
    events: {
      playerJoined: (playerId, { game }) => {
        
      },
      playerLeft: (playerId, { game }) => {
        delete game.scores[playerId]
      },
    },
    update: ({ game, allPlayerIds }) => {
    },
    updatesPerSecond: 10,
    inputDelay: 30,
  })

