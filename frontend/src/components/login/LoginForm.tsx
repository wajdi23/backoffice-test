import { AuthForm } from "@/src/types/auth.types";
import {
  validateForm,
  ValidationErrors,
  ValidationRules,
} from "../../../src/utils/validationUtils";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Message } from "primereact/message";

interface LoginFormProps {
  handleSubmit: (formData: AuthForm) => void;
}

const loginValidation: ValidationRules = {
  email: { required: true },
  password: { required: true },
};

const LoginForm: React.FC<LoginFormProps> = ({ handleSubmit }) => {
  const [formData, setFormData] = useState<AuthForm>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const doSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formErrors = validateForm(formData, loginValidation);
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      handleSubmit(formData);
    }
  };
  return (
    <>
      <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={doSubmit} className="flex flex-column gap-4">
        <div className="flex flex-column gap-2">
          <label htmlFor="email">Email</label>
          <InputText
            id="email"
            name="email"
            value={formData.email}
            placeholder="Your email"
            onChange={changeInputValue}
            className="w-full"
          />
          {errors.email && <Message severity="error" text={errors.email} />}
        </div>

        <div className="flex flex-column gap-2">
          <label htmlFor="password">Password</label>
          <InputText
            id="password"
            name="password"
            type="password"
            value={formData.password}
            placeholder="Your password"
            onChange={changeInputValue}
            className="w-full"
          />
          {errors.password && (
            <Message severity="error" text={errors.password} />
          )}
        </div>

        <Button
          label="Login"
          type="submit"
          severity="success"
          icon="pi pi-sign-in"
          className=" mt-2"
        />
      </form>
    </>
  );
};

export default LoginForm;
