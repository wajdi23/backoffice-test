import { User } from "../../../types/user.types";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { IPagination } from "@/src/types/pagination.type";

interface UsersListProps {
  users: User[];
  pagination: IPagination;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onPageChange: (page: number, rows: number) => void;
}
const UsersList: React.FC<UsersListProps> = ({
  users,
  pagination,
  onEdit,
  onDelete,
  onPageChange,
}) => {
  const actionBodyTemplate = (user: User) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          outlined
          severity="info"
          onClick={() => onEdit(user)}
        />
        <Button
          icon="pi pi-trash"
          outlined
          severity="danger"
          onClick={() => onDelete(user)}
        />
      </div>
    );
  };

  const handlePageChange = (event: PaginatorPageChangeEvent) => {
    console.log("initially");

    const newPage = Math.floor(event.first / event.rows) + 1;
    onPageChange(newPage, event.rows);
  };

  return (
    <div>
      <DataTable value={users}>
        <Column field="id" header="Id"></Column>
        <Column field="firstName" header="First name"></Column>
        <Column field="lastName" header="Last name"></Column>
        <Column field="email" header="Email"></Column>

        <Column
          field="dateOfBirth"
          header="Date of Birth"
          body={(rowData) => {
            const date = new Date(rowData.dateOfBirth);
            return date.toLocaleDateString("fr-FR");
          }}
        />

        <Column body={actionBodyTemplate} exportable={false} header="Actions" />
      </DataTable>

      <Paginator
        first={pagination?.page * pagination?.limit - 1}
        rows={pagination?.limit}
        totalRecords={pagination?.totalElements}
        rowsPerPageOptions={[5, 10, 20, 50]}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UsersList;
