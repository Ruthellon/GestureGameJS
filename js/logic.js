// logic.js
Rune.initLogic({
    minPlayers: 2,
    maxPlayers: 2,
    setup: (allPlayerIds) => {
        const delay = Math.random() * (10 - 3) + 3;
      const scores = {}
      for (let playerId of allPlayerIds) {
        scores[playerId] = 0
      }
      return { scores, delay, currentPlayerIndex: 0, currentPlayerStartedAt: 0 }
    },
    actions: {
      myAction: (payload, { game, playerId, allPlayerIds }) => {
        // Check it's not the other player's turn
        if (game.currentPlayer !== allPlayerIds[game.currentPlayerIndex]) {
          throw Rune.invalidAction()
        }
  
        // Increase score and switch turn
        game.scores[playerId]++
        //Switch turn
        game.currentPlayerIndex = (game.currentPlayerIndex + 1) % allPlayerIds.length;
        game.currentPlayerStartedAt = Rune.gameTimeInSeconds();
        // Determine if game has ended
        if (isVictoryOrDraw(game)) {
          Rune.gameOver()
        }
      },
    },
    events: {
      playerJoined: (playerId, { game }) => {
        game.scores[playerId] = 0
      },
      playerLeft: (playerId, { game }) => {
        delete game.scores[playerId]
      },
    },
    update: ({ game, allPlayerIds }) => {
      //If 30 seconds have passed since last player scored, switch player
      if (Rune.gameTimeInSeconds() - game.lastPlayerScoredAt > 30) {
        game.currentPlayerIndex = (game.currentPlayerIndex + 1) % allPlayerIds.length;
        game.currentPlayerStartedAt = Rune.gameTimeInSeconds();
      }
    },
    updatesPerSecond: 10,
    inputDelay: 30,
  })