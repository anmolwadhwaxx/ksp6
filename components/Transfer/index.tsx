import { Modal, Button, Text, Input, Grid, Loading } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { CurrencyInput } from "../CurrencyInput";
import {
  transferAPI,
  ethPriceAPI,
  getUserFromEmailAPI,
} from "../../utils/apis/api";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { SuccessModal } from "../SuccessModal";
import { QRScanner } from "../QRScanner";
interface Props {
  visible: boolean;
  closeHandler: () => void;
  setReload: (reload: boolean) => void;
}
export const Transfer = ({ visible, closeHandler, setReload }: Props) => {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [step, setStep] = useState<number>(0);
  const [targetUser, setTargetUser] = useState<string>();
  const [depositAmount, setDepositAmount] = useState<number>(0);
  const [ethPrice, setEthPrice] = useState<number>(0);
  const [outputAmount, setOutputAmount] = useState<number>(0);
  const [targetUserName, setTargetUserName] = useState("");
  const [qrScanner, setQrScanner] = useState<boolean>(false);

  useEffect(() => {
    const getBalances = async () => {
      const ethPrice = await ethPriceAPI("ethereum");
      setEthPrice(ethPrice);
    };
    getBalances();
  }, []);

  const handleOutputInput = (val: number) => {
    setOutputAmount(val);
    setDepositAmount(val / ethPrice);
  };

  const handleDepositInput = (val: number) => {
    setDepositAmount(val);
    setOutputAmount(ethPrice * val);
  };

  const handleTransfer = async () => {
    const user = localStorage.getItem("user_id");
    if (user && targetUser) {
      setLoading(true);
      await transferAPI(user, targetUser, depositAmount);
      setLoading(false);
      closeHandler();
      setShowSuccess(true);
      setReload(true);
    }
  };
  const handleUser = (e: any) => {
    e.preventDefault();
    setTargetUser(e.target.value);
  };
  const handleNext = async () => {
    if (targetUser) {
      const res = await getUserFromEmailAPI(targetUser);
      console.log(targetUser);
      setTargetUser(res.id);
      setTargetUserName(res.firstName + " " + res.lastName);
      setStep(1);
    }
  };
  const onResult = (email: string) => {
    setQrScanner(false);
    setTargetUser(email);
  };
  return (
    <div>
      <Modal
        blur
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        width="80%"
      >
        {step == 0 ? (
          <>
            <Modal.Header>
              <Text id="modal-title" size={18}>
                Enter{" "}
                <Text b size={18}>
                  Recipient Details
                </Text>
              </Text>
            </Modal.Header>
            <Modal.Body>
              {qrScanner ? (
                <QRScanner onResult={onResult} />
              ) : (
                <div className="flex mx-auto">
                  <Button size="sm" onClickCapture={() => setQrScanner(true)}>
                    Scan QR Code
                  </Button>
                </div>
              )}
              <Input
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Scale +91 Hackathon User"
                value={targetUser}
                onChange={handleUser}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button auto onPress={handleNext}>
                Next
              </Button>
            </Modal.Footer>
          </>
        ) : (
          <>
            <Modal.Header>
              <Text id="modal-title" size={18}>
                Transfer to Recipient:
              </Text>
              <div className="text-lg text-blue-600">{targetUserName}</div>
            </Modal.Header>
            <Modal.Body>
              <Grid.Container gap={2} justify="center">
                <Grid xs={12} justify="center">
                  <CurrencyInput
                    transfer={true}
                    width={"400px"}
                    label="Transfer Amount"
                    type="crypto"
                    amount={depositAmount}
                    setAmount={handleDepositInput}
                    balance={0}
                  />
                </Grid>
                <Grid xs={2} justify="center" alignItems="flex-end">
                  <ArrowDownwardIcon fontSize="large" />
                </Grid>
                <Grid xs={12} justify="center">
                  <CurrencyInput
                    output={true}
                    label="Recipient Receives"
                    type="fiat"
                    width={"400px"}
                    amount={outputAmount}
                    setAmount={handleOutputInput}
                    balance={0}
                  />
                </Grid>
                <Grid justify="center">
                  <Button
                    className="my-3"
                    auto
                    onPress={() => handleTransfer()}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loading color="currentColor" size="sm" />
                    ) : (
                      <div>Transfer</div>
                    )}
                  </Button>
                </Grid>
              </Grid.Container>
            </Modal.Body>
          </>
        )}
      </Modal>
      <SuccessModal
        message="Transfer has been successfully made!"
        visible={showSuccess}
        closeHandler={() => setShowSuccess(false)}
      />
    </div>
  );
};
