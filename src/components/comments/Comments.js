import React from 'react';
import {CommentsHeader} from "./CommentsHeader";
import { AddComment } from './AddComment';

export class Comments extends React.Component {
  render() {
    return(
      <div>
        <CommentsHeader amountComments={this.props.amountComments}/>
        <AddComment />
      </div>
    );
  }
}