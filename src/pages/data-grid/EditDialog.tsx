import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DataGridContext } from "./DataGridContext";
import { v4 as uuid } from "uuid";
import { Form, Formik } from "formik";
import { MemosContext } from "../../contexts/MemosContext";
import { Memo } from "../../models/Memo";
import omit from "lodash/omit";
import { MemoStatus } from "../../models/MemoStatus";
import EditFormContent from "./EditFormContent";

const EditDialog: React.FC = () => {
  const { editingId, setEditingId } = React.useContext(DataGridContext);
  const { getOne, updateOne } = React.useContext(MemosContext);

  const [titleId] = React.useState(uuid());

  const initialValues = React.useMemo<Memo>(() => {
    const memo = getOne(editingId);
    if (!memo) {
      return {
        id: "",
        title: "",
        description: "",
        status: MemoStatus.Active,
        tags: [],
        startAt: null,
        endAt: null,
      };
    }

    return { ...memo };
  }, [editingId, getOne]);

  const handleClose = React.useCallback(() => {
    setEditingId("");
  }, [setEditingId]);

  const handleSubmit = React.useCallback(
    (values: Memo) => {
      updateOne(editingId, omit(values, "id"));
      setEditingId("");
    },
    [updateOne, editingId, setEditingId]
  );

  return (
    <Dialog
      open={Boolean(editingId)}
      onClose={handleClose}
      aria-labelledby={titleId}
      fullWidth
    >
      <DialogTitle id={titleId}>Update</DialogTitle>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        <Form>
          <DialogContent>
            <EditFormContent />
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Save
            </Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
};

export default EditDialog;
