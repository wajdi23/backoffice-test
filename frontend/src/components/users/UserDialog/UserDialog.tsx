import { Dialog } from "primereact/dialog";
import UserForm from "../UserForm/UserForm";
import { CreateUserInput, User } from "@/src/types/user.types";
import { Button } from "primereact/button";
import { useRef, useState } from "react";

interface UserDialogProps {
  visible: boolean;
  onHide: () => void;
  onSubmit: (userData: CreateUserInput, id?: number) => void;
  user: User | undefined;
}

const UserDialog: React.FC<UserDialogProps> = ({
  visible,
  onHide,
  onSubmit,
  user,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [emailError, setEmailError] = useState<string>("");

  const handleSubmit = () => {
    formRef.current?.requestSubmit();
  };

  const handleFormSubmit = async (data: CreateUserInput, id?: number) => {
    try {
      await onSubmit(data, id);
      onHide();
    } catch (err: any) {
      if (err.status === 409) {
        setEmailError("Cette adresse email est déjà utilisée");
      }
    }
  };

  const footerContent = (
    <div>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={onHide}
        className="p-button-text"
      />
      <Button
        label={user ? "Edit" : "Add"}
        icon="pi pi-check"
        onClick={handleSubmit}
        severity="success"
        autoFocus
      />
    </div>
  );

  return (
    <Dialog
      className="user-dialog"
      visible={visible}
      onHide={onHide}
      header={user ? "Edit user" : "New user"}
      footer={footerContent}
      style={{ width: "800px" }}
    >
      <UserForm
        user={user}
        onSubmit={handleFormSubmit}
        ref={formRef}
        emailError={emailError}
        onEmailChange={() => setEmailError("")}
      />
    </Dialog>
  );
};

export default UserDialog;
