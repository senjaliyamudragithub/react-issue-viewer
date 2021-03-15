import React from "react";
import Typography from "@material-ui/core/Typography";
import CommentItem from "./CommentItem";

interface Props {
  commentList: {
    node: {
      id: number;
      author: {
        avatarUrl: string;
        name: string;
      };
      createdAt: Date;
      body: string;
    };
  }[];
}

const CommentContainer: React.FC<Props> = ({ commentList }) => {
  if (!commentList.length) {
    return <Typography>No comments available</Typography>;
  }
  
  return (
    <>
      {commentList.map(({ node:comment }) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </>
  );
};

export default CommentContainer;
