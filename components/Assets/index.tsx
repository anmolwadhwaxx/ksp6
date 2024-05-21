import { Button, Card, Text, Table, User } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { ethPriceAPI, getBalanceAPI } from "../../utils/apis/api";
interface Props {
  handler: () => void;
  openQr: () => void;
  reload: boolean;
  setReload: (reload: boolean) => void;
  wallet: string;
}
export const Asset = ({
  handler,
  reload,
  setReload,
  wallet,
  openQr,
}: Props) => {
  const [balance, setBalance] = useState({
    total: 0,
    eth: 0,
    usd: 0,
  });
  const [ethQuantity, setEthQuantity] = useState(0);
  useEffect(() => {
    const getBalances = async () => {
      const user_id = localStorage.getItem("user_id");
      if (user_id && reload) {
        const ethBal = await getBalanceAPI(user_id, "eth");
        const usdBal = await getBalanceAPI(user_id, "cash");
        const totalBal = await getBalanceAPI(user_id, "all");
        const ethPrice = await ethPriceAPI("ethereum");
        localStorage.setItem("eth_price", ethPrice);
        setEthQuantity(ethBal);
        setBalance({
          total: totalBal,
          eth: ethBal * ethPrice,
          usd: usdBal,
        });
        setReload(false);
      }
    };
    getBalances();
  }, [reload]);
  return (
    <div>
      <Card
        css={{
          mw: "90%",
          marginTop: "4rem",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Card.Header>
          <div className="flex justify-between w-full">
            <div className="flex flex-col text-xl">
              <Text b>Primary</Text>
              <Text b>
                $ {balance.total ? balance.total.toFixed(2) : 0} USD
              </Text>
            </div>
            <div className="flex flex-row my-auto">
              <Button size="xs" onClick={handler}>
                Trade
              </Button>
              <Button size="xs" onClick={openQr} className="ml-2">
                MY QR
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Divider />
        <div className="mt-2 ml-3 text-xs md:text-base">
          Wallet Address: {wallet}
        </div>
        <Card.Body>
          <div className="flex flex-col">
            <div className="flex flex-row my-2 text-sm font-light md:text-base">
              <div className="mx-2 font-bold underline underline-offset-8 decoration-teal-400">
                Balances
              </div>
              <div className="mx-2">Grow Balances</div>
              <div className="mx-2">Transaction History</div>
              <div className="mx-2">Transfer History</div>
            </div>
            <Table
              aria-label="Example table with static content"
              css={{
                height: "auto",
                minWidth: "100%",
              }}
            >
              <Table.Header>
                <Table.Column>Currency</Table.Column>
                <Table.Column>Notional Balance</Table.Column>
                <Table.Column>Quantity</Table.Column>
              </Table.Header>
              <Table.Body>
                <Table.Row key="1">
                  <Table.Cell>
                    <User
                      squared
                      src={`/images/usd.png`}
                      name={"USD"}
                      css={{ p: 0 }}
                    ></User>
                  </Table.Cell>
                  <Table.Cell>
                    ${balance.usd ? balance.usd.toFixed(2) : 0} USD
                  </Table.Cell>
                  <Table.Cell>---</Table.Cell>
                </Table.Row>
                <Table.Row key="2">
                  <Table.Cell>
                    <User
                      squared
                      src={`/images/eth.png`}
                      name={"ETH"}
                      css={{ p: 0 }}
                    ></User>
                  </Table.Cell>
                  <Table.Cell>
                    ${balance.eth ? balance.eth.toFixed(2) : 0} USD
                  </Table.Cell>
                  <Table.Cell>
                    {ethQuantity ? ethQuantity.toFixed(2) : 0} ETH
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
