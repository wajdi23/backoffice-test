import { useEffect, useState } from "react";
import { HttpService } from "../services/http.service";
import { CreateUserInput, User } from "../types/user.types";
import UsersList from "../components/users/UsersList/UsersList";
import UserDialog from "../components/users/UserDialog/UserDialog";
import UserToolbar from "../components/users/UserToolbar/UserToolbar";
import { useToast } from "../hooks/useToast";
import { Toast } from "primereact/toast";
import DeleteConfirmDialog from "../components/common/ConfirmDialog";
import {
  PaginatedUsers,
  IPagination,
  PaginateParams,
} from "../types/pagination.type";
import { getUserIdFromToken } from "../utils/token";

const defaultPagination: IPagination = {
  page: 1,
  limit: 5,
  totalPages: 0,
  totalElements: 0,
};

const UsersPage = () => {
  const httpService = new HttpService();
  const [users, setUsers] = useState<User[]>([]);
  const [paginationData, setPaginationData] =
    useState<IPagination>(defaultPagination);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const { toast, success, error } = useToast();
  const currentUserId = getUserIdFromToken();

  const fetchUsers = (params: PaginateParams = {}) => {
    const { page = 1, limit = 5 } = params;
    console.log(params);

    const queryParams: any = {
      page,
      limit,
    };

    httpService
      .get<PaginatedUsers>("/users", queryParams)
      .then((res) => {
        setUsers(res.users);
        setPaginationData(res.paginate);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const initialFetch = { page: 1, limit: 5 };
    fetchUsers(initialFetch);
  }, []);

  const handleAdd = () => {
    setDialogVisible(true);
  };

  const editHandler = (user: User) => {
    // setSelectedUser(user);
    getUserDataById(user.id);
  };

  const deleteHandler = (user: User) => {
    setUserToDelete(user);
  };

  const getUserDataById = (id: number) => {
    httpService
      .get(`/users/${id}`)
      .then((res: any) => {
        setSelectedUser(res);
        setDialogVisible(true);
      })
      .catch(() => {
        error("An error has occured");
      });
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      httpService
        .delete(`/users/${userToDelete.id}`)
        .then(() => {
          success("User has been deleted");
          fetchUsers(paginationData);
        })
        .catch(() => {
          error("An error has occured");
        });
      setUserToDelete(null);
    }
  };

  const hideDialogHandler = () => {
    setDialogVisible(false);
    setSelectedUser(undefined);
  };

  const submitHandler = async (data: CreateUserInput, id?: number) => {
    try {
      if (!id) {
        const response = await httpService.post(`/users`, data);
        fetchUsers(paginationData);
        success("User successfully created");
        return response;
      } else {
        const response = await httpService.put(`/users/${id}`, data);
        success("User successfully edited");
        fetchUsers(paginationData);
        return response;
      }
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 409) {
          throw err.response;
        }
        error(
          "An error has occurred while trying to " +
            (id ? "edit" : "create") +
            " User"
        );
      } else {
        error("A network error has occurred");
      }
      throw err;
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <DeleteConfirmDialog
        visible={userToDelete !== null}
        onHide={() => setUserToDelete(null)}
        onConfirm={handleConfirmDelete}
        title={
          currentUserId === userToDelete?.id ? "Not allowed" : "Are you sure ?"
        }
        message={
          userToDelete
            ? currentUserId === userToDelete.id
              ? `You cannot delete your proper account.`
              : `Are you sure you want to delete this user? ${userToDelete.firstName} ${userToDelete.lastName} ?`
            : ""
        }
        hideConfirm={currentUserId === userToDelete?.id}
      />
      <UserToolbar onAdd={handleAdd} />
      <UsersList
        users={users}
        pagination={paginationData}
        onEdit={editHandler}
        onDelete={deleteHandler}
        onPageChange={(page: number, limit: number) =>
          fetchUsers({ page, limit })
        }
      />
      <UserDialog
        visible={dialogVisible}
        onHide={hideDialogHandler}
        onSubmit={submitHandler}
        user={selectedUser}
      />
    </div>
  );
};

export default UsersPage;
