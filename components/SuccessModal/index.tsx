import { Modal, Button, Text, Input, Grid } from "@nextui-org/react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
interface Props {
  visible: boolean;
  closeHandler: () => void;
  message: string;
}
export const SuccessModal = ({ visible, closeHandler, message }: Props) => {
  return (
    <div>
      <Modal
        blur
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        width="600px"
      >
        <>
          <Modal.Header>
            <CheckCircleIcon color="success" fontSize="large" />
            <Text id="modal-title" size={25}>
              Success!
            </Text>
          </Modal.Header>
          <Modal.Body>
            <div className="mx-auto">
              <Text id="modal-title" weight={"light"} size={15}>
                {message}
              </Text>
            </div>
            <Button color="success" auto onPress={() => closeHandler()}>
              Close
            </Button>
          </Modal.Body>
        </>
      </Modal>
    </div>
  );
};
