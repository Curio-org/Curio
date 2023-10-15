import React from "react";
import { CommentsHeader } from "./CommentsHeader";
import AddComment from "./AddComment";
import { Comment } from "./Comment";

// Define a type for your comment objects
interface CommentObject {
  userName: string;
  commentText: string;
}

interface CommentsProps {
  amountComments: number;
  comments: CommentObject[];
}

export class Comments extends React.Component<CommentsProps> {
  render() {
    const commentComponents = this.props.comments.map((comment, index) => (
      <Comment
        key={index}
        userName={comment.userName}
        commentText={comment.commentText}
      />
    ));

    return (
      <div>
        <CommentsHeader amountComments={this.props.amountComments} />
        <AddComment />
        {commentComponents}
      </div>
    );
  }
}
