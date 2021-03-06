define(["jquery","underscore","bootstrap","app/ghostengine"], function($,_,Bootstrap,GhostEngine) {

  GhostEngine.parseDictionary();

  var playerControlsTemplate = _.template($( ".player-controls-template" ).html());
  $("div#player-controls").html(playerControlsTemplate({
    alphabet: GhostEngine.alphabet
  }));

  var s = "n";
  var  i = 1;
  while (true) {
    var c = GhostEngine.solve(s, i % 2 == 0);
    if (c == null)
      break;
    else {
      s += c;
      console.log(s);
    }
    i++;
  }

  $("#message").text("Waiting for player to choose the first letter.");

  // game state
  var state = {
    prefix: "",
    aiWins: 0,
    humanWins: 0,
  };

  // Player makes move
  $(".letter").on("click", function(ev) {
    $("#message").text("AI is thinking...");
    $(".letter").removeClass("btn-success");
    var letter = $(ev.target).data('letter');
    state.prefix += letter;
    $("#word").text(state.prefix);

    if (GhostEngine.isValidMove(state.prefix) == false) {
      // Game over
      state.aiWins++;
      if (GhostEngine.isLongWord(state.prefix)) {
        $("#message").text("Player has lost! \"" + state.prefix + "\" is a dictionary word.");
      } else {
        $("#message").text("Player has lost! No word begins with \"" + state.prefix + "\".");
      }
      $(".letter, #hint").prop('disabled', true);
    } else {
      var aiMove = GhostEngine.solve(state.prefix, false);
      state.prefix += aiMove;
      
      // Test whether AI ran out of moves.
      if (GhostEngine.isLongWord(state.prefix)) {
        state.humanWins++;
        $("#message").text("AI has lost! \"" + state.prefix + "\" is a dictionary word.");
        $(".letter").prop('disabled', true);
      } else {
        $("#message").text("Waiting for player to choose the next letter.");
      }

      $("#word").text(state.prefix);
    }

    $("#score").text("HUMAN " + state.humanWins + " - " + state.aiWins + " A.I.");
  });

  // Player restarts game
  $("#restart").on("click", function() {
    state.prefix = "";
    $("#word").html("&nbsp");
    $("#message").text("Waiting for player to choose the first letter.");
    $(".letter, #hint").prop('disabled', false);
  });

  // Give hint
  $("#hint").on("click", function() {
    var aiHint = GhostEngine.solve(state.prefix, true);
    $(".letter[data-letter='" + aiHint + "']").addClass("btn-success");
  });

  GhostEngine.isValidMove('aa');
  GhostEngine.solve('aah');
});
