import { useState } from "react";
import type { NextPage } from "next";
import axios from "axios";
import { Button } from "../components";
import { createWalletAPI } from "../utils/apis/api";
import Router from "next/router";

const createWallet: NextPage = () => {
  const createWalletCall = async () => {
    // calling backend to create wallet
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      const res = await createWalletAPI(user_id);
      localStorage.setItem("wallet_key", JSON.stringify(res.data));
      Router.push("/transfer");
    }
  };
  return (
    <div className="grid h-screen place-items-center">
      <div className="grid place-items-center">
        <Button loading={false} onClick={createWalletCall}>
          Create Wallet
        </Button>
      </div>
    </div>
  );
};

export default createWallet;
