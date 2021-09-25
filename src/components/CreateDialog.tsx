import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MemoEditContext } from "../contexts/MemoEditContext";
import { v4 as uuid } from "uuid";
import { Form, Formik } from "formik";
import { MemosContext } from "../contexts/MemosContext";
import { Memo } from "../models/Memo";
import { MemoStatus } from "../models/MemoStatus";
import EditFormContent from "../pages/data-grid/EditFormContent";

const CreateDialog: React.FC = () => {
  const { isCreating, setIsCreating } = React.useContext(MemoEditContext);
  const { addOne } = React.useContext(MemosContext);
  const [titleId] = React.useState(uuid());

  const initialValues = React.useMemo<Memo>(() => {
    return {
      id: uuid(),
      title: "",
      description: "",
      status: MemoStatus.Active,
      tags: [],
      startAt: null,
      endAt: null,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCreating]);

  const handleClose = React.useCallback(() => {
    setIsCreating(false);
  }, [setIsCreating]);

  const handleSubmit = React.useCallback(
    (values: Memo) => {
      addOne(values);
      setIsCreating(false);
    },
    [addOne, setIsCreating]
  );

  return (
    <Dialog
      open={isCreating}
      onClose={handleClose}
      aria-labelledby={titleId}
      fullWidth
      scroll="body"
    >
      <DialogTitle id={titleId}>Create</DialogTitle>
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

export default CreateDialog;
