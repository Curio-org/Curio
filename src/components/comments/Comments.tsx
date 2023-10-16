import React from "react";
import CommentsHeader from "./CommentsHeader";
import AddComment from "./AddComment";
import Comment from "./Comment";

interface CommentObject {
  userName: string;
  commentText: string;
}

interface CommentsProps {
  amountComments: number;
  comments: CommentObject[];
}

const Comments: React.FC<CommentsProps> = ({ amountComments, comments }) => {
  const commentComponents = comments.map((comment, index) => (
    <Comment
      key={index}
      userName={comment.userName}
      commentText={comment.commentText}
    />
  ));

  return (
    <div>
      <CommentsHeader amountComments={amountComments} />
      <AddComment />
      {commentComponents}
    </div>
  );
};

export default Comments;
