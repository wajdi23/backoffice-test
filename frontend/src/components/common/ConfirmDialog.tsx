import { ConfirmDialog } from "primereact/confirmdialog";

interface DeleteConfirmDialogProps {
  visible: boolean;
  onHide: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

const DeleteConfirmDialog = ({
  visible,
  onHide,
  onConfirm,
  title,
  message,
}: DeleteConfirmDialogProps) => {
  return (
    <ConfirmDialog
      visible={visible}
      onHide={onHide}
      message={message}
      header={title}
      icon="pi pi-exclamation-triangle"
      accept={onConfirm}
      reject={onHide}
      acceptLabel="Yes, delete"
      rejectLabel="Cancel"
    />
  );
};

export default DeleteConfirmDialog;
