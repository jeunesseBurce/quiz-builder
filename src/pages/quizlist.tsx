import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Code, Plus, Filter, Clock, MoreVertical, Edit, Trash2, Copy, Play } from "lucide-react";
import { Card } from "../components/card";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Badge } from "../components/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/dropdown-menu";

export function QuizList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const quizzes = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      description: "Test your knowledge of JavaScript basics",
      questions: 10,
      difficulty: "Beginner",
      language: "JavaScript",
      lastEdited: "2 hours ago",
      status: "Published",
      completions: 145,
    },
    {
      id: 2,
      title: "Python Data Structures",
      description: "Master lists, tuples, and dictionaries",
      questions: 15,
      difficulty: "Intermediate",
      language: "Python",
      lastEdited: "1 day ago",
      status: "Draft",
      completions: 0,
    },
    {
      id: 3,
      title: "React Hooks Quiz",
      description: "Deep dive into useState, useEffect, and more",
      questions: 8,
      difficulty: "Advanced",
      language: "JavaScript",
      lastEdited: "3 days ago",
      status: "Published",
      completions: 89,
    },
    {
      id: 4,
      title: "SQL Query Basics",
      description: "Learn SELECT, JOIN, and WHERE clauses",
      questions: 12,
      difficulty: "Beginner",
      language: "SQL",
      lastEdited: "5 days ago",
      status: "Published",
      completions: 203,
    },
    {
      id: 5,
      title: "CSS Flexbox & Grid",
      description: "Modern layout techniques",
      questions: 10,
      difficulty: "Intermediate",
      language: "CSS",
      lastEdited: "1 week ago",
      status: "Draft",
      completions: 0,
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

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.language.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || quiz.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl mb-2">My Quizzes</h1>
            <p className="text-gray-600">Manage and organize your coding quizzes</p>
          </div>
          <Button onClick={() => navigate("/create")}>
            <Plus className="w-4 h-4 mr-2" />
            New Quiz
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search quizzes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("all")}
          >
            All
          </Button>
          <Button
            variant={filterStatus === "published" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("published")}
          >
            Published
          </Button>
          <Button
            variant={filterStatus === "draft" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("draft")}
          >
            Drafts
          </Button>
        </div>
      </div>

      {/* Quiz Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz) => (
          <Card key={quiz.id} className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{quiz.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{quiz.description}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate(`/quiz/${quiz.id}`)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="w-4 h-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
              <span className="flex items-center gap-1">
                <Code className="w-4 h-4" />
                {quiz.questions} questions
              </span>
              <span>•</span>
              <span>{quiz.language}</span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <Badge className={getDifficultyColor(quiz.difficulty)}>{quiz.difficulty}</Badge>
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

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                {quiz.lastEdited}
              </div>
              {quiz.status === "Published" && (
                <span className="text-xs text-gray-600">{quiz.completions} completions</span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => navigate(`/quiz/${quiz.id}`)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              {quiz.status === "Published" && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/play/${quiz.id}`);
                  }}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Take Quiz
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {filteredQuizzes.length === 0 && (
        <div className="text-center py-16">
          <Code className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium text-lg mb-1">No quizzes found</p>
          <p className="text-sm text-gray-400 mb-6">
            {searchQuery ? "Try a different search term" : "Create your first quiz to get started"}
          </p>
          {!searchQuery && (
            <Button onClick={() => navigate("/create")}>
              <Plus className="w-4 h-4 mr-2" />
              Create Quiz
            </Button>
          )}
        </div>
      )}
    </div>
  );
}