import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";

interface UserToolbarProps {
  onAdd: () => void;
}

const UserToolbar: React.FC<UserToolbarProps> = ({ onAdd }) => {
  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Add a user"
          icon="pi pi-plus"
          severity="success"
          onClick={onAdd}
        />
      </div>
    );
  };

  return (
    <>
      <Toolbar
        className="mb-4"
        left={leftToolbarTemplate}
        // right={rightToolbarTemplate}
      ></Toolbar>
    </>
  );
};

export default UserToolbar;
