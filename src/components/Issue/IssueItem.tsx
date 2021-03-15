import React from "react";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { makeStyles } from "@material-ui/core/styles";
import CommentIcon from "@material-ui/icons/Comment";
import Badge from "@material-ui/core/Badge";
import StateIcon from "../Utils/StateIcon";
import dateTransformer from "../../helpers/dateTransformer";

const useStyles = makeStyles((theme) => {
  return {
    primary: {
      color: theme.palette.grey[900],
    },
  };
});

interface Props {
  node: {
    comments: {
      totalCount: number;
    };
    id: number;
    number: number;
    state: string;
    title: string;
    createdAt: string;
    author: {
      name: string;
    };
  };
}

const IssueItem: React.FC<Props> = ({ node }) => {
  const classes = useStyles();
  return (
    <ListItem>
      <ListItemAvatar>
        <StateIcon state={node.state} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography className={classes.primary}> {node.title} </Typography>
        }
        secondary={
          <>
            {`#  ${node.number}`}
            <Typography component="span" variant="body2">
              {` opened on ${dateTransformer(node.createdAt)} by ${
                node.author.name
              }`}
            </Typography>
          </>
        }
      />
      {node.comments.totalCount > 0 && (
        <Badge
          badgeContent={node.comments.totalCount}
          color="primary"
          data-testid="comment-badge"
        >
          <CommentIcon color="disabled" />
        </Badge>
      )}
    </ListItem>
  );
};

export default IssueItem;
