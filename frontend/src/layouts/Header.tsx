import { Button } from "primereact/button";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { logout } = useAuth();

  return (
    <>
      <div className="flex justify-content-end">
        <Button
          onClick={logout}
          icon="pi pi-sign-in"
          iconPos="left"
          className="mr-2"
          label="Logout"
        />
      </div>
    </>
  );
};

export default Header;
