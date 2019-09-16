$(document).ready(function() {

  var arrQuestions = [
    {
      question: "!!(true) === false",
      answer: 0,
      isCorrect: undefined
    },
    {
      question: "new Boolean(false)",
      answer: 1,
      isCorrect: undefined
    },
    {
      question: "'false'",
      answer: 1,
      isCorrect: undefined
    },
    {
      question: "2+true === '3'",
      answer: 0,
      isCorrect: undefined
    },
    {
      question: "4+3+2+'1' == 91",
      answer: 1,
      isCorrect: undefined
    },
    {
      question: "null == undefined",
      answer: 1,
      isCorrect: undefined
    },
    {
      question: "null === undefined",
      answer: 0,
      isCorrect: undefined
    },
    {
      question: "{}",
      answer: 1,
      isCorrect: undefined
    },
    {
      question: "2 in [1,2]",
      answer: 0,
      isCorrect: undefined
    },
    {
      question: "!!!!!(false === !!!true)",
      answer: 0,
      isCorrect: undefined
    }
  ];
  // Time for answering question
  const MAXQTIME = 20,
    // Count down interval
    INTERVAL = 1000,
    // Time to display answer
    TIMEOUT = 2500;

  (function initialize() {
    $("#start-btn").show();
    $("#time-remain, #question-container, #answer-container, #result-container").hide();
  })();

  function startTimer() {
    nTimeRemain = MAXQTIME + 1;

    renderTime();

    intervalID = setInterval(renderTime, INTERVAL);
  }

  function stopTimer() {
    clearInterval(intervalID);
    intervalID = undefined;
  }

  function processResults() {
    var nCorrect = 0,
      nIncorrect = 0,
      nUnanswered = 0;

    for (let i = 0; i < arrQuestions.length; i++) {
      if (typeof arrQuestions[i].isCorrect === "undefined") {
        nUnanswered++;
      } else {
        arrQuestions[i].isCorrect ? nCorrect++ : nIncorrect++;
      }
    }

    return [nCorrect, nIncorrect, nUnanswered];
  }

  function renderTime() {
    $("#time-remain").text("Time Remaining: " + --nTimeRemain + " Seconds");

    if (nTimeRemain === 0) {
      stopTimer();
      renderAnswer();
    }
  }

  function renderQuestion() {
    $("#question-container").show();
    $("#answer-container").hide();

    startTimer();

    var currentQuestion = arrQuestions[nQuestion];

    $("#question").text(currentQuestion.question);

    $("#choice-true").text("TRUE");
    $("#choice-false").text("FALSE");
  }

  function renderAnswer(currentQuestion) {
    $("#question-container").hide();
    $("#answer-container").show();

    var strText = "";
    var strID = "no";
    if (typeof currentQuestion === "undefined") {
      if (currentQuestion.answer === 1) {
        strText =
          'Incorrect.<br>The correct answer was <span style="color:#fff">TRUE</span>';
      } else if (currentQuestion.answer === 0) {
        strText =
          'Incorrect.<br>The correct answer was <span style="color:#fff">FALSE</span>';
      }
    } else if (currentQuestion.isCorrect) {
      strText = "Correct!";
      strID = "yes";
    } else if (currentQuestion.answer === 1) {
      strText =
        'Incorrect.<br>The correct answer was <span style="color:#fff">TRUE</span>';
    } else if (currentQuestion.answer === 0) {
      strText =
        'Incorrect.<br>The correct answer was <span style="color:#fff">FALSE</span>';
    }

    $("#answer-text").html("<h2 id='" + strID + "'" + ">" + strText + "</h2>");

    timeoutID =
      ++nQuestion === arrQuestions.length
        ? setTimeout(renderResults, TIMEOUT)
        : setTimeout(renderQuestion, TIMEOUT);
  }

  function renderResults() {
    var results = [];

    $("#time-remain, #answer-container").hide();
    $("#result-container").show();

    results = processResults();

    $("#correct").text("Correct Answers: " + results[0]);
    $("#incorrect").text("Incorrect Answers: " + results[1]);
    $("#unanswered").text("Unanswered: " + results[2]);
  }

  function clickStart() {
    $("#start-btn, #answer-container, #result-container").hide();
    $("#time-remain").show();

    nQuestion = 0;

    renderQuestion();
  }

  function clickAnswer() {
    stopTimer();

    var strChosen = $(this).attr("id"),
      currentQuestion = arrQuestions[nQuestion];

    if (strChosen === "choice-true" && currentQuestion.answer === 1 || strChosen === "choice-false" && currentQuestion.answer === 0) {
      currentQuestion.isCorrect = true;
    } else {
      currentQuestion.isCorrect = false;
    }

    renderAnswer(currentQuestion);
  }

  $(".start").on("click", clickStart);
  $(".choice").on("click", clickAnswer);
});
