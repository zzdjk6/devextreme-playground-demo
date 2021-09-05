import React from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

const ExternalViewSwitcher: React.FC<{
  currentViewName: string;
  onChange: any;
}> = ({ currentViewName, onChange }) => (
  <RadioGroup
    aria-label="Views"
    style={{ flexDirection: "row" }}
    name="views"
    value={currentViewName}
    onChange={onChange}
  >
    <FormControlLabel value="Day" control={<Radio />} label="Day" />
    <FormControlLabel value="Week" control={<Radio />} label="Week" />
    <FormControlLabel value="Work Week" control={<Radio />} label="Work Week" />
  </RadioGroup>
);

export default ExternalViewSwitcher;
