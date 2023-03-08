readAllJokes();

function retrieveJoke(){
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://dad-jokes.p.rapidapi.com/random/joke",
        "method": 'GET',
        "headers": {
            "X-RapidAPI-Key": "06dad4043fmshb3122073324ac2cp10d73fjsn5083fc22275c",
            "X-RapidAPI-Host": "dad-jokes.p.rapidapi.com"
        }
    };
    $.ajax(settings).done(function (joke) {
        console.log(joke);
        $(".postJoke").empty();
        $(".postJoke").css("display", "block");

        let $closeButton = $("<img></img>").attr("id", "closeButton").attr("src", "./Close Icon.png");
        $closeButton.css("width", "50px");

        let $jokePrompt = $("<div></div>").attr("id", "jokePrompt").text(joke.body[0].setup).val(joke.body[0].setup);
        let $jokeAnswer = $("<div></div>").attr("id", "jokeAnswer").text(joke.body[0].punchline).val(joke.body[0].punchline);
        let $postButton = $("<button></button>").text("Post Dad Joke?").attr("onClick", "postJoke()");

        $(".postJoke").append($closeButton);
        $(".postJoke").append($jokePrompt);
        $(".postJoke").append($jokeAnswer);
        $(".postJoke").append($postButton);

        $("#closeButton").click(function() {
            //Hide the menus if visible
            $(".postJoke").empty();
            $(".postJoke").css("display", "none");
          });
    });
}

function readAllJokes(){
    $(".jokeTable").empty();

    let $tableRowHeader = $("<div></div>").addClass("row").attr("id","header");
    let $jokeIdHeader = $("<div></div>").addClass("cell").text("ID");
    let $jokeQuestionHeader = $("<div></div>").addClass("cell").text("Question");
    let $jokeAnswerHeader = $("<div></div>").addClass("cell").text("Answer");
    let $jokeRatingAverageHeader = $("<div></div>").addClass("cell").text("Avg Rating");
    let $jokeRatingCountHeader = $("<div></div>").addClass("cell").text("# of Ratings");
    
    $tableRowHeader.append($jokeIdHeader);
    $tableRowHeader.append($jokeQuestionHeader);
    $tableRowHeader.append($jokeAnswerHeader);
    $tableRowHeader.append($jokeRatingAverageHeader);
    $tableRowHeader.append($jokeRatingCountHeader);
    $(".jokeTable").append($tableRowHeader);

    jQuery.ajax({
        url: `/jokes`, 
        type: "GET", 
        contentType: 'application/json', 
        dataType: "json", 
        success: function(result) {
            result.forEach(joke => {
                let $tableRow = $("<div></div>").addClass("row").attr("id", joke.id);
                let $jokeIdCell = $("<button></button").addClass("cell").attr("id", joke.id).text(joke.id).attr("onClick", "readAllReviewsForJoke(this)");
                let $jokeQuestionCell = $("<div></div>").addClass("cell").attr("id", joke.id).text(joke.joke_question);
                let $jokeAnswerCell = $("<div></div>").addClass("cell").attr("id", joke.id).text(joke.joke_answer);
                let $jokeRatingAverageCell = $("<div></div>").addClass("cell").attr("id", joke.id).text(joke.avg);
                let $jokeRatingCountCell = $("<div></div>").addClass("cell").attr("id", joke.id).text(joke.count);
                let $jokeReviewIcon = $("<img></img>").addClass("cell").attr("id", joke.id).attr("src", "./Review Icon.png");

                $jokeReviewIcon.css("width", "40px").attr("onClick","writeReview(this)");

                $tableRow.append($jokeIdCell);
                $tableRow.append($jokeQuestionCell);
                $tableRow.append($jokeAnswerCell);
                $tableRow.append($jokeRatingAverageCell);
                $tableRow.append($jokeRatingCountCell);
                $tableRow.append($jokeReviewIcon);

                $(".jokeTable").append($tableRow);
        });
        }
    }); 

}

function createJoke(){
    $(".postJoke").empty();
    $(".postJoke").css("display", "flex");

    let $closeButton = $("<img></img>").attr("id", "closeButton").attr("src", "./Close Icon.png");
    $closeButton.css("width", "50px");

    let $jokePrompt = $("<input></input>").attr("id", "jokePrompt").attr("type", "text");
    let $jokeAnswer = $("<input></input>").attr("id", "jokeAnswer").attr("type", "text");
    let $postButton = $("<button></button>").text("Post Dad Joke?").attr("onClick", "postJoke()");

    $(".postJoke").append($closeButton);
    $(".postJoke").append($jokePrompt);
    $(".postJoke").append($jokeAnswer);
    $(".postJoke").append($postButton);
    
    $("#closeButton").click(function() {
        //Hide the menus if visible
        $(".postJoke").empty();
        $(".postJoke").css("display", "none");
      });
}

function postJoke(){
    let question = $("#jokePrompt").val();
    let answer = $("#jokeAnswer").val();
    let requestData = JSON.stringify({'joke_question': `${question}`, 'joke_answer': `${answer}`})

    jQuery.ajax({
        url: `/jokes`, 
        type: "POST", 
        contentType: 'application/json', 
        data: requestData,
        dataType: "json", 
        success: function(result) {
            readAllJokes();
        }
    });

    setTimeout(() => {
        console.log('timeout ended'); 
        readAllJokes();
    }, 500)

    $(".postJoke").empty();
    $(".postJoke").css("display", "none");
}

function readAllReviewsForJoke(joke){
    $(".reviewStats").empty();
    $(".reviewStats").css("display", "block");

    let $reviewTable = $("<div></div>").addClass("reviewTable");
    let $reviewTableRowHeader = $("<div></div>").addClass("row").attr("id","header");
    let $reviewIDHeader = $("<div></div>").addClass("cell").text("ID");
    let $reviewRatingHeader = $("<div></div>").addClass("cell").text("Rating");
    let $reviewNameHeader = $("<div></div>").addClass("cell").text("Name");
    
    $reviewTableRowHeader.append($reviewIDHeader);
    $reviewTableRowHeader.append($reviewRatingHeader);
    $reviewTableRowHeader.append($reviewNameHeader);
    $reviewTable.append($reviewTableRowHeader);
    $(".reviewStats").append($reviewTable);

   
    let jokeiD = joke.id;
    let reviewArray = [0,0,0,0,0];
    jQuery.ajax({
        url: `/jokes/${jokeiD}/reviews`, 
        type: "GET", 
        contentType: 'application/json', 
        dataType: "json", 
        success: function(result) {
            result.forEach(review => {
                let $tableRow = $("<div></div>").addClass("row");
                let $reviewID = $("<div></div>").addClass("cell").attr("id", review.id).text(review.id);
                let $reviewRating = $("<div></div>").addClass("cell").attr("id", review.id).text(review.review_rating);
                let $reviewName = $("<div></div>").addClass("cell").attr("id", review.id).text(review.name);
                
                $tableRow.append($reviewID);
                $tableRow.append($reviewRating);
                $tableRow.append($reviewName);
                $reviewTable.append($tableRow);

                reviewArray[review.review_rating-1]++;
            });

            let $barChart = $("<canvas></canvas>").attr("id", "bar-chart");
            $(".reviewStats").prepend($barChart);

            new Chart($barChart, {
                type: 'bar',
                data: {
                labels: ["1-Star", "2-Star", "3-Star", "4-Star", "5-Star"],
                datasets: [
                    {
                    label: "Star Ratings",
                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                    data: reviewArray
                    }
                ]
                },
                options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Dad Joke Ratings'
                }
                }
            });

        let $closeButton = $("<img></img>").attr("id", "closeButton").attr("src", "./Close Icon.png");
        $closeButton.css("width", "50px");
        $(".reviewStats").prepend($closeButton);

        $("#closeButton").click(function() {
            //Hide the menus if visible
            $(".reviewStats").empty();
            $(".reviewStats").css("display", "none");
          });
        }
    });
}

function writeReview(button){
    $(".postReview").css("display", "block");

    let $closeButton = $("<img></img>").attr("id", "closeButton").attr("src", "./Close Icon.png");
    $closeButton.css("width", "50px");
    $(".postReview").append($closeButton);

    let $rating = $("<div></div>").addClass("rating");
    $(".postReview").append($rating);
    for (let i = 1; i < 6; i++)
    {
        let $label = $("<label></label>").attr("for", `${i}`);
        let $input = $("<input></input>").attr("type", "radio").attr("name", "rating").attr("id", `str${i}`).val(i);
        let $span = $("<span></span>");
        $span.append($label);
        $span.append($input);
        $rating.append($span);
    }

    let $reviewRating = $("<div></div>").attr("id", "reviewRating");
    let $reviewJokeID = $("<div></div>").attr("id", "reviewJokeID").val(button.id);                
    let $reviewName = $("<input></input>").attr("id", "reviewName").attr("type", "text");
    let $postButton = $("<button></button>").text("Post Review?").attr("onClick", "postReview()");

    $(".postReview").append($reviewRating);
    $(".postReview").append($reviewJokeID);
    $(".postReview").append($reviewName);
    $(".postReview").append($postButton);

    $("#closeButton").click(function() {
        //Hide the menus if visible
        $(".postReview").empty();
        $(".postReview").css("display", "none");
      });

    // Check Radio-box
    $(document).ready(function(){
        $(".rating input:radio").attr("checked", false);
    
        $('.rating input').click(function () {
            $(".rating span").removeClass('checked');
            $(this).parent().addClass('checked');
        });
    
        $('input:radio').change(
          function(){
             $reviewRating.val(this.value);
             console.log($reviewRating.val());
        }); 
    });

}

function postReview(){
    let reviewRating = $("#reviewRating").val();
    let reviewJokeID = $("#reviewJokeID").val();
    let reviewName = $("#reviewName").val();
    let requestData = JSON.stringify({'joke_id': `${reviewJokeID}`, 'review_rating': `${reviewRating}`, 'name':`${reviewName}`})

    jQuery.ajax({
        url: `/reviews`, 
        type: "POST", 
        contentType: 'application/json', 
        data: requestData,
        dataType: "json", 
        success: function(result) {
        }
    });

    setTimeout(() => {
        console.log('timeout ended'); 
        readAllJokes();
    }, 500)

    $(".postReview").css("display", "none");
    $(".postReview").empty();


}
