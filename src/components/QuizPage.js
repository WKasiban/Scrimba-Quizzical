import React, { useEffect } from "react";
import { nanoid } from "nanoid";

export default function QuizPage() {
    const [quizzes, setQuizzes] = React.useState([])
    const [gameOver, setGameOver] = React.useState(false)
    const [score, setScore] = React.useState(0)

    function getQuizzicals() {
        fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple")
            .then(res => res.json())
            .then(data => {
                setQuizzes(data.results.map((quiz) => ({
                    id: nanoid(),
                    question: quiz.question,
                    choices: randomChoices([quiz.correct_answer, ...quiz.incorrect_answers]),
                    currentAns: '',
                    answer: quiz.correct_answer,
                    checked: false,
                    correctAns: false
                })))
            })
    }

    React.useEffect(() => {
        getQuizzicals()
    },[])


    function unEscape(htmlStr) {
        htmlStr = htmlStr.replace(/&lt;/g , "<");	 
        htmlStr = htmlStr.replace(/&gt;/g , ">");     
        htmlStr = htmlStr.replace(/&quot;/g , "\"");  
        htmlStr = htmlStr.replace(/&#039;/g , "'");   
        htmlStr = htmlStr.replace(/&amp;/g , "&");
        htmlStr = htmlStr.replace(/&hellip;/g , "...");
        htmlStr = htmlStr.replace(/&iacute;/g , "í");
        htmlStr = htmlStr.replace(/&oacute;/g , "ó");
        htmlStr = htmlStr.replace(/&rsquo;/g , "'");
        htmlStr = htmlStr.replace(/&auml;/g , "ä");
        return htmlStr;
    }
    
    function randomChoices(arr) {
        let newArr = [...arr]
        let randomArr = []

        while (newArr.length > 0) {
            let randomIndex = Math.floor(Math.random() * newArr.length)
            randomArr.push(newArr[randomIndex])
            newArr.splice(randomIndex, 1)
        }
        return randomArr
    }

    function handleClick(e) {
        const { id, value } = e.target
        setQuizzes((prevQuest) => 
            prevQuest.map((question) => {
                return question.id === id ? {...question, currentAns: value} : question
            })
        )
    }

    function checkAnswers() {
       setQuizzes((prevQuest) => 
            prevQuest.map((question) => {
                question.checked = true
                return question.currentAns === question.answer ? {...question, correctAns: true} : question
            })
        )
        setGameOver(true)
    }
    React.useEffect(() => {
        setScore(prevQuest => quizzes.filter(question => question.correctAns))
    }, [quizzes])

    console.log(quizzes)

    function playAgain() {
        setQuizzes([])
        setGameOver(false)
        getQuizzicals()
    }  

    const quizElements = quizzes.map(quiz => {
        return (
                <div key={quiz.id}>
                    <p className="quiz-question">{unEscape(quiz.question)}</p>
                    {quiz.choices.map((choice, index) => <button className="quiz-choices" 
                                                            onClick={handleClick}
                                                            style={!quiz.checked && quiz.currentAns === choice ? {backgroundColor: "#D6DBF5"} : 
                                                                quiz.correctAns && gameOver && quiz.currentAns === choice ? {backgroundColor: "#94D7A2"} : 
                                                                !quiz.correctAns && gameOver && quiz.currentAns === choice ? {backgroundColor: "#F8BCBC"} :
                                                                {backgroundColor: "#F5F7FB"}}
                                                            key={index} id={quiz.id} value={choice}>
                                                    {unEscape(choice)}
                                                </button> )}
                    <hr/>
                </div> 
        )})
    

    return (
        <>
        <div className="quiz-container">
            {quizElements}
            <div className="quiz-result">
                {gameOver && <p className="quiz-score">Your Scored {score.length}/5 answers</p>}
                {gameOver ? <button className="quiz-check-btn" onClick={playAgain}>Play Again</button> : <button className="quiz-check-btn" onClick={checkAnswers}>Check answer</button>}
            </div>
        </div>
        </>
    )
}

