import { useNavigate } from "react-router";
import { Button } from "../components/button";
import { Home } from "lucide-react";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-8 text-center">
      <h1 className="text-6xl mb-4">404</h1>
      <p className="text-xl mb-2">Page Not Found</p>
      <p className="text-sm text-gray-500 mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Button onClick={() => navigate("/")}>
        <Home className="w-4 h-4 mr-2" />
        Go Home
      </Button>
    </div>
  );
}
