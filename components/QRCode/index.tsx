import { Modal, Button, Text, Input, Grid, Loading } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { SuccessModal } from "../SuccessModal";
import { useQRCode } from "next-qrcode";

interface Props {
  visible: boolean;
  closeHandler: () => void;
  email: string;
}
export const QRCode = ({ visible, closeHandler, email }: Props) => {
  const { Canvas } = useQRCode();
  const [showSuccess, setShowSuccess] = useState(false);

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
            <Text id="modal-title" b size={18}>
              My Wallet QR
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Text size={18} className="mx-auto">
              Scan QR code to receive payments
            </Text>
            <div className="mx-auto">
              <Canvas
                text={email}
                options={{
                  level: "M",
                  margin: 3,
                  scale: 4,
                  width: 200,
                  color: {
                    dark: "#010599FF",
                    light: "#FFFFFF",
                  },
                }}
              />
            </div>
          </Modal.Body>
        </>
      </Modal>
      <SuccessModal
        message="Transfer has been successfully made!"
        visible={showSuccess}
        closeHandler={() => setShowSuccess(false)}
      />
    </div>
  );
};
