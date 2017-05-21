import { PropTypes } from 'react';

export const UserType = PropTypes.shape({
  first: PropTypes.string.isRequired,
  last: PropTypes.string.isRequired,
});

export const ReviewTypeList = PropTypes.shape({
  'Today/10006': PropTypes.arrayOf(PropTypes.object),
  'Yesterday/10005': PropTypes.arrayOf(PropTypes.object),
  'This Week/10004': PropTypes.arrayOf(PropTypes.object),
  'Last Week/10003': PropTypes.arrayOf(PropTypes.object),
  'This Month/10002': PropTypes.arrayOf(PropTypes.object),
  'Last Month/10001': PropTypes.arrayOf(PropTypes.object),
});

export const OnBlur = PropTypes.func;
export const HandleLoadMore = PropTypes.func;
export const PropTotal = PropTypes.number;
