define(["app/dictionary"], function(Dictionary) {

  var GhostEngine = {
    
    minWordLength: 4,

    // List of words in the dictionary
    dictionary: Dictionary,

    // List of symbols in the alphabet
    alphabet: [],

    // Tree of words from Dictionary.
    // Words shorter than minWordLength and words that have another
    // word as a prefix are ignored.
    // key 'isWord' determines whether a node is a word.
    // key 'dist' determines the number of nodes till the next word.
    // All other nodes are symbols from the alphabet.
    wordTree: {},
    wordTreeMetaKeys: ['isWord', 'dist'],

    // Builds wordTree and alphabet. 
    parseDictionary: function() {
      var dictLen = this.dictionary.length;
      // Iterate over all words and update tree.
      for (var  i = 0; i < dictLen; i++) {
        var word = this.dictionary[i];
        var wordLen = word.length;
        // Ignore all words < minWordLength
        if (wordLen < this.minWordLength)
          continue;

        var node = this.wordTree;
        // Set to true if word is not added to tree.
        var isSkipped = false;

        for (var  j = 0; j < wordLen; j++) {
          if (node.isWord == true) {
            // The ghost game can never progress past this node, because it is a word.
            isSkipped = true;
            break;
          }

          var c = word[j];
          if (c in node == false) {
            node[c] = {};
          }
          node = node[c];

          if (this.alphabet.indexOf(c) < 0)
            this.alphabet.push(c);
        }

        if (isSkipped == false) {
          node.isWord = true;
        }
      }

      this.alphabet.sort();

      console.log("Tree built");
    },

    // Returns true if prefix is not a word.
    isValidMove: function(prefix) {
      var node = this.wordTree;
      for (var i = 0; i < prefix.length; i++) {
        if (_.isUndefined(node) || prefix[i] in node == false)
          return false;
        else
          node = node[prefix[i]];
      }

      var childNodeCount = Object.keys(this.getLetterChildren(node)).length;
      return (childNodeCount > 0);
    },

    // Solve game state and recommend letter to play.
    // Precondition: prefix is a valid game state.
    // Returns: { isAlive: true/false, move: letter }
    solve: function(prefix, isFirstPlayer) {
      var node = this.wordTree;
      var depth = 0;
      for (var i = 0; i < prefix.length; i++) {
          node = node[prefix[i]];
          depth++;
      }

      var result = this.minimax(node, depth, true, isFirstPlayer);
      console.log(result);

      var len = result.moves.length;
      if (len > 0)
        return result.moves[Math.floor(Math.random()*len)];
      else
        return null;
    },

    // Apply minimax algorithm to get the best move starting from a certain node.
    minimax: function(node, depth, isMaximizing, isFirstPlayer) {
      var childNodes = this.getLetterChildren(node);
      if (node.isWord) {
        // Player that reaches this position loses.
        var m = isFirstPlayer ? 1 : 0;
        return {
          moves: [],
          val: (depth % 2 == m) ? -1000 + depth : 1000
        };
      } else if (isMaximizing) {
        var bestValue = Number.NEGATIVE_INFINITY;
        var bestMoves = [];
        for (var letter in childNodes) {
          var result = this.minimax(childNodes[letter], depth + 1, false, isFirstPlayer);
          if (result.val > bestValue) {
            bestValue = result.val;
            bestMoves = [ letter ];
          } else if (result.val == bestValue) {
            bestMoves.push(letter);
          }
        }
      } else {
        var bestValue = Number.POSITIVE_INFINITY;
        var bestMoves = [];
        for (var letter in childNodes) {
          var result = this.minimax(childNodes[letter], depth + 1, true, isFirstPlayer);
          if (result.val < bestValue) {
            bestValue = result.val;
            bestMoves = [ letter ];
          } else if (result.val == bestValue) {
            bestMoves.push(letter);
          }
        }
      }

      return { moves: bestMoves, val: bestValue };
    },

    // Omits meta data children from node (e.g. isWord)
    getLetterChildren: function(node) {
      return _.omit(node, this.wordTreeMetaKeys);
    },

  };

  return GhostEngine;

});
