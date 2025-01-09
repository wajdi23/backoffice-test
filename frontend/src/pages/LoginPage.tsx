import { useNavigate } from "react-router-dom";
import { HttpService } from "../services/http.service";
import { Card } from "primereact/card";
import LoginForm from "../components/login/LoginForm";
import { useToast } from "../hooks/useToast";
import { Toast } from "primereact/toast";
import { AuthForm, LoginResponse } from "../types/auth.types";

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast, success, error } = useToast();

  const httpService = new HttpService();

  const handleSubmit = async (formData: AuthForm) => {
    try {
      const response = await httpService.post<LoginResponse>(
        "/auth/login",
        formData
      );
      localStorage.setItem("token", response.token);
      navigate("/users");
      success("Welcome");
    } catch {
      error("Wrong email or password");
    }
  };

  return (
    <div className="flex align-items-center justify-content-center min-h-screen bg-gray-100">
      <Toast ref={toast} />
      <Card className="w-full md:w-6 lg:w-3">
        <LoginForm handleSubmit={handleSubmit} />
      </Card>
    </div>
  );
};

export default LoginPage;
