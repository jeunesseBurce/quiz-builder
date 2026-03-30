// Mock Data Service - Use this for development/testing
// Switch to real API by setting USE_MOCK_DATA = false
import type { Quiz, QuizAttempt, QuizResultData, QuizStats, QuizAttemptSubmit } from "./api";

export const USE_MOCK_DATA = false; // Set to false to use real backend

let mockQuizzes: Quiz[] = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics and core concepts",
    timeLimitSeconds: 300,
    isPublished: true,
    createdAt: "2024-03-20T10:00:00Z",
    questions: [
      {
        id: 1,
        quizId: 1,
        type: "short",
        prompt: "What is the output of console.log(typeof null)?",
        options: ["object", "null", "undefined", "number"],
        correctAnswer: 0,
        position: 0,
        points: 10
      },
      {
        id: 1,
        quizId: 2,
        type: "mcq",
        prompt: "Which method is used to add an element to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correctAnswer: 0,
        position: 1,
        points: 10
      },
      {
        id: 1,
        quizId: 3,
        type: "code",
        prompt: "What will be the value of 'result' after this code executes?",
        options: ["20", "25", "30", "15"],
        correctAnswer: 1,
        position: 3,
        points: 10
      },
    ],
  },
  {
    id: 2,
    title: "React Hooks Deep Dive",
    description: "Advanced concepts in React Hooks including useEffect and custom hooks",
    timeLimitSeconds: 450,
    isPublished: true,
    createdAt: "2024-03-19T10:00:00Z",
    questions: [
      {
        id: 2,
        quizId: 1,
        type: "mcq",
        prompt: "When does useEffect run by default?",
        options: [
          "After every render",
          "Only on mount",
          "Only on unmount",
          "Never",
        ],
        correctAnswer: 0,
        position: 0,
        points: 10
      },
    ],
  },
  {
    id: 3,
    title: "Python Data Structures",
    description: "Lists, tuples, dictionaries, and sets in Python",
    timeLimitSeconds: 400,
    isPublished: false,
    createdAt: "2024-03-18T10:00:00Z",
    questions: [],
  },
];

let mockResults: QuizResultData[] = [];

// Simulate network delay
const delay = (ms: number = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  async getQuizzes(): Promise<Quiz[]> {
    await delay();
    return [...mockQuizzes];
  },

  async getQuiz(id: number): Promise<Quiz> {
    await delay();
    const quiz = mockQuizzes.find((q) => q.id === id);
    if (!quiz) throw new Error("Quiz not found");
    return { ...quiz };
  },

  async createQuiz(quiz: Omit<Quiz, "id" | "createdAt" | "updatedAt">): Promise<Quiz> {
    await delay();
    const newQuiz: Quiz = {
      ...quiz,
      id: Math.random(),
      createdAt: new Date().toISOString()
    };
    mockQuizzes.push(newQuiz);
    return newQuiz;
  },

  async updateQuiz(id: number, updates: Partial<Quiz>): Promise<Quiz> {
    await delay();
    const index = mockQuizzes.findIndex((q) => q.id === id);
    if (index === -1) throw new Error("Quiz not found");
    
    mockQuizzes[index] = {
      ...mockQuizzes[index],
      ...updates,
    };
    return mockQuizzes[index];
  },

  async deleteQuiz(id: number): Promise<void> {
    await delay();
    mockQuizzes = mockQuizzes.filter((q) => q.id !== id);
  },

  async publishQuiz(id: number): Promise<Quiz> {
    await delay();
    const index = mockQuizzes.findIndex((q) => q.id === id);
    if (index === -1) throw new Error("Quiz not found");
    
    mockQuizzes[index] = {
      ...mockQuizzes[index],
      status: "Published",
    };
    return mockQuizzes[index];
  },

  async duplicateQuiz(id: number): Promise<Quiz> {
    await delay();
    const quiz = mockQuizzes.find((q) => q.id === id);
    if (!quiz) throw new Error("Quiz not found");
    
    const newQuiz: Quiz = {
      ...quiz,
      id: Math.random(),
      title: `${quiz.title} (Copy)`,
      status: "Draft",
      createdAt: new Date().toISOString(),
    };
    mockQuizzes.push(newQuiz);
    return newQuiz;
  },

  async attemptQuiz(id: number): Promise<QuizAttempt> {
    await delay();
    const quiz = mockQuizzes.find((q) => q.id === id);
    if (!quiz) throw new Error("Quiz not found");
    const newQuizAttempt: QuizAttempt = {
        id: 1,
        quizId: 2,
        startedAt: "2026-03-29 14:58:12.840",
        submittedAt: null,
        answers: [],
        quiz: {
            id: 2,
            title: "JavaScript Basics",
            description: "A tiny quiz on core JS",
            timeLimitSeconds: 300,
            questions: []
        }
    }
    return newQuizAttempt;
  },

  async submitAttempt(id: number): Promise<QuizAttemptSubmit> {
    await delay();
    const quiz = mockQuizzes.find((q) => q.id === id);
    if (!quiz) throw new Error("Quiz not found");
    const newQuizAttempt: QuizAttemptSubmit = {
       score: 10,
       details: []
    }
    return newQuizAttempt;
  },

  async submitQuizResult(result: Omit<QuizResultData, "id" | "completedAt">): Promise<QuizResultData> {
    await delay();
    const newResult: QuizResultData = {
      ...result,
      id: Math.random(),
      completedAt: new Date().toISOString(),
    };
    mockResults.push(newResult);

    // Update quiz stats
    const quizIndex = mockQuizzes.findIndex((q) => q.id === result.quizId);
    if (quizIndex !== -1) {
      const quiz = mockQuizzes[quizIndex];
      
      mockQuizzes[quizIndex] = {
        ...quiz
      };
    }

    return newResult;
  },

  async getQuizResults(quizId: number): Promise<QuizResultData[]> {
    await delay();
    return mockResults.filter((r) => r.quizId === quizId);
  },

  async getStats(): Promise<QuizStats> {
    await delay();
    const publishedQuizzes = mockQuizzes.filter((q) => q.status === "Published");
    
    return {
      totalQuizzes: mockQuizzes.length,
      activeQuizzes: publishedQuizzes.length
    };
  },

  async getTemplates(): Promise<Quiz[]> {
    await delay();
    return mockQuizzes.filter((q) => q.status === "Published").slice(0, 3);
  },
};
