/* eslint-disable react/prop-types */

const Joke = ({ joke, onDeleteClicked, onSelectClicked, id }) => {
  return (
    <li className="list-group-item align-items-center">
      <div className="input-group align-items-center">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <input
              type="checkbox"
              onChange={(e) => {
                onSelectClicked(id, e.target.checked);
              }}
              aria-label="Checkbox for joke"
            />
          </div>
        </div>
        <p type="text" className="form-control m-0">
          {joke}
        </p>
        <button className="btn btn-danger" onClick={() => onDeleteClicked(id)}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default Joke;
