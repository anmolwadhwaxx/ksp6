import { QrReader } from "react-qr-reader";
import adapter from "webrtc-adapter";
interface Props {
  onResult: (email: string) => void;
}
export const QRScanner = ({ onResult }: Props) => {
  return (
    <QrReader
      onResult={(result, error) => {
        if (!!result) {
          onResult(result?.getText());
          //   alert(result?.getText());
        }

        // if (error) {
        //   alert(error);
        // }
      }}
      //this is facing mode : "environment " it will open backcamera of the smartphone and if not found will
      // open the front camera
      constraints={{ facingMode: "environment" }}
      //   style={{ width: "40%", height: "40%" }}
    />
  );
};
