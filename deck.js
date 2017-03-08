function Player() {
    this.score = 0;

    this.AddScore = function(value) {
        if (value > 10) {
            this.score += 10;
        } else {
            this.score += value;
        }
        return this.score
    }
}

function card(value, name, suit) {
    this.value = value;
    this.name = name;
    this.suit = suit;
}

function Deck() {
    this.cards = createDeck();

    function createDeck() {
        var names = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        var suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
        var cards = [];
        for (var s = 0; s < suits.length; s++) {
            for (var n = 0; n < names.length; n++) {
                if (n == 0) {
                    cards.push(new card(10 + 1, names[n], suits[s]));
                } else {
                    cards.push(new card(n + 1, names[n], suits[s]));
                }
            }
        }
        return cards;
    }
    this.reset = function() {
        this.cards = createDeck();
    }
}
Deck.prototype.printDeck = function() {
    for (var i = 0; i < 52; i++) {
        console.log(this.cards[i]);
    }
    return this;
}
Deck.prototype.shuffle = function() {
    var m = this.cards.length,
        t, i;
    // while there remain elements to shuffle...
    while (m) {
        // pick a remaining element..
        i = Math.floor(Math.random() * m--);
        // And swap it with the current element.
        t = this.cards[m];
        this.cards[m] = this.cards[i];
        this.cards[i] = t;
    }
    // //Print the deck
    // for (var i = 0; i < 52; i++) {
    //     console.log(this.cards[i]);
    // }
    return this
}
Deck.prototype.deal = function() {
    return this.cards.pop()
}

// var game = new Deck();
// game.reset();

$(document).ready(function() {
    //Start Game
    var game = new Deck();
    var dealer = new Player();
    var player = new Player();
    //load image
    $('#newGame').click(function() {
        //Reset Game
        // game.reset();
        //Start Game

        game.shuffle();

        var de = game.deal();
        dealer.AddScore(de.value)
        $(".dealer").append('<img src="img/' + de.name + de.suit + '.png" alt="">');
        var de2 = game.deal();
        console.log(de2.value);
        var ddd = dealer.AddScore(de2.value)
        console.log(de2);
        console.log(ddd);
        $(".dealer").append('<img src="img/' + de2.name + de2.suit + '.png" alt="">');
        var de3 = game.deal();
        player.AddScore(de3.value)
        console.log(de3);
        $(".cardsPlayer").append('<img src="img/' + de3.name + de3.suit + '.png" alt="">');
        var de4 = game.deal();
        var ddd3 = player.AddScore(de4.value)
        console.log(ddd3);

        $(".cardsPlayer").append('<img src="img/' + de4.name + de4.suit + '.png" alt="">');

        if (dealer.score > player.score) {
            $(".score").append('<p>You Lost!</p>');
        } else {
            $(".score").append('<p>You Won!</p>');
        }
    })
});
