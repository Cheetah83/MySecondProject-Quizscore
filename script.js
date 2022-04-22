const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');

const questionContainerElement = document.getElementById('question-container');
const questionElement =document.getElementById('question');
const answersButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions,correctQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click' ,() => {
  correctQuestionIndex++;
  setnextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions=questions.sort(()=>Math.random() -0.5);
  correctQuestionIndex = 0;
  questionContainerElement.classList.remove('hide')
  setnextQuestion()
  quizScore =0
}

function setnextQuestion(){
  resetState();
  showQuestion(shuffledQuestions[correctQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) =>{
    const button = document.createElement('button')
    button.innerText=answer.text;
    button.classList.add("btn");
    if(answer.correct) {
      button.dataset.correct=answer.correct
    }
    button.addEventListener('click',selectAnswer)
    answersButtonsElement.appendChild(button);
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while(answersButtonsElement.firstChild) {
    answersButtonsElement.removeChild(answersButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton=e.target
  const correct = selectedButton.dataset.correct;

  setStatusClass(document.body,correct);
  Array.from(answersButtonsElement.children).forEach((button) =>{
    setStatusClass(button,button.dataset.correct)
  })
  if(shuffledQuestions.length> correctQuestionIndex +1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText ="restart";
    startButton.classList.remove("hide")
  }
  if(selectedButton.dataset = correct) {
    quizScore++;
  }
  document.getElementById('right-answers').innerText=quizScore;
}
function setStatusClass(element, correct) {
  clearStatusClass(element)
  if(correct) {
    element.classList.add("correct")
  } else {
    element.classList.add("wrong")
  }
}
function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
const questions = [
  {
    question: 'how old is Yasmin?',
    answers: [
      {text: 'one', correct: false},
      {text: 'eight', correct: false},
      {text: 'seven', correct: true},
      {text: 'ten', correct: false}
    ]
  },
  {
  question: 'which month was Yasmin born?',
  answers: [
    {text: 'January', correct: false},
    {text: 'August', correct: true},
    {text: 'November', correct: false},
    {text: 'March', correct: false}
  ]
},
{
  question: 'which street name does Yasmin stay in?',
  answers: [
    {text: 'Vesilev', correct: false},
    {text: 'George', correct: false},
    {text: 'Ismail', correct: false},
    {text: 'Kapitan Georgi Kupov', correct: true}
  ]
}
]