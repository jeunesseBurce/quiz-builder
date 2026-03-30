import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../services";
import type { Quiz, UpdateQuizData } from "../services";
import { toast } from "sonner";

// Query Keys
export const quizKeys = {
  all: ["quizzes"] as const,
  lists: () => [...quizKeys.all, "list"] as const,
  list: (filters?: string) => [...quizKeys.lists(), { filters }] as const,
  details: () => [...quizKeys.all, "detail"] as const,
  detail: (id: string) => [...quizKeys.details(), id] as const,
  templates: () => [...quizKeys.all, "templates"] as const,
};

// Queries
export function useQuizzes() {
  return useQuery({
    queryKey: quizKeys.lists(),
    queryFn: () => apiClient.getQuizzes(),
  });
}

export function useQuiz(id: string | undefined) {
  return useQuery({
    queryKey: quizKeys.detail(id!),
    queryFn: () => apiClient.getQuiz(id!),
    enabled: !!id,
  });
}

export function useTemplates() {
  return useQuery({
    queryKey: quizKeys.templates(),
    queryFn: () => apiClient.getTemplates(),
  });
}

// Mutations
export function useCreateQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Quiz) => apiClient.createQuiz(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: quizKeys.lists() });
      toast.success("Quiz created successfully!");
    },
    onError: () => {
      toast.error("Failed to create quiz");
    },
  });
}

export function useUpdateQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateQuizData }) =>
      apiClient.updateQuiz(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: quizKeys.lists() });
      queryClient.invalidateQueries({ queryKey: quizKeys.detail(variables.id) });
      toast.success("Quiz updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update quiz");
    },
  });
}

export function useDeleteQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => apiClient.deleteQuiz(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: quizKeys.lists() });
      toast.success("Quiz deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete quiz");
    },
  });
}

export function useDuplicateQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => apiClient.duplicateQuiz(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: quizKeys.lists() });
      toast.success("Quiz duplicated successfully");
    },
    onError: () => {
      toast.error("Failed to duplicate quiz");
    },
  });
}
