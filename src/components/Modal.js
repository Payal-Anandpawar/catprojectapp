const CustomModal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none";

  return (
    <div className={showHideClassName}>
      <div className="container-fluid justify-align-center modal-container">
        <span
          className="modal-close float-right modal-float-right"
          onClick={handleClose}
        >
          <i className="fa fa-times-circle fa-2x"></i>
        </span>
        {children}
      </div>
    </div>
  );
};

export default CustomModal;
