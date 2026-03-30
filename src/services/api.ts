const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const API_TOKEN = import.meta.env.API_TOKEN || "dev-token";

export interface Quiz {
  id: number;
  title: string;
  description: string;
  timeLimitSeconds: number;
  isPublished: boolean;
  createdAt: string;
  questions: Question[];
  status?: "Draft" | "Published";
}

export interface CreateQuizData {
  title: string;
  description: string;
  timeLimitSeconds: number;
  isPublished: boolean;
}

export interface UpdateQuizData {
  title: string;
  description: string;
  isPublished: boolean;
}

export interface Question {
  id: number;
  quizId: number;
  type: "mcq" | "short" | "code";
  prompt: string;
  options?: string[];
  correctAnswer?: string | number;
  position: number;
}

export interface QuizResultData {
  id: number;
  quizId: number;
  userId?: string;
  answers: Array<{ questionId: string; answer: string | number }>;
  score: number;
  percentage: number;
  completedAt: string;
  timeSpent: number;
}

export interface QuizAttempt {
  id: number;
  quizId: number;
  startedAt: string;
  submittedAt: string | null;
  answers: string[];
  quiz: Omit<Quiz, "isPublished" | "createdAt" >;
}

export interface QuizStats {
  totalQuizzes: number;
  activeQuizzes: number;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${API_TOKEN}`,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API Request failed:", error);
      throw error;
    }
  }

  // Quiz CRUD operations
  async getQuizzes(): Promise<Quiz[]> {
    return this.request<Quiz[]>("/quizzes");
  }

  async getQuiz(id: number): Promise<Quiz> {
    return this.request<Quiz>(`/quizzes/${id}`);
  }

  async createQuiz(quiz: Omit<Quiz, "id" | "createdAt" | "updatedAt">): Promise<Quiz> {
    return this.request<Quiz>("/quizzes", {
      method: "POST",
      body: JSON.stringify(quiz),
    });
  }

  async updateQuiz(id: number, quiz: Partial<Quiz>): Promise<Quiz> {
    return this.request<Quiz>(`/quizzes/${id}`, {
      method: "PUT",
      body: JSON.stringify(quiz),
    });
  }

  async deleteQuiz(id: number): Promise<void> {
    return this.request<void>(`/quizzes/${id}`, {
      method: "DELETE",
    });
  }

  async publishQuiz(id: number): Promise<Quiz> {
    return this.request<Quiz>(`/quizzes/${id}/publish`, {
      method: "POST",
    });
  }

  async duplicateQuiz(id: number): Promise<Quiz> {
    return this.request<Quiz>(`/quizzes/${id}/duplicate`, {
      method: "POST",
    });
  }

  async attemptQuiz(id: number): Promise<QuizAttempt> {
    return this.request<QuizAttempt>(`/attempts`, {
      method: "POST",
      body: JSON.stringify({
        quizId: id
      })
    });
  }

  // Quiz Results
  async submitQuizResult(result: Omit<QuizResultData, "id" | "completedAt">): Promise<QuizResultData> {
    return this.request<QuizResultData>("/results", {
      method: "POST",
      body: JSON.stringify(result),
    });
  }

  async getQuizResults(quizId: number): Promise<QuizResultData[]> {
    return this.request<QuizResultData[]>(`/quizzes/${quizId}/results`);
  }

  // Templates
  async getTemplates(): Promise<Quiz[]> {
    return this.request<Quiz[]>("/templates");
  }
}

export const api = new ApiService();
