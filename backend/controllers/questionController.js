import Question from "../models/Question.js";


// ============================
// ADD QUESTION
// ============================

export const addQuestion = async (req, res) => {
  try {
    const {
      subject,
      chapter,
      question,
      options,
      correctAnswer,
      difficulty,
    } = req.body;

    if (
      !subject ||
      !chapter ||
      !question ||
      !options ||
      !correctAnswer
    ) {
      return res.status(400).json({
        message: "All required fields are needed",
      });
    }

    const newQuestion = await Question.create({
      userId: req.userId,
      subject,
      chapter,
      question,
      options,
      correctAnswer,
      difficulty,
    });

    res.status(201).json({
      message: "Question added successfully",
      question: newQuestion,
    });
  } catch (error) {
    console.error("ADD QUESTION ERROR:", error);

    res.status(500).json({
      message: "Failed to add question",
    });
  }
};


// ============================
// GET QUESTIONS
// ============================

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({
      userId: req.userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(questions);
  } catch (error) {
    console.error("GET QUESTIONS ERROR:", error);

    res.status(500).json({
      message: "Failed to get questions",
    });
  }
};


// ============================
// SUBMIT ANSWER
// ============================

export const submitAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { answer } = req.body;

    const question = await Question.findOne({
      _id: id,
      userId: req.userId,
    });

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    const isCorrect =
      answer === question.correctAnswer;

    // Only correct answer changes solved status
    if (isCorrect) {
      question.solved = true;
      await question.save();
    }

    res.status(200).json({
      correct: isCorrect,
      solved: question.solved,
    });
  } catch (error) {
    console.error("SUBMIT ANSWER ERROR:", error);

    res.status(500).json({
      message: "Failed to submit answer",
    });
  }
};