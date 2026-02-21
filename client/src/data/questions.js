export const javaQuestions = [
  {
    id: 1,
    question: "Which of the following contains both date and time?",
    options: ["Java.io.date", "Java.sql.date", "Java.util.date", "Java.util.dateTime"],
    correct: 3 // D
  },
  {
    id: 2,
    question: "Which of the following is advantage of using JDBC connection pool?",
    options: ["Slow performance", "Using more memory", "Using less memory", "Better performance"],
    correct: 3 // D
  },
  {
    id: 3,
    question: "Which of the following is advantage of using PreparedStatement in Java?",
    options: ["Slow performance", "Encourages SQL injection", "Prevents SQL injection", "More memory usage"],
    correct: 2 // C
  },
  {
    id: 4,
    question: "Which one of the following contains date information?",
    options: ["Java.sql.TimeStamp", "Java.sql.Time", "java.io.Time", "java.io.TimeStamp"],
    correct: 0 // A
  },
  {
    id: 5,
    question: "What does setAutoCommit(false) do?",
    options: [
      "commits transaction after each query", 
      "explicitly commits transaction", 
      "does not commit transaction automatically after each query", 
      "never commits transaction"
    ],
    correct: 2 // C
  }
  // ... Bhai, maine format set kar diya hai. 
  // Main niche isse direct Component mein integrate kar raha hoon.
];