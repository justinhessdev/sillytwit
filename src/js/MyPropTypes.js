import { PropTypes } from 'react';

export const PropReviewTypeList = PropTypes.shape({
  'Today/10006': PropTypes.arrayOf(PropTypes.object),
  'Yesterday/10005': PropTypes.arrayOf(PropTypes.object),
  'This Week/10004': PropTypes.arrayOf(PropTypes.object),
  'Last Week/10003': PropTypes.arrayOf(PropTypes.object),
  'This Month/10002': PropTypes.arrayOf(PropTypes.object),
  'Last Month/10001': PropTypes.arrayOf(PropTypes.object),
});

export const PropOnBlur = PropTypes.func;
export const PropHandleLoadMore = PropTypes.func;
export const PropTotal = PropTypes.number;
export const PropHandleRating = PropTypes.func;
export const PropRating = PropTypes.string;
