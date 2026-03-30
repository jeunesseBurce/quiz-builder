import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Code, Plus,  MoreVertical, Edit, Trash2, Copy, Play } from "lucide-react";
import { Card } from "../components/card";
import { Button } from "../components/button";
import { Input } from "../components/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/dropdown-menu";
import { useQuizzes, useDeleteQuiz, useDuplicateQuiz } from "../hooks/useQuizzes";

export function QuizList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const { data: quizzes = [], isLoading } = useQuizzes();
  const deleteQuiz = useDeleteQuiz();
  const duplicateQuiz = useDuplicateQuiz();

 
  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this quiz?")) return;
    deleteQuiz.mutate(id);
  };

  const handleDuplicate = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    duplicateQuiz.mutate(id);
  };

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || quiz.status?.toLowerCase() === filterStatus;
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
                  <DropdownMenuItem onClick={(e) => handleDuplicate(quiz.id, e)}>
                    <Copy className="w-4 h-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600" onClick={(e) => handleDelete(quiz.id, e)}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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