import "../styles/Modal.css";

interface IModal {
  show: boolean;
  sethHow: React.Dispatch<boolean>;
  children: React.ReactNode;
}

export const Modal = (params: IModal) => {
  return (
    <div className="Modal">
      <div className="ModalBody">{params.children}</div>
      <div className="ModalBackground" onClick={() => params.sethHow(false)} />
    </div>
  );
};
