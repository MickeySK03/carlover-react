function Modal({ children, open, onClose }) {
  return (
    <>
      {open && (
        <>
          <div className="fixed inset-0 backdrop-brightness-50 z-20 bg-transparent"></div>
          <div className="fixed inset-0 z-30">
            <div className="flex justify-center items-center min-h-screen">
              <div className="rounded-xl bg-white shadow-2xl border">
                <div className="flex justify-between pt-4 pr-4 text-2xl">
                  <div className="invisible">x</div>
                  <div className="cursor-pointer " onClick={onClose}>
                    x
                  </div>
                </div>
                <div className="p-4">{children}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Modal;
