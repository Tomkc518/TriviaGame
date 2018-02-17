$(function() {    
    var currentQuestion = 0;
    var answerSelected = "";
    var count;
    var counter;
    var answersCorrect = 0;
    var answersWrong = 0;
    var answersTimed = 0;
    var questions = [
        {
            question: "Who does Gandalf find eaves-dropping at the window of Bag End?",
            correctAnswer: "Samwise Gamgee",
            answers: ["Samwise Gamgee", "Gollum", "Gimli", "Mark Lewis"],
            gif: "assets/images/question_1.gif"
        },
        {
            question: 'In "Fellowship of the Ring" Arwen tells Strider and the Hobbits that there are how many wraiths behind them?',
            correctAnswer: "Five",
            answers: ["Five", "One", "Three", "Two-Hundred"],
            gif: "assets/images/question_2.gif"
        },
        {
            question: "Who does Samwise Marry?",
            correctAnswer: "Rosie Cotton",
            answers: ["Rosie Cotton", "Arwen", "Galadriel", "Christopher Evans"],
            gif: "assets/images/question_3.gif"
        },
        {
            question: "What is the name of Gandalf's horse?",
            correctAnswer: "Shadowfax",
            answers: ["Shadowfax", "Secretariat", "Seabiscuit", "Seattle Slew"],
            gif: "assets/images/question_4.gif"
        },
        {
            question: "Who tells Frodo to keep the Ring secret and safe?",
            correctAnswer: "Gandalf",
            answers: ["Gandalf", "Legolas", "Aragorn", "Will Montgomery"],
            gif: "assets/images/question_5.gif"
        },
        {
            question: "What is the name of Southern Kingdom of Middle-Earth, founded by the Dunedain?",
            correctAnswer: "Gondor",
            answers: ["Gondor", "Minas Tirith", "Osgiliath", "San Diego"],
            gif: "assets/images/question_6.gif"
        },
    ]

    function displayAnswer(){
        //remove the question and the list of answers and adds the question gif
        clearInterval(counter);
        $(".question").empty();
        $("li").detach();
        $("#answerGif").attr("src", questions[currentQuestion].gif);
        nextQuestion();
    };

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
        // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
        // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        };
        return array;
    };
     
    function displayQuestion(){
        //Once the question is displayed a timer starts
        count = 51;
        counter = setInterval(timer, 1000);
        function timer(){
            count -= 1;
            $(".time").html("Time Remaining: " + count);
            //if the counter goes to 0 goes to the answer screen
            if (count <= 0){
                clearInterval(counter);
                answersTimed++;
                displayAnswer();
                $(".answerResults").html("Out of Time!");
                $(".actualAnswer").html("The Correct Answer was: " + questions[currentQuestion].correctAnswer);
            };
        };
        //displays the current question in the array
        $(".question").html(questions[currentQuestion].question);
        //shuffles the array of answers each time and adds it as a list.
        var answerShuffle = shuffle(questions[currentQuestion].answers);
        for (var i = 0; i < answerShuffle.length; i++) {
            $("ul").append('<li class="answers">' + answerShuffle[i] + '</li>');
        };
    };

    function nextQuestion() {
        var answerCount = 6;
        var answerCounter = setInterval(answerTimer, 1000); 
        function answerTimer(){
            answerCount -= 1;
            if (answerCount <= 0){
                currentQuestion++;
                if (currentQuestion < questions.length){
                    clearInterval(answerCounter);
                    $("#answerGif").attr("src", "");
                    $(".answerResults").empty();
                    $(".actualAnswer").empty();
                    clearInterval(counter);
                    displayQuestion();
                    console.log(currentQuestion);
                    console.log(questions.length);
                } else {
                    clearInterval(counter);
                    $(".answerResults").empty();
                    $(".actualAnswer").empty();
                    $("#answerGif").attr("src", "");
                    $(".answerResults").html("All Done, here's how you did!");
                    $(".actualAnswer").append("Correct Answers: " + answersCorrect + "");
                    $(".actualAnswer").append("<p>Answers Wrong: " + answersWrong + "</p>");
                    $(".actualAnswer").append("<p>Questions Timed Out: " + answersTimed + "</p>");
                };
            };
        };
    };

    $(".startButton").on("click", function() {
        //hide the start button
        $(this).hide();
        //display the question
        displayQuestion();
    });

    $(document).on('click', ".answers", function() {
        //assign which one was clicked
        answerSelected = $(this).html();
        //once a selection is chosen, checks if its correct or not and goes to the answer screen
        if (answerSelected === questions[currentQuestion].correctAnswer) {
            answersCorrect++;
            displayAnswer();
            $(".answerResults").html("Correct!");
        } else {
            answersWrong++;
            displayAnswer();
            $(".answerResults").html("Nope!");
            $(".actualAnswer").html("The Correct Answer was: " + questions[currentQuestion].correctAnswer);
        };
    });


















});