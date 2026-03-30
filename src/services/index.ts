// Unified API client - automatically uses mock or real API
import { api } from "./api";
import { mockApi, USE_MOCK_DATA } from "./mockApi";

// Export the appropriate API based on configuration
export const apiClient = USE_MOCK_DATA ? mockApi : api;

export type { Quiz, Question, QuizResultData, CreateQuizData, UpdateQuizData, QuizStats, QuizAttempt } from "./api";
