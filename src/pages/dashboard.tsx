import { useNavigate } from "react-router";
import { Plus, Code, TrendingUp, Users, Clock, BookOpen, ArrowRight } from "lucide-react";
import { Card } from "../components/card";
import { Button } from "../components/button";
import { Badge } from "../components/badge";

export function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      label: "Total Quizzes",
      value: "12",
      change: "+2 this week",
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Questions Created",
      value: "48",
      change: "+8 this week",
      icon: Code,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Avg. Completion",
      value: "78%",
      change: "+5% this month",
      icon: TrendingUp,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Active Users",
      value: "234",
      change: "+12 today",
      icon: Users,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const recentQuizzes = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      questions: 10,
      difficulty: "Beginner",
      language: "JavaScript",
      lastEdited: "2 hours ago",
      status: "Published",
    },
    {
      id: 2,
      title: "Python Data Structures",
      questions: 15,
      difficulty: "Intermediate",
      language: "Python",
      lastEdited: "1 day ago",
      status: "Draft",
    },
    {
      id: 3,
      title: "React Hooks Quiz",
      questions: 8,
      difficulty: "Advanced",
      language: "JavaScript",
      lastEdited: "3 days ago",
      status: "Published",
    },
  ];

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your quizzes.</p>
      </div>

      {/* Quick Action */}
      <div className="mb-8">
        <Card className="p-6 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-2xl mb-2">Create Your Next Quiz</h2>
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
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
              <p className="text-xs text-green-600">{stat.change}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Quizzes */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl">Recent Quizzes</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate("/quizzes")}>
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
                    <h3 className="font-medium mb-2">{quiz.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Code className="w-4 h-4" />
                        {quiz.questions} questions
                      </span>
                      <span>•</span>
                      <span>{quiz.language}</span>
                    </div>
                  </div>
                  <Badge
                    className={
                      quiz.status === "Published"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {quiz.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className={getDifficultyColor(quiz.difficulty)}>
                    {quiz.difficulty}
                  </Badge>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {quiz.lastEdited}
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
                      <h3 className="font-medium mb-1">{template.title}</h3>
                      <p className="text-xs text-gray-600 mb-2">{template.description}</p>
                      <p className="text-xs text-gray-500">{template.questions} questions</p>
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
