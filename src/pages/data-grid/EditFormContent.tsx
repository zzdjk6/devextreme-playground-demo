import MuiGrid from "@material-ui/core/Grid";
import { Field } from "formik";
import { Select, TextField } from "formik-material-ui";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { MemoStatus } from "../../models/MemoStatus";
import { DateTimePicker } from "formik-material-ui-pickers";
import React from "react";

const EditFormContent: React.FC = () => {
  return (
    <MuiGrid container direction={"column"} spacing={4} alignItems={"stretch"}>
      <MuiGrid item>
        <Field component={TextField} name="id" label="ID" disabled fullWidth />
      </MuiGrid>
      <MuiGrid item>
        <Field component={TextField} name="title" label="Title" fullWidth />
      </MuiGrid>
      <MuiGrid item>
        <Field
          component={TextField}
          name="description"
          label="Description"
          fullWidth
          multiline
          minRows={3}
          maxRows={6}
        />
      </MuiGrid>
      <MuiGrid item>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Field component={Select} name="status">
            <MenuItem value={MemoStatus.Active}>Active</MenuItem>
            <MenuItem value={MemoStatus.Complete}>Complete</MenuItem>
          </Field>
        </FormControl>
      </MuiGrid>
      <MuiGrid item>
        <MuiGrid container spacing={2}>
          <MuiGrid item xs={6}>
            <Field
              component={DateTimePicker}
              label="Start At"
              name="startAt"
              fullWidth
            />
          </MuiGrid>
          <MuiGrid item xs={6}>
            <Field
              component={DateTimePicker}
              label="End At"
              name="endAt"
              fullWidth
            />
          </MuiGrid>
        </MuiGrid>
      </MuiGrid>
    </MuiGrid>
  );
};

export default EditFormContent;
