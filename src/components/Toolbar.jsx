/* eslint-disable react/prop-types */

const Toolbar = ({ isDeleteDisabled, isFetchDisabled, onDeleteSelectedClicked, selectedJokeIds, onFetchMoreClicked}) => {
  return <div className="mb-3">
  <button
    className="btn btn-success me-2"
    disabled={isFetchDisabled}
    onClick={onFetchMoreClicked}
  >
    + Fetch more
  </button>
  <button
    className="btn btn-danger"
    disabled={isDeleteDisabled}
    onClick={onDeleteSelectedClicked}
  >
    Delete selected ({selectedJokeIds.length})
  </button>
</div>;
};

export default Toolbar;
