import React from "react";
import "./style.css"
import QuizPage from "./components/QuizPage"
import FirstPage from "./components/FirstPage"

export default function App() {
    const [startQuiz, setStartQuiz] = React.useState(false)

    function startGame() {
        setStartQuiz(() => !startQuiz)
    }


    return (
        <main>
            {startQuiz ? <QuizPage /> : <FirstPage onClick={startGame}/>}
        </main>
    )
}