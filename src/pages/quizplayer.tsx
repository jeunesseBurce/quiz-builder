import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  Code,
  Flag,
  Send,
  AlertCircle,
} from "lucide-react";
import { Card } from "../components/card";
import { Button } from "../components/button"
import { Badge } from "../components/badge";
import { Progress } from "../components/progress";
import { Textarea } from "../components/textarea";
import { RadioGroup, RadioGroupItem } from "../components/radio-group";
import { Label } from "../components/label";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "sonner";

interface Question {
  id: string;
  type: "multiple-choice" | "code-completion" | "short-answer";
  title: string;
  codeSnippet?: string;
  options?: string[];
  correctAnswer?: string | number;
  points: number;
}

interface Answer {
  questionId: string;
  answer: string | number;
}

export function QuizPlayer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes in seconds

  // Mock quiz data
  const quiz = {
    id: id || "1",
    title: "JavaScript Fundamentals Quiz",
    description: "Test your knowledge of JavaScript basics and core concepts",
    language: "javascript",
    difficulty: "Beginner",
    timeLimit: 30,
    passingScore: 70,
    questions: [
      {
        id: "1",
        type: "multiple-choice" as const,
        title: "What is the output of console.log(typeof null)?",
        codeSnippet: "console.log(typeof null);",
        options: ["object", "null", "undefined", "number"],
        correctAnswer: 0,
        points: 10,
      },
      {
        id: "2",
        type: "multiple-choice" as const,
        title: "Which method is used to add an element to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correctAnswer: 0,
        points: 10,
      },
      {
        id: "3",
        type: "code-completion" as const,
        title: "What will be the value of 'result' after this code executes?",
        codeSnippet: `let x = 5;
let y = 10;
let result = x + y * 2;`,
        options: ["20", "25", "30", "15"],
        correctAnswer: 1,
        points: 15,
      },
      {
        id: "4",
        type: "short-answer" as const,
        title: "Explain what a closure is in JavaScript in your own words.",
        points: 15,
      },
      {
        id: "5",
        type: "multiple-choice" as const,
        title: "Which of the following is NOT a JavaScript data type?",
        options: ["String", "Boolean", "Float", "Symbol"],
        correctAnswer: 2,
        points: 10,
      },
    ] as Question[],
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  const totalPoints = quiz.questions.reduce((sum, q) => sum + q.points, 0);
  const answeredQuestions = answers.length;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const getAnswer = (questionId: string) => {
    return answers.find((a) => a.questionId === questionId)?.answer;
  };

  const setAnswer = (questionId: string, answer: string | number) => {
    setAnswers((prev) => {
      const existing = prev.findIndex((a) => a.questionId === questionId);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { questionId, answer };
        return updated;
      }
      return [...prev, { questionId, answer }];
    });
  };

  const goToNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const submitQuiz = () => {
    if (answers.length < quiz.questions.length) {
      const unanswered = quiz.questions.length - answers.length;
      toast.error(`You have ${unanswered} unanswered question${unanswered > 1 ? "s" : ""}`);
      return;
    }
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    let totalScore = 0;

    quiz.questions.forEach((question) => {
      const userAnswer = getAnswer(question.id);
      if (userAnswer !== undefined && userAnswer === question.correctAnswer) {
        correct++;
        totalScore += question.points;
      }
    });

    return { correct, totalScore, percentage: (totalScore / totalPoints) * 100 };
  };

  if (showResults) {
    const score = calculateScore();
    const passed = score.percentage >= quiz.passingScore;

    return (
      <div className="min-h-screen bg-gray-50 p-6 lg:p-8">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8">
            <div className="text-center mb-8">
              <div
                className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
                  passed
                    ? "bg-green-100"
                    : "bg-red-100"
                }`}
              >
                {passed ? (
                  <CheckCircle className="w-12 h-12 text-green-600" />
                ) : (
                  <AlertCircle className="w-12 h-12 text-red-600" />
                )}
              </div>
              <h1 className="text-3xl font-bold mb-2">
                {passed ? "Congratulations!" : "Quiz Complete"}
              </h1>
              <p className="text-gray-600">
                {passed ? "You passed the quiz!" : "Keep practicing!"}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100">
                <p className="text-3xl font-bold text-blue-600 mb-1">{score.correct}</p>
                <p className="text-sm text-gray-600">Correct Answers</p>
                <p className="text-xs text-gray-500 mt-1">out of {quiz.questions.length}</p>
              </Card>
              <Card className="p-6 text-center bg-gradient-to-br from-purple-50 to-purple-100">
                <p className="text-3xl font-bold text-purple-600 mb-1">{score.totalScore}</p>
                <p className="text-sm text-gray-600">Total Score</p>
                <p className="text-xs text-gray-500 mt-1">out of {totalPoints} points</p>
              </Card>
              <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-green-100">
                <p className="text-3xl font-bold text-green-600 mb-1">
                  {Math.round(score.percentage)}%
                </p>
                <p className="text-sm text-gray-600">Percentage</p>
                <p className="text-xs text-gray-500 mt-1">
                  {quiz.passingScore}% required to pass
                </p>
              </Card>
            </div>

            <div className="space-y-4 mb-8">
              <h2 className="font-semibold text-lg">Answer Review</h2>
              {quiz.questions.map((question, index) => {
                const userAnswer = getAnswer(question.id);
                const isCorrect = userAnswer === question.correctAnswer;

                return (
                  <Card key={question.id} className="p-5">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isCorrect ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                        <span
                          className={`text-sm font-medium ${
                            isCorrect ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium mb-2">{question.title}</p>
                        {question.type === "multiple-choice" && question.options && (
                          <div className="text-sm space-y-1">
                            <p className="text-gray-600">
                              Your answer:{" "}
                              <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                                {question.options[userAnswer as number]}
                              </span>
                            </p>
                            {!isCorrect && (
                              <p className="text-gray-600">
                                Correct answer:{" "}
                                <span className="text-green-600">
                                  {question.options[question.correctAnswer as number]}
                                </span>
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                      <Badge className={isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {isCorrect ? `+${question.points}` : "0"} pts
                      </Badge>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => navigate("/")}>
                Back to Dashboard
              </Button>
              <Button className="flex-1" onClick={() => window.location.reload()}>
                Retake Quiz
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              Exit Quiz
            </button>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span className="font-medium">{formatTime(timeRemaining)}</span>
              </div>
              <Badge variant="outline">
                {answeredQuestions}/{quiz.questions.length} Answered
              </Badge>
            </div>
          </div>

          <div>
            <h1 className="text-xl font-semibold mb-2">{quiz.title}</h1>
            <div className="flex items-center gap-3">
              <Progress value={progress} className="flex-1 h-2" />
              <span className="text-sm text-gray-600 whitespace-nowrap">
                {currentQuestionIndex + 1} of {quiz.questions.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 lg:p-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Question Navigator - Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4 sticky top-24">
              <h3 className="font-medium mb-4">Questions</h3>
              <div className="grid grid-cols-5 lg:grid-cols-4 gap-2">
                {quiz.questions.map((question, index) => {
                  const isAnswered = answers.some((a) => a.questionId === question.id);
                  const isCurrent = index === currentQuestionIndex;

                  return (
                    <button
                      key={question.id}
                      onClick={() => goToQuestion(index)}
                      className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
                        isCurrent
                          ? "bg-purple-600 text-white"
                          : isAnswered
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
              <Button
                className="w-full mt-6"
                onClick={submitQuiz}
                disabled={answers.length < quiz.questions.length}
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Quiz
              </Button>
            </Card>
          </div>

          {/* Question Content */}
          <div className="lg:col-span-3">
            <Card className="p-8">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-medium">
                      {currentQuestionIndex + 1}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{currentQuestion.title}</h2>
                      <p className="text-sm text-gray-500 mt-1">{currentQuestion.points} points</p>
                    </div>
                  </div>
                  <Badge variant="outline">{quiz.difficulty}</Badge>
                </div>

                {currentQuestion.codeSnippet && (
                  <div className="mb-6">
                    <SyntaxHighlighter
                      language={quiz.language}
                      style={vscDarkPlus}
                      className="rounded-lg"
                    >
                      {currentQuestion.codeSnippet}
                    </SyntaxHighlighter>
                  </div>
                )}
              </div>

              {/* Answer Options */}
              <div className="mb-8">
                {currentQuestion.type === "multiple-choice" && currentQuestion.options && (
                  <RadioGroup
                    value={getAnswer(currentQuestion.id)?.toString()}
                    onValueChange={(value) => setAnswer(currentQuestion.id, parseInt(value))}
                  >
                    <div className="space-y-3">
                      {currentQuestion.options.map((option, index) => (
                        <div
                          key={index}
                          className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                            getAnswer(currentQuestion.id) === index
                              ? "border-purple-600 bg-purple-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setAnswer(currentQuestion.id, index)}
                        >
                          <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                          <Label
                            htmlFor={`option-${index}`}
                            className="flex-1 cursor-pointer font-normal"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                )}

                {currentQuestion.type === "short-answer" && (
                  <Textarea
                    placeholder="Type your answer here..."
                    rows={6}
                    value={(getAnswer(currentQuestion.id) as string) || ""}
                    onChange={(e) => setAnswer(currentQuestion.id, e.target.value)}
                    className="resize-none"
                  />
                )}

                {currentQuestion.type === "code-completion" && currentQuestion.options && (
                  <RadioGroup
                    value={getAnswer(currentQuestion.id)?.toString()}
                    onValueChange={(value) => setAnswer(currentQuestion.id, parseInt(value))}
                  >
                    <div className="space-y-3">
                      {currentQuestion.options.map((option, index) => (
                        <div
                          key={index}
                          className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                            getAnswer(currentQuestion.id) === index
                              ? "border-purple-600 bg-purple-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setAnswer(currentQuestion.id, index)}
                        >
                          <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                          <Label
                            htmlFor={`option-${index}`}
                            className="flex-1 cursor-pointer font-mono font-normal"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={goToPrevious}
                  disabled={currentQuestionIndex === 0}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                {currentQuestionIndex < quiz.questions.length - 1 ? (
                  <Button onClick={goToNext}>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={submitQuiz}>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Quiz
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
