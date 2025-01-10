import { ConfirmDialog } from "primereact/confirmdialog";

interface DeleteConfirmDialogProps {
  visible: boolean;
  onHide: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  hideConfirm?: boolean;
}

const DeleteConfirmDialog = ({
  visible,
  onHide,
  onConfirm,
  title,
  message,
  hideConfirm = false,
}: DeleteConfirmDialogProps) => {
  return (
    <ConfirmDialog
      visible={visible}
      onHide={onHide}
      message={message}
      header={title}
      icon="pi pi-exclamation-triangle"
      accept={hideConfirm ? undefined : onConfirm}
      reject={onHide}
      acceptLabel="Yes, delete"
      rejectLabel={hideConfirm ? "Close" : "Cancel"}
      acceptClassName={hideConfirm ? "hidden" : undefined}
    />
  );
};

export default DeleteConfirmDialog;
