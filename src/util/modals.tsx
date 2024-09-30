import { ReactNode } from "react";
import { Button, Modal } from "react-bootstrap";

interface Iprops {
  show: boolean;
  handleClose: () => void;
  handleClick: () => void;
  title: string;
  children: ReactNode;
  btntitle: string;
  colorbtn: string;
}

const Modals = ({
  show,
  handleClose,
  handleClick,
  title,
  btntitle,
  children,
  colorbtn,
}: Iprops) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer className="d-block">
        <Button variant={`${colorbtn}`} onClick={handleClick}>
          {btntitle}
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Modals;
