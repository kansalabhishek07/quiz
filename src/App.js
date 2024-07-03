import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuizApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [difficultyLevel, setDifficultyLevel] = useState(1); // Adjusted based on score
  const [questions, setQuestions] = useState([]);

  useEffect(() => {

    userLogin();
    if (isAuthenticated) {
      fetchUserProfile();
    } else {
      setUserAsGuest();
    }
    startQuiz();
  }, [isAuthenticated]);

  const userLogin = () => {
    console.log("User logged in");
    setIsAuthenticated(true); // Assuming user always authenticates for this example
  };

  const fetchUserProfile = () => {
    console.log("User profile fetched");
    setUserProfile({ name: "John Doe" }); // Dummy profile
  };

  const setUserAsGuest = () => {
    console.log("User set as guest");
    setUserProfile({ name: "Guest" });
  };

  const startQuiz = () => {
    console.log("Quiz started");
    serveQuestion();
  };

  const serveQuestion = () => {

    // Example question selection based on difficultyLevel
    // This is a simplified example. In a real app, you might fetch questions from a backend service or a local store
    axios.get('http://localhost:1337/api/quizzes')
    .then(response => {
        const {data} = response.data
        console.log(data)
        setQuestions(data)
})
    // const questions = [
    //   { text: "What is 2 + 2?", options: [2, 3, 4, 5], correctOption: 4, difficulty: 1 },
    //   { text: "What is the square root of 144?", options: [12, 14, 16, 18], correctOption: 12, difficulty: 2 }
    // ];
    // const questionForLevel = questions.find(q => q.difficulty === difficultyLevel);
    // setCurrentQuestion(questionForLevel || questions[0]);
       
  };

  const processQuestion = (selectedOption) => {
    if (selectedOption === currentQuestion.correctOption) {
      console.log("Correct answer");
      setScore(prevScore => prevScore + 10); // Increment score
      increaseKnowledgeProfile();
    } else {
      console.log("Incorrect answer");
      decreaseKnowledgeProfile();
    }
    adjustDifficulty();
    serveQuestion(); // Serve next question
  };

  const adjustDifficulty = () => {
    // Adjust difficulty based on score
    if (score >= 50) {
      setDifficultyLevel(2); // Increase difficulty
    } else {
      setDifficultyLevel(1); // Reset or decrease difficulty
    }
  };

  const increaseKnowledgeProfile = () => {
    console.log("Knowledge profile increased");
  };

  const decreaseKnowledgeProfile = () => {
    console.log("Knowledge profile decreased");
  };

  // Render method to display the quiz
  return (
    <div>
      <h1>Quiz App</h1>
      {userProfile && <p>Welcome, {userProfile.name}</p>}
      {currentQuestion && (
        <div>
          <p>{currentQuestion.text}</p>
          {currentQuestion.options.map(option => (
            <button key={option} onClick={() => processQuestion(option)}>
              {option}
            </button>
          ))}
        </div>
      )}
      <p>Score: {score}</p>
      <p>Difficulty Level: {difficultyLevel}</p>
    </div>
  );
};

export default QuizApp;
