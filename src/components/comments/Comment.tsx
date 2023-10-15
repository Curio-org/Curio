import React from "react";
import "./Comment.scss";
import { Image } from "semantic-ui-react";

interface CommentProps {
  userName: string;
  commentText: string;
}

const Comment = (props: CommentProps) => {
  return (
    <div className="comment">
      <Image
        className="user-image"
        src="http://via.placeholder.com/48x48"
        circular
      />
      <div>
        <div className="user-name">{props.userName}</div>
        <span>{props.commentText}</span>
        <div className="comment-actions">{/* Add your components here */}</div>
      </div>
    </div>
  );
};

export default Comment;
