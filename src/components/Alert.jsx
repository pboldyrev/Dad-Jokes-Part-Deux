/* eslint-disable react/prop-types */
const Alert = ({ children }) => {
  return (
    <div className="alert alert-danger" role="alert">
      { children }
    </div>
  );
};

export default Alert;
