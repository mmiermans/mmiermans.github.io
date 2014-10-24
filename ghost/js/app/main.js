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

  $("#message").text("Waiting for player to choose first letter.");

  // game state
  var state = {
    prefix: "",
  };

  // Player makes move
  $(".letter").on("click", function(ev) {
    $("#message").text("AI is thinking...");
    var letter = $(ev.target).data('letter');
    state.prefix += letter;
    $("#word").text(state.prefix);

    if (GhostEngine.isValidMove(state.prefix) == false) {
      // Game over
      if (GhostEngine.dictionary.indexOf(state.prefix) > 0) {
        $("#message").text("Player has lost! \"" + state.prefix + "\" is a dictionary word.");
      } else {
        $("#message").text("Player has lost! No word begins with \"" + state.prefix + "\".");
      }
      $(".letter").prop('disabled', true);
    } else {
      var aiMove = GhostEngine.solve(state.prefix, false);
      state.prefix += aiMove;
      
      // Test whether AI ran out of moves.
      if (GhostEngine.dictionary.indexOf(state.prefix) > 0) {
        $("#message").text("AI has lost! \"" + state.prefix + "\" is a dictionary word.");
        $(".letter").prop('disabled', true);
      } else {
        $("#message").text("Waiting for player to choose next letter.");
      }

      $("#word").text(state.prefix);
    }
  });

  // Player restarts game
  $("#restart").on("click", function() {
    state.prefix = "";
    $("#word").html("&nbsp");
    $("#message").text("Waiting for player to choose first letter.");
    $(".letter").prop('disabled', false);
  });

  GhostEngine.isValidMove('aa');
  GhostEngine.solve('aah');
});
