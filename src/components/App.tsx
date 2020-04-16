import React, { useEffect, useState } from "react";
import {
  EditorType,
  EditorListType,
  onEditorsAdd,
  onEditorRenderVisibleChange,
  onEditorDataContentChange,
  onEditorDataTitleChange,
  onEditorRenderFoldChange,
  subscribeEditorsValueChange,
  onEditorRemove,
} from "../data/DataModel";
import Editor from "./Editor";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Login from "./Login";
import Toolbar from "@material-ui/core/Toolbar";
import * as firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
  gridControl: {
    position: "sticky",
    top: "10px",
    margin: "20px",
    padding: "10px",
    backgroundColor: "#eaedf0",
  },
  controlRoot: {
    margin: "20px",
    padding: "10px",
    backgroundColor: "#eaedf0",
  },
  controlButton: {
    margin: "10px",
  },
  gridRoot: {
    margin: "20px",
    padding: "10px",
    backgroundColor: "#d6e9fe",
  },
  gridPaper: {
    padding: theme.spacing(2),
    paddingRight: theme.spacing(4),
  },
}));

const BlockGrid = () => {
  const classes = useStyles();
  // state: columns
  const [numColumns, _setNumColumns] = React.useState(1);
  const setNumColumns = (event: React.ChangeEvent<{ value: unknown }>) => {
    _setNumColumns(event.target.value as number);
  };

  // state: editor data
  const [editorData, setEditorData] = React.useState([] as EditorListType);
  // fetch data on load
  useEffect(
    () => {
      console.log("useEffect");
      // sync
      subscribeEditorsValueChange(setEditorData);
    },
    [] // only run on mount & unmount
  );

  // create blockGrid data
  const columns: object[][] = [];
  for (let i = 0; i < numColumns; i++) {
    columns.push([]);
  }
  editorData
    .filter((x: EditorType) => x.render.visible)
    .forEach((x: EditorType, idx: number) => {
      const colIndex = idx % numColumns;
      columns[colIndex].push(
        <Grid key={idx} item>
          <Editor
            id={x.id}
            {...x.data}
            {...x.render}
            onFocus={onEditorRenderVisibleChange}
            onToggleFold={onEditorRenderFoldChange}
            onTitleChange={onEditorDataTitleChange}
            onChange={onEditorDataContentChange}
            onDelete={onEditorRemove}
          />
        </Grid>
      );
    });
  const colXs = numColumns === 1 ? 12 : 6;
  const columnComponents = columns.map((x, idx) => {
    return (
      <Grid key={idx} item xs={colXs}>
        <Paper className={classes.gridPaper}>
          <Grid container direction="column" justify="center" spacing={2}>
            {x}
          </Grid>
        </Paper>
      </Grid>
    );
  });
  return (
    <div className={classes.root}>
      {/* block controls */}
      <Grid container className={classes.gridControl} spacing={2}>
        <Grid item xs={3}>
          <Button
            className={classes.controlButton}
            variant="contained"
            color="primary"
            onClick={onEditorsAdd}
          >
            Add Editor
          </Button>
        </Grid>
        <Grid item xs={3}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">
              Number of Columns
            </InputLabel>
            <Select value={numColumns} onChange={setNumColumns}>
              <MenuItem value={1}>One</MenuItem>
              <MenuItem value={2}>Two</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {/* blocks */}
      <Grid container className={classes.gridRoot} spacing={2}>
        {columnComponents}
      </Grid>
    </div>
  );
};

export default function App() {
  const [isLogined, setIsLogined] = useState(false);
  firebase.auth().onAuthStateChanged((fbUser) => {
    if (fbUser) {
      // user is signed in
      console.log(fbUser);
      setIsLogined(true);
    } else {
      console.log("not logged in ");
      setIsLogined(false);
    }
  });
  const onLogout = (_event: React.MouseEvent) => {
    console.log("signing out");
    firebase.auth().signOut();
  };
  return (
    <React.Fragment>
      <AppBar position="sticky">
        <Toolbar>
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {isLogined ? <BlockGrid /> : <Login />}
    </React.Fragment>
  );
}
