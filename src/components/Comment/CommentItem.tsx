import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CommentHeader from "./CommentHeader";

const useStyles = makeStyles((theme) => ({
  body: {
    color: theme.palette.grey[700],
  },
  main: {
    marginTop: theme.spacing(3),
  },
}));

interface Prop {
  comment: {
    author: {
      avatarUrl: string;
      name: string;
    };
    createdAt: Date;
    body: string;
  };
}

const CommentItem: React.FC<Prop> = ({
  comment: { author, createdAt, body },
}) => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      {author.name ? (
        <CommentHeader
          avatarUrl={author.avatarUrl}
          name={author.name}
          createdAt={createdAt}
        />
      ) : (
        "Unknown Author wrote below comment"
      )}
      <Typography className={classes.body}>{body}</Typography>
    </div>
  );
};

export default CommentItem;
