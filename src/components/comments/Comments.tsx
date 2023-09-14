import React from 'react';
import {CommentsHeader} from "./CommentsHeader";
import { AddComment } from './AddComment';
import { Comment } from './Comment';

export class Comments extends React.Component {
  render() {
    return(
      <div>
        <CommentsHeader amountComments={this.props.amountComments}/>
        <AddComment />
        <Comment />
        <Comment />
        <Comment />
      </div>
    );
  }
}