import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { Button, Card, Grid, Text, Loading } from "@nextui-org/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Layout } from "../components";
import { CurrencyInput } from "../components/CurrencyInput";
import { getBalanceAPI, loanAPI, ethPriceAPI } from "../utils/apis/api";
import { SuccessModal } from "../components/SuccessModal";
import Router from "next/router";

const Loan: NextPage = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [depositAmount, setDepositAmount] = useState<any>("");
  const [collateralAmount, setCollateralAmount] = useState<any>("");
  const [ethBalance, setEthBalance] = useState(0);
  const [usdBalance, setUsdBalance] = useState(0);
  const [email, setEmail] = useState<string>();
  const [ethPrice, setEthPrice] = useState<number>(0);
  useEffect(() => {
    const check = localStorage.getItem("email");
    if (check) {
      setEmail(check);
    }
  }, []);
  useEffect(() => {
    const getEthBalance = async () => {
      const user_id = localStorage.getItem("user_id");
      if (user_id) {
        const bal = await getBalanceAPI(user_id, "eth");
        const usdBal = await getBalanceAPI(user_id, "cash");
        const ethPrice = await ethPriceAPI("ethereum");
        setEthPrice(ethPrice);
        setEthBalance(bal);
        setUsdBalance(usdBal);
      }
    };
    getEthBalance();
  }, []);

  const handleDepositInput = (val: number) => {
    setDepositAmount(val);
    setCollateralAmount(val / (ethPrice * 2));
  };

  const handleCollateralInput = (val: number) => {
    setDepositAmount((val * ethPrice) / 2.0);
    setCollateralAmount(val);
  };

  const handleLoan = async () => {
    const user_id = localStorage.getItem("user_id");
    setLoading(true);
    if (user_id) {
      const res = await loanAPI(user_id, collateralAmount);
      setLoading(false);
      setShowSuccess(true);
    }
  };
  const closeRedirect = () => {
    setShowSuccess(false);
    Router.push("/account");
  };
  return (
    <Layout email={email}>
      <div className="mt-8 text-center">
        <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
          }}
          weight="bold"
        >
          Borrow On Your Crypto
        </Text>
        <Text b>Put your crypto to work. Why sell when you can hodl?</Text>
      </div>
      <Card
        css={{
          mw: "90%",
          marginTop: "4rem",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Card.Body>
          <Grid.Container gap={2} justify="center">
            <Grid xs={5} justify="center">
              <CurrencyInput
                label="Credit Amount"
                type="fiat"
                amount={depositAmount}
                setAmount={handleDepositInput}
                balance={usdBalance}
              />
            </Grid>
            <Grid
              xs={2}
              justify="flex-end"
              alignItems="center"
              direction="column"
            >
              <SwapHorizIcon fontSize="large" />
              <Text>50% LTV</Text>
            </Grid>
            <Grid xs={5} justify="flex-start">
              <CurrencyInput
                label="Collateral Required"
                type="crypto"
                amount={collateralAmount}
                setAmount={handleCollateralInput}
                balance={ethBalance}
              />
            </Grid>
            <Grid justify="center">
              <Button color="success" onPress={() => handleLoan()}>
                {loading ? (
                  <Loading color="currentColor" size="sm" />
                ) : (
                  <div>Borrow Now</div>
                )}
              </Button>
            </Grid>
          </Grid.Container>
        </Card.Body>
      </Card>
      <SuccessModal
        message="Transfer has been successfully made!"
        visible={showSuccess}
        closeHandler={() => closeRedirect()}
      />
    </Layout>
  );
};

export default Loan;
