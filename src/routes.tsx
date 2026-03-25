import { createBrowserRouter } from "react-router";
import { QuizLayout } from "./ui/QuizLayout";
import { Dashboard } from "./pages/dashboard";
import { QuizList } from "./pages/quizlist";
import { QuizBuilder } from "./pages/quizbuilder";
import { Templates } from "./pages/templates";
import { QuizProfile } from "./pages/quizprofile";
import { NotFound } from "./pages/notfound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: QuizLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "quizzes", Component: QuizList },
      { path: "create", Component: QuizBuilder },
      { path: "quiz/:id", Component: QuizBuilder },
      { path: "templates", Component: Templates },
      { path: "profile", Component: QuizProfile },
      { path: "*", Component: NotFound },
    ],
  },
]);