import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
    display: "flex",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
  },

  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

enum TodoStatus {
  Todo,
  Wip,
  Done,
}
type TodoOutput = {
  status: TodoStatus;
  content: string;
};
const tagTodo = "#todo";
const tagWip = "#wip";
const tagDone = "#done";
const todoProcessor = (input: string) => {
  console.log("[todoProcessor]");
  console.log(input);
  const lines = input.split("\n").filter((x: string) => x.length > 0);
  console.log(lines);
  const rawOutput = lines.map((x: string) => {
    const inputLower = x.toLowerCase();
    let contentIndex = -1;
    let status: TodoStatus | null = null;
    if (inputLower.indexOf(tagTodo) !== -1) {
      status = TodoStatus.Todo;
      contentIndex = inputLower.indexOf(tagTodo) + tagTodo.length;
    } else if (inputLower.indexOf(tagWip) !== -1) {
      status = TodoStatus.Wip;
      contentIndex = inputLower.indexOf(tagWip) + tagWip.length;
    } else if (inputLower.indexOf(tagDone) !== -1) {
      status = TodoStatus.Done;
      contentIndex = inputLower.indexOf(tagDone) + tagDone.length;
    }
    return {
      status,
      content: status != null ? x.substring(contentIndex) : null,
    } as TodoOutput;
  });
  console.log(rawOutput);

  const filteredOutput = rawOutput.filter((x: TodoOutput) => x.status != null);
  console.log(filteredOutput);

  return filteredOutput;
};

type TemplateRenderProps = {
  content: string;
};
/**
 * 3 list of stuff side by side; todo wip done
 */
const TemplateRender = ({ content }: TemplateRenderProps) => {
  const classes = useStyles();

  const processed = todoProcessor(content);
  const todoItems = processed.filter((x) => x.status == TodoStatus.Todo);
  const wipItems = processed.filter((x) => x.status == TodoStatus.Wip);
  const doneItems = processed.filter((x) => x.status == TodoStatus.Done);

  return (
    <Grid className={classes.root} container spacing={2} direction="column">
      <Grid item xs={12}>
        <Typography variant="h6" className={classes.title}>
          Todo
        </Typography>
        <List>
          {todoItems.map((x) => (
            <React.Fragment>
              <ListItem button>
                <ListItemText primary={x.content} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" className={classes.title}>
          WIP
        </Typography>
        <List>
          {wipItems.map((x) => (
            <React.Fragment>
              <ListItem button>
                <ListItemText primary={x.content} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" className={classes.title}>
          Done
        </Typography>
        <List>
          {doneItems.map((x) => (
            <React.Fragment>
              <ListItem button>
                <ListItemText primary={x.content} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default TemplateRender;
