export const es = {
  layout: {
    seo: {
      description:
        "Un juego de navegador sobre engaños, deducción y mentir con todo el descaro. Para 3 o más jugadores.",
      keywords:
        "juego, navegador, engaño, deducción, mentir, diversión, en línea, multijugador, wikipedia, fiesta, amigos, among us, lupus in tabula",
    },
    footer: "Hecho con amor y café en {author}",
  },
  home: {
    seoTitle: "Inicio",
    header: {
      description:
        "Un juego sobre engaños, deducción y mentir con todo el descaro.",
    },
    createRoomLink: "Crear una sala",
    roomCodeInput: {
      label: "Código de sala",
      placeholder: "Introduce un código de sala",
    },
    rules: {
      hint: "¿Nunca has jugado?",
      link: "Leer las reglas",
    },
    joinRoomCta: "Unirse a la sala",
  },
  game: {
    seoTitle: "Juego {roomCode}",
    userNameForm: {
      header: {
        title: "Unirse a la sala",
        description: "Introduce un nombre para comenzar a jugar.",
      },
      nameInput: {
        label: "Nombre",
        placeholder: "Introduce un nombre",
      },
      submitCta: "Unirse al juego",
    },
    pendingJoin: "Uniendo a la sala...",
    toasts: {
      connectionError: {
        title: "No se pudo unir al juego.",
        description:
          "Algo salió mal al intentar unirse a la sala. Inténtalo de nuevo.",
      },
      playerDisconnected: {
        title: "Un jugador se ha desconectado.",
        description: "{playerName} ha perdido la conexión",
      },
      playerReconnected: {
        title: "Un jugador se ha reconectado.",
        description: "{playerName} se ha reconectado",
      },
    },
    lobby: {
      header: {
        title: "Vestíbulo de la sala",
        description:
          "Invita a tus amigos a unirse a la sala introduciendo el código {roomCode} o envíales el enlace a esta página.",
      },
      statusText: {
        waitingForMorePlayers: "Esperando a más jugadores...",
        waitingForHostToStart:
          "Esperando a que el anfitrión inicie el juego...",
      },
      startGameCta: "Iniciar juego",
    },
    waitingForSuspectsScreen: {
      title: "¡Eres el adivinador!",
      description: "Esperando a que otros jugadores elijan un tema...",
    },
    waitingForGuessScreen: {
      title: "{guesserName} está adivinando quién dice la verdad...",
      description: "Convéncelos de que tú eres quien leyó sobre {topic}!",
    },
    choosingTopicScreen: {
      changeTopicCta: "Cambiar tema",
    },
    scoreboard: {
      header: {
        guesserWon: {
          title: "¡{guesserName} ha adivinado correctamente!",
          description: "{winnerName} ha recibido un punto por convencerlos.",
        },
        guesserLost: {
          title: "¡{winnerName} mintió a {guesserName} y ganó!",
          description:
            "{winnerName} ha recibido dos puntos por mentir y ganar.",
        },
      },
    },
    guessingScreen: {
      header: {
        title: 'El tema es "{topic}"',
        description: "¿Quién crees que leyó sobre ello?",
      },
      selectPlayerLabel: "Seleccionar jugador {playerName}",
      confirmCta: "Confirmar elección",
    },
    gameOverScreen: {
      header: {
        title: "¡Fin del juego!",
        description: "¡{winner} ha ganado el juego!",
      },
    },
    leaderboard: {
      pointsSuffix: "pts",
    },
  },
  rules: {
    seoTitle: "Reglas",
  },
};
