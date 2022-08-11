import { createPortal } from "react-dom";

const Modal = ({ children }: any) => {
  return createPortal(
    <div className="absolute z-20 top-0 w-full flex justify-center">
      <div className="w-screen h-screen bg-black/40"></div>
      <div className="absolute top-16 w-96 mx-auto p-4 bg-white rounded-xl">
        {children}
      </div>
    </div>,
    window.document.body
  );
};

export default Modal;
