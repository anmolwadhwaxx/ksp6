import { Dropdown } from "@nextui-org/react";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Input } from "@nextui-org/react";
import { getBalanceAPI } from "../../utils/apis/api";
interface CurrencyInputProps {
  label: string;
  type: "fiat" | "crypto";
  amount: number;
  setAmount: (val: number) => void;
  balance: number;
  width?: string;
  transfer?: boolean;
  output?: boolean;
}

const currencyList = { fiat: ["USD", "RIEL"], crypto: ["ETH", "USDC"] };

export const CurrencyInput = (props: CurrencyInputProps) => {
  const list = currencyList[props.type];
  const [currency, setCurrency] = useState(new Set([list[0]]));
  const [balance, setBalance] = useState({
    eth: 0,
    usd: 0,
  });
  useEffect(() => {
    const getBalances = async () => {
      const user_id = localStorage.getItem("user_id");
      if (user_id) {
        const ethBal = await getBalanceAPI(user_id, "eth");
        const usdBal = await getBalanceAPI(user_id, "cash");
        setBalance({
          eth: ethBal,
          usd: usdBal,
        });
      }
    };
    getBalances();
  }, []);
  const helperText = props.transfer
    ? currency.values().next().value == "ETH"
      ? balance.eth
      : currency.values().next().value == "USDC"
      ? balance.usd
      : 0
    : props.balance;

  const CurrencyDropdown = () => {
    return (
      <Dropdown>
        <Dropdown.Button flat>{currency}</Dropdown.Button>
        <Dropdown.Menu
          aria-label="Single selection actions"
          color="secondary"
          disallowEmptySelection
          selectionMode="single"
          defaultSelectedKeys={currency}
          selectedKeys={currency}
          onAction={(key) => setCurrency(new Set([key.toString()]))}
          disabledKeys={list.slice(1)}
        >
          {list.map((currency) => {
            return <Dropdown.Item key={currency}>{currency}</Dropdown.Item>;
          })}
        </Dropdown.Menu>
      </Dropdown>
    );
  };
  return (
    <div className="flex flex-col md:w-[450px] w-[180px] md:mr-0 mr-9">
      <Input
        type="number"
        contentRight={<CurrencyDropdown />}
        label={props.label}
        value={props.amount}
        onChange={(e) => {
          props.setAmount(parseFloat(e.target.value));
        }}
      />
      {props.output ? null : (
        <div className="text-sm font-light">Balance: {helperText}</div>
      )}
    </div>
  );
};
