import { useNavigate } from "react-router";
import {
  Plus,
  Code,
  Clock,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { Card } from "../components/card";
import { Button } from "../components/button";
import { Badge } from "../components/badge";
import { useQuizzes } from "../hooks/useQuizzes";

export function Dashboard() {
  const navigate = useNavigate();
  const { data: quizzes, isLoading: quizzesLoading } = useQuizzes();
  const isLoading = quizzesLoading;

  const recentQuizzes = quizzes
    ? [...quizzes]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 3)
    : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const popularTemplates = [
    {
      title: "Algorithm Challenge",
      description: "Test problem-solving skills",
      questions: 12,
      icon: Code,
    },
    {
      title: "Syntax Checker",
      description: "Multiple choice code questions",
      questions: 20,
      icon: BookOpen,
    },
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your
          quizzes.
        </p>
      </div>

      {/* Quick Action */}
      <div className="mb-8">
        <Card className="p-6 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-2xl mb-2">
                Create Your Next Quiz
              </h2>
              <p className="text-purple-100 mb-4">
                Build engaging coding exercises in minutes
              </p>
              <Button
                onClick={() => navigate("/create")}
                variant="secondary"
                className="bg-white text-purple-600 hover:bg-purple-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Quiz
              </Button>
            </div>
            <Code className="w-24 h-24 text-white opacity-20 hidden md:block" />
          </div>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold mb-1">
            
          </p>
          <p className="text-sm text-gray-600 mb-2">
            Total Quizzes
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-2xl font-bold mb-1">
          
          </p>
          <p className="text-sm text-gray-600 mb-2">
            Active Quizzes
          </p>
          <p className="text-xs text-green-600">Published</p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Quizzes */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl">Recent Quizzes</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/quizzes")}
            >
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {recentQuizzes.map((quiz) => (
              <Card
                key={quiz.id}
                className="p-5 cursor-pointer hover:shadow-lg transition-all"
                onClick={() => navigate(`/quiz/${quiz.id}`)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium mb-2">
                      {quiz.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Code className="w-4 h-4" />
                        {quiz.questions?.length} questions
                      </span>
                    </div>
                  </div>
                  <Badge
                    className={
                      quiz.isPublished === true
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {quiz.isPublished === true ? 'Published' : 'Draft'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {new Date(
                      quiz.createdAt,
                    ).toLocaleDateString()}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Templates */}
        <div>
          <h2 className="text-xl mb-4">Popular Templates</h2>
          <div className="space-y-4">
            {popularTemplates.map((template, index) => {
              const Icon = template.icon;
              return (
                <Card
                  key={index}
                  className="p-5 cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => navigate("/templates")}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">
                        {template.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">
                        {template.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {template.questions} questions
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </Card>
              );
            })}

            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/templates")}
            >
              Browse All Templates
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}