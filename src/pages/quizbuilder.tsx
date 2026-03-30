import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Save,
  Eye,
  GripVertical,
  Trash2,
  Code,
  CheckSquare,
  Type,
  Play,
} from "lucide-react";
import { Card } from "../components/card";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { Textarea } from "../components/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/tabs";
import { Badge } from "../components/badge";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useQuiz, useCreateQuiz, useUpdateQuiz } from "../hooks/useQuizzes";
import type { Question } from "../services";

export function QuizBuilder() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: existingQuiz, isLoading: loadingQuiz } = useQuiz(id);
  const createQuiz = useCreateQuiz();
  const updateQuiz = useUpdateQuiz();

  
  const [quizTitle, setQuizTitle] = useState("Untitled Quiz");
  const [quizDescription, setQuizDescription] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [timeLimit, setTimeLimit] = useState(30);
  const [passingScore, setPassingScore] = useState(70);
  const [status, setStatus] = useState<"Draft" | "Published">("Draft");
  const [activeTab, setActiveTab] = useState("questions");

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      quizId: 1,
      type: "mcq",
      prompt: "What is the output of console.log(typeof null)?",
      options: ["object", "null", "undefined", "number"],
      correctAnswer: 0,
      position: 0,
      points: 10
    },
  ]);

  useEffect(() => {
    if (existingQuiz) {
      setQuizTitle(existingQuiz.title);
      setQuizDescription(existingQuiz.description);
      setTimeLimit(existingQuiz.timeLimitSeconds);
      setQuestions(existingQuiz.questions);
    }
  }, [existingQuiz]);

  const addQuestion = (type: Question["type"]) => {
    const newQuestion: Question = {
        id: Math.random(),
        type,
        ...(type === "mcq" && { options: ["", "", "", ""], correctAnswer: 0 }),
        quizId: 0,
        prompt: "",
        position: 0,
        points: 0
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: number, updates: Partial<Question>) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, ...updates } : q)));
  };

  const deleteQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const saveQuiz = async () => {
    const quizData = {
      id: id,
      title: quizTitle,
      description: quizDescription,
      timeLimitSeconds: timeLimit,
      isPublished: false,
      createdAt: Date.now().toString(),
      status: status,
      questions: questions,
    };

    if (id) {
        updateQuiz.mutate({ id, data: quizData });
      } else {
        createQuiz.mutate(quizData);
      }
  };

  const publishQuiz = async () => {
    const quizData = {
      id: Math.random(),
      title: quizTitle,
      description: quizDescription,
      timeLimitSeconds: timeLimit,
      isPublished: true,
      createdAt: Date.now().toString(),
      questions: questions,
    };

    if (id) {
      updateQuiz.mutate({ id, data: quizData });
    } else {
      createQuiz.mutate(quizData);
    }
  };

  const getQuestionIcon = (type: Question["type"]) => {
    switch (type) {
      case "mcq":
        return CheckSquare;
      case "code":
        return Code;
      case "short":
        return Type;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate("/quizzes")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Quizzes
            </button>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setActiveTab("preview")}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" onClick={() => navigate(`/play/${1}`)}>
                <Play className="w-4 h-4 mr-2" />
                Test Quiz
              </Button>
              <Button variant="outline" onClick={saveQuiz}>
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={publishQuiz}>Publish</Button>
            </div>
          </div>

          <div className="max-w-2xl">
            <Input
              type="text"
              value={quizTitle}
              required
              onChange={(e) => setQuizTitle(e.target.value)}
              className="text-2xl font-bold border-none px-0 focus:ring-0 mb-2 px-4"
              placeholder="Quiz Title"
            />
            <Textarea
              value={quizDescription}
              required
              onChange={(e) => setQuizDescription(e.target.value)}
              className="resize-none border-none px-0 focus:ring-0 px-4"
              placeholder="Add a description..."
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          {/* Questions Tab */}
          <TabsContent value="questions" className="space-y-6">
            <div className="max-w-4xl mx-auto">
              {/* Add Question Buttons */}
              <Card className="p-6 mb-6">
                <h3 className="font-medium mb-4">Add New Question</h3>
                <div className="grid md:grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex-col"
                    onClick={() => addQuestion("mcq")}
                  >
                    <CheckSquare className="w-6 h-6 mb-2" />
                    <span className="font-medium">Multiple Choice</span>
                    <span className="text-xs text-gray-500">4 options with 1 correct</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex-col"
                    onClick={() => addQuestion("code")}
                  >
                    <Code className="w-6 h-6 mb-2" />
                    <span className="font-medium">Code Completion</span>
                    <span className="text-xs text-gray-500">Fill in the blanks</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex-col"
                    onClick={() => addQuestion("short")}
                  >
                    <Type className="w-6 h-6 mb-2" />
                    <span className="font-medium">Short Answer</span>
                    <span className="text-xs text-gray-500">Text-based response</span>
                  </Button>
                </div>
              </Card>

              {/* Questions List */}
              <div className="space-y-4">
                {questions.map((question, index) => {
                  const Icon = getQuestionIcon(question.type);
                  return (
                    <Card key={question.id} className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex items-center gap-3">
                          <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                          <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-medium text-sm">
                            {index + 1}
                          </div>
                        </div>

                        <div className="flex-1 space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <Icon className="w-5 h-5 text-gray-600" />
                              <Badge variant="secondary" className="text-xs">
                                {question.type.replace("-", " ")}
                              </Badge>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteQuestion(question.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          <div>
                            <Label>Question</Label>
                            <Input
                              value={question.prompt}
                              onChange={(e) =>
                                updateQuestion(question.id, { prompt: e.target.value })
                              }
                              placeholder="Enter your question..."
                              className="mt-1"
                            />
                          </div>

                          {question.codeSnippet !== undefined && (
                            <div>
                              <Label>Code Snippet (Optional)</Label>
                              <Textarea
                                value={question.codeSnippet}
                                onChange={(e) =>
                                  updateQuestion(question.id, { codeSnippet: e.target.value })
                                }
                                placeholder="Paste code here..."
                                className="mt-1 font-mono text-sm"
                                rows={4}
                              />
                              {question.codeSnippet && (
                                <div className="mt-2">
                                  <Label className="text-xs text-gray-500 mb-2">Preview:</Label>
                                  <SyntaxHighlighter
                                    language={language}
                                    style={vscDarkPlus}
                                    className="rounded-md text-sm"
                                  >
                                    {question.codeSnippet}
                                  </SyntaxHighlighter>
                                </div>
                              )}
                            </div>
                          )}

                          {question.type === "mcq" && question.options && (
                            <div>
                              <Label>Answer Options</Label>
                              <div className="space-y-2 mt-2">
                                {question.options.map((option, optIndex) => (
                                  <div key={optIndex} className="flex items-center gap-2">
                                    <input
                                      type="radio"
                                      name={`correct-${question.id}`}
                                      checked={question.correctAnswer === optIndex}
                                      onChange={() =>
                                        updateQuestion(question.id, { correctAnswer: optIndex })
                                      }
                                      className="w-4 h-4"
                                    />
                                    <Input
                                      value={option}
                                      onChange={(e) => {
                                        const newOptions = [...question.options!];
                                        newOptions[optIndex] = e.target.value;
                                        updateQuestion(question.id, { options: newOptions });
                                      }}
                                      placeholder={`Option ${optIndex + 1}`}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {questions.length === 0 && (
                <div className="text-center py-16">
                  <Code className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium mb-2">No questions yet</p>
                  <p className="text-sm text-gray-400">Add your first question to get started</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="max-w-2xl mx-auto">
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-6">Quiz Settings</h3>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="language">Programming Language</Label>
                    <select
                      id="language"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm mt-1"
                    >
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                      <option value="java">Java</option>
                      <option value="cpp">C++</option>
                      <option value="csharp">C#</option>
                      <option value="ruby">Ruby</option>
                      <option value="go">Go</option>
                      <option value="rust">Rust</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <select
                      id="difficulty"
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm mt-1"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                    <Input
                      id="timeLimit"
                      type="number"
                      value={timeLimit}
                      onChange={(e) => setTimeLimit(Number(e.target.value))}
                      className="mt-1"
                      min="5"
                      max="180"
                    />
                  </div>

                  <div>
                    <Label htmlFor="passingScore">Passing Score (%)</Label>
                    <Input
                      id="passingScore"
                      type="number"
                      value={passingScore}
                      onChange={(e) => setPassingScore(Number(e.target.value))}
                      className="mt-1"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview">
            <div className="max-w-3xl mx-auto">
              <Card className="p-8">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2">{quizTitle || "Untitled Quiz"}</h1>
                  {quizDescription && (
                    <p className="text-gray-600">{quizDescription}</p>
                  )}
                  <div className="flex items-center gap-4 mt-4">
                    <Badge>{language}</Badge>
                    <Badge>{difficulty}</Badge>
                    <Badge variant="outline">{questions.length} Questions</Badge>
                  </div>
                </div>

                <div className="space-y-8">
                  {questions.map((question, index) => (
                    <div key={question.id} className="pb-8 border-b border-gray-200 last:border-0">
                      <div className="flex items-start gap-3 mb-4">
                        <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-medium">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <h3 className="font-medium text-lg">{question.prompt || "Untitled Question"}</h3>
                          <p className="text-sm text-gray-500 mt-1">{question.points} points</p>
                        </div>
                      </div>

                      {question.codeSnippet && (
                        <div className="mb-4">
                          <SyntaxHighlighter
                            language={language}
                            style={vscDarkPlus}
                            className="rounded-md"
                          >
                            {question.codeSnippet}
                          </SyntaxHighlighter>
                        </div>
                      )}

                      {question.type === "mcq" && question.options && (
                        <div className="space-y-2">
                          {question.options.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                            >
                              <input type="radio" name={`preview-${question.id}`} className="w-4 h-4" />
                              <span>{option || `Option ${optIndex + 1}`}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {question.type === "short" && (
                        <Textarea placeholder="Your answer..." rows={3} />
                      )}
                    </div>
                  ))}
                </div>

                {questions.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No questions to preview. Add questions in the Questions tab.
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}