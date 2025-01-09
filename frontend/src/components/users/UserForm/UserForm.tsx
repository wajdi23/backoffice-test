import { CreateUserInput, User } from "@/src/types/user.types";
import {
  validateForm,
  ValidationErrors,
  ValidationRules,
} from "../../../utils/validationUtils";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { forwardRef, useState } from "react";

const userValidations: ValidationRules = {
  firstName: { required: true },
  lastName: { required: true },
  email: { required: true, email: true },
  password: { required: true, password: true },
  dateOfBirth: { required: true, dateOfBirth: true },
};

interface UserFormProps {
  user: User | undefined;
  onSubmit: (userData: CreateUserInput, id?: number) => void;
  emailError?: string;
  onEmailChange?: () => void;
}
const UserForm = forwardRef<HTMLFormElement, UserFormProps>(
  ({ user, onSubmit, emailError, onEmailChange }, ref) => {
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [formData, setFormData] = useState<CreateUserInput>({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      password: user?.password || "",
      dateOfBirth: user?.dateOfBirth ? new Date(user?.dateOfBirth) : null,
    });

    const onSubmitHandle = (e: React.FormEvent) => {
      e.preventDefault();

      const formErrors = validateForm(formData, userValidations);
      setErrors(formErrors);

      if (Object.keys(formErrors).length === 0) {
        const submitData = {
          ...formData,
          dateOfBirth: formData.dateOfBirth
            ? new Date(
                formData.dateOfBirth.getTime() -
                  formData.dateOfBirth.getTimezoneOffset() * 60 * 1000
              )
            : null,
        };
        onSubmit(submitData, user?.id);
      }
    };

    const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (name === "email" && onEmailChange) {
        onEmailChange();
      }
    };

    return (
      <form ref={ref} onSubmit={onSubmitHandle}>
        <div className="grid">
          <div className="col-6">
            <div className="flex flex-column gap-2">
              <label htmlFor="firstName">First Name</label>
              <InputText
                className={errors.firstName ? "p-invalid" : ""}
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={changeInputValue}
              />
              {errors.firstName && (
                <Message severity="error" text={errors.firstName} />
              )}
            </div>
          </div>
          <div className="col-6">
            <div className="flex flex-column gap-2">
              <label htmlFor="lastName">Last Name</label>
              <InputText
                className={errors.lastName ? "p-invalid" : ""}
                id="lastName"
                name="lastName"
                aria-describedby="username-help"
                value={formData.lastName}
                onChange={changeInputValue}
              />
              {errors.lastName && (
                <Message severity="error" text={errors.lastName} />
              )}
            </div>
          </div>
        </div>
        <div className="grid">
          <div className="col-6">
            {" "}
            <div className="flex flex-column gap-2">
              <label htmlFor="email">Email</label>
              <InputText
                className={errors.email ? "p-invalid" : ""}
                id="email"
                name="email"
                aria-describedby="username-help"
                value={formData.email}
                onChange={changeInputValue}
              />
              {(errors.email || emailError) && (
                <Message severity="error" text={errors.email || emailError} />
              )}
            </div>
          </div>
          <div className="col-6">
            {" "}
            <div className="flex flex-column gap-2">
              <label htmlFor="password">Password</label>
              <InputText
                className={errors.password ? "p-invalid" : ""}
                id="password"
                name="password"
                aria-describedby="username-help"
                value={formData.password}
                onChange={changeInputValue}
              />
              {errors.password && (
                <Message
                  severity="error"
                  text={errors.password}
                  style={{ whiteSpace: "normal", wordBreak: "break-word" }}
                />
              )}
            </div>
          </div>
        </div>
        <div className="grid">
          <div className="col-6">
            {" "}
            <div className="flex flex-column gap-2">
              <label htmlFor="dateOfBirth">Date of birth</label>

              <Calendar
                value={formData.dateOfBirth}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    dateOfBirth: e.value,
                  }))
                }
                dateFormat="dd/mm/yy"
                showIcon
              />
              {errors.dateOfBirth && (
                <Message severity="error" text={errors.dateOfBirth} />
              )}
            </div>
          </div>
        </div>
      </form>
    );
  }
);

export default UserForm;
