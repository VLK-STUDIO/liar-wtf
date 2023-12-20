export const de = {
  layout: {
    seo: {
      description:
        "Ein Browserspiel über Täuschung, Deduktion und hemmungsloses Lügen. Für 3 oder mehr Spieler.",
      keywords:
        "Spiel, Browser, Täuschung, Deduktion, Lügen, Spaß, online, Mehrspieler, Wikipedia, Party, Freunde, Among Us, Lupus in Tabula",
    },
    footer: "Mit Liebe und Kaffee gemacht bei {author}",
  },
  home: {
    seoTitle: "Startseite",
    header: {
      description:
        "Ein Spiel über Täuschung, Deduktion und hemmungsloses Lügen.",
    },
    createRoomLink: "Raum erstellen",
    roomCodeInput: {
      label: "Raumcode",
      placeholder: "Geben Sie einen Raumcode ein",
    },
    rules: {
      hint: "Noch nie gespielt?",
      link: "Die Regeln lesen",
    },
    joinRoomCta: "Raum beitreten",
  },
  game: {
    seoTitle: "Spiel {roomCode}",
    userNameForm: {
      header: {
        title: "Raum beitreten",
        description: "Geben Sie einen Namen ein, um zu spielen.",
      },
      nameInput: {
        label: "Name",
        placeholder: "Einen Namen eingeben",
      },
      submitCta: "Spiel beitreten",
    },
    pendingJoin: "Beitritt zum Raum...",
    toasts: {
      connectionError: {
        title: "Spielbeitritt nicht möglich.",
        description:
          "Beim Versuch, dem Raum beizutreten, ist ein Fehler aufgetreten. Versuchen Sie es erneut.",
      },
      playerDisconnected: {
        title: "Ein Spieler hat die Verbindung verloren.",
        description: "{playerName} hat die Verbindung verloren",
      },
      playerReconnected: {
        title: "Ein Spieler hat sich wieder verbunden.",
        description: "{playerName} hat sich wieder verbunden",
      },
    },
    lobby: {
      header: {
        title: "Raum-Lobby",
        description:
          "Laden Sie Ihre Freunde ein, dem Raum beizutreten, indem sie den Code {roomCode} eingeben oder senden Sie ihnen den Link zu dieser Seite.",
      },
      statusText: {
        waitingForMorePlayers: "Warten auf mehr Spieler...",
        waitingForHostToStart:
          "Warten, dass der Gastgeber das Spiel startet...",
      },
      startGameCta: "Spiel starten",
    },
    waitingForSuspectsScreen: {
      title: "Du bist der Rater!",
      description: "Warten darauf, dass andere Spieler ein Thema wählen...",
    },
    waitingForGuessScreen: {
      title: "{guesserName} rät, wer die Wahrheit sagt...",
      description:
        "Überzeuge sie, dass du derjenige bist, der über {topic} gelesen hat!",
    },
    choosingTopicScreen: {
      changeTopicCta: "Thema ändern",
    },
    scoreboard: {
      header: {
        guesserWon: {
          title: "{guesserName} hat richtig geraten!",
          description:
            "{winnerName} wurde ein Punkt dafür vergeben, dass sie ihn überzeugt haben.",
        },
        guesserLost: {
          title: "{winnerName} hat {guesserName} angelogen und gewonnen!",
          description:
            "{winnerName} wurden zwei Punkte für das Lügen und Gewinnen vergeben.",
        },
      },
    },
    guessingScreen: {
      header: {
        title: 'Das Thema ist "{topic}"',
        description: "Wen glaubst du, hat darüber gelesen?",
      },
      selectPlayerLabel: "Spieler auswählen {playerName}",
      confirmCta: "Auswahl bestätigen",
    },
    gameOverScreen: {
      header: {
        title: "Spiel vorbei!",
        description: "{winner} hat das Spiel gewonnen!",
      },
    },
    leaderboard: {
      pointsSuffix: "Pkt",
    },
  },
  rules: {
    seoTitle: "Regeln",
  },
};
