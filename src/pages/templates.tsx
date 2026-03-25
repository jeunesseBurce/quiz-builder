import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Code, BookOpen, TrendingUp, Star, ArrowRight } from "lucide-react";
import { Card } from "../components/card";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Badge } from "../components/badge";

export function Templates() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const templates = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      description: "Essential JavaScript concepts for beginners",
      language: "JavaScript",
      questions: 15,
      difficulty: "Beginner",
      uses: 1234,
      rating: 4.8,
      icon: Code,
    },
    {
      id: 2,
      title: "Python Data Structures",
      description: "Lists, tuples, dictionaries, and sets",
      language: "Python",
      questions: 20,
      difficulty: "Intermediate",
      uses: 892,
      rating: 4.7,
      icon: BookOpen,
    },
    {
      id: 3,
      title: "React Components Quiz",
      description: "Test knowledge of React components and props",
      language: "JavaScript",
      questions: 12,
      difficulty: "Intermediate",
      uses: 756,
      rating: 4.9,
      icon: Code,
    },
    {
      id: 4,
      title: "SQL Queries Basics",
      description: "SELECT, JOIN, WHERE, and GROUP BY",
      language: "SQL",
      questions: 18,
      difficulty: "Beginner",
      uses: 1567,
      rating: 4.6,
      icon: BookOpen,
    },
    {
      id: 5,
      title: "Advanced Algorithms",
      description: "Sorting, searching, and optimization",
      language: "Python",
      questions: 25,
      difficulty: "Advanced",
      uses: 432,
      rating: 4.9,
      icon: TrendingUp,
    },
    {
      id: 6,
      title: "CSS Layout Mastery",
      description: "Flexbox, Grid, and responsive design",
      language: "CSS",
      questions: 16,
      difficulty: "Intermediate",
      uses: 643,
      rating: 4.5,
      icon: Code,
    },
  ];

  const categories = [
    { name: "All Templates", count: 24 },
    { name: "JavaScript", count: 8 },
    { name: "Python", count: 6 },
    { name: "SQL", count: 4 },
    { name: "CSS", count: 3 },
    { name: "Algorithms", count: 3 },
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

  const filteredTemplates = templates.filter(
    (template) =>
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.language.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Quiz Templates</h1>
        <p className="text-gray-600">
          Start with a pre-built template and customize it to your needs
        </p>
      </div>

      {/* Search */}
      <div className="mb-8 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="font-medium mb-4">Categories</h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category.name}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors text-left"
                >
                  <span>{category.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Templates Grid */}
        <div className="lg:col-span-3">
          <div className="grid md:grid-cols-2 gap-6">
            {filteredTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <Card key={template.id} className="p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{template.title}</h3>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Badge>{template.language}</Badge>
                    <Badge className={getDifficultyColor(template.difficulty)}>
                      {template.difficulty}
                    </Badge>
                    <Badge variant="outline">{template.questions} questions</Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">{template.rating}</span>
                    </div>
                    <span>{template.uses.toLocaleString()} uses</span>
                  </div>

                  <Button className="w-full" onClick={() => navigate("/create")}>
                    Use Template
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              );
            })}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium text-lg mb-1">No templates found</p>
              <p className="text-sm text-gray-400">Try a different search term</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
