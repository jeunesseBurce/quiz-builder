import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../services";
import type { QuizResultData } from "../services";
import { toast } from "sonner";

export function useSubmitQuizResult() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: QuizResultData) => apiClient.submitQuizResult(data),
    onSuccess: () => {
      // Invalidate stats as they might have changed
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      toast.success("Quiz submitted successfully!");
    },
    onError: () => {
      toast.error("Failed to submit quiz");
    },
  });
}
