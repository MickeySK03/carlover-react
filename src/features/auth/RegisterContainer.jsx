import { useState } from "react";
import Modal from "../../components/Modal";
import RegisterPage from "../../pages/RegisterPage";

function RegisterContainer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="text-red-800 text-center hover:underline hover:text-red-600 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        Register
      </div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <RegisterPage />
      </Modal>
    </>
  );
}

export default RegisterContainer;
