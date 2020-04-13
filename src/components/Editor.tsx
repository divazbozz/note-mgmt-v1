import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  control: {},
}));

type EditorProps = {
  id: string;
  content: string;
  onChange: (value: string, id: string) => void;
  title: string;
  onTitleChange: (value: string, id: string) => void;
  fold: boolean;
  onToggleFold: (val: boolean, id: string) => void;
  onFocus: (val: boolean, id: string) => void;
};
const Editor = ({
  id,
  content,
  title,
  onTitleChange,
  fold,
  onToggleFold,
  onFocus,
  onChange,
}: EditorProps) => {
  const classes = useStyles();
  const onTitleChangeWrapper = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("onTitleChangeWrapper");
    onTitleChange(event.target.value, id);
  };
  const onChangeWrapper = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("onChangeWrapper");
    onChange(event.target.value, id);
  };
  const onToggleWrapper = (_event: React.MouseEvent) => {
    console.log("onToggleWrapper");
    onToggleFold(!fold, id);
  };

  const onFocusWrapper = (_event: React.MouseEvent) => {
    console.log("onFocusWrapper");
    onFocus(true, id);
  };

  return (
    <div className={classes.root}>
      <Grid className={classes.control} container spacing={3}>
        <Grid item xs={6}>
          {/* Editor title */}
          <TextField
            label="title"
            fullWidth={true}
            variant="standard"
            value={title}
            onChange={onTitleChangeWrapper}
          />
        </Grid>
        <Grid item xs={6}>
          {/* Editor control */}
          <Grid container spacing={3} justify={"flex-end"}>
            <Grid item>
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={onToggleWrapper}
              >
                Show/Hide
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={onFocusWrapper}
              >
                Focus
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* Editor input area */}
      {fold ? null : (
        <TextField
          multiline
          label="thoughts"
          value={content}
          onChange={onChangeWrapper}
          variant="outlined"
          fullWidth={true}
        />
      )}
    </div>
  );
};

export default Editor;
