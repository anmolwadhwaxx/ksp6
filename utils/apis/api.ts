import axios from "axios";
import { BACKEND_ROOT_URL } from "../constants/apiEndpoints";

export interface SignUp {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  gender: string;
}

const signupAPI = async (data: SignUp) => {
  try {
    const res = await axios.post(BACKEND_ROOT_URL + "/users/create", data);
    localStorage.setItem("user_id", res.data.id);
    localStorage.setItem("email", res.data.email);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const createWalletAPI = async (user_id: string) => {
  try {
    const res = await axios.post(
      BACKEND_ROOT_URL + "/wallets/create/" + user_id
    );
    localStorage.setItem("wallet_key", JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
//return public key
const getWalletAPI = async (user_id: string) => {
  try {
    const res = await axios.get(
      BACKEND_ROOT_URL + "/wallets/retrieve/" + user_id
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const retrieveCryptoPricesAPI = async (token_id: string) => {
  try {
    const res = await axios.post(
      BACKEND_ROOT_URL + "/transactions/cryptoPrices/" + token_id
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getTransLogsAPI = async (user_id: string) => {
  try {
    const res = await axios.get(BACKEND_ROOT_URL + "/transLogs/" + user_id);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const getBalanceAPI = async (user_id: string, token_id?: string) => {
  try {
    if (!token_id) {
      token_id = "all";
    }
    const res = await axios.get(BACKEND_ROOT_URL + "/balances/" + user_id, {
      params: {
        currency: token_id,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const transferAPI = async (
  sender_id: string,
  receiver_id: string,
  amount: number
) => {
  try {
    const res = await axios.post(
      BACKEND_ROOT_URL +
        `/transactions/transfer?from_user_id=${sender_id}&to_user_id=${receiver_id}`,
      {
        type: "transfer",
        amount: amount,
        Date: null,
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
const retrieveWallet = async (user_id: string) => {
  try {
    const res = await axios.get(
      BACKEND_ROOT_URL + "/wallets/retrieveAll/" + user_id
    );
    localStorage.setItem("wallet_key", JSON.stringify(res.data[0]));
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
const ethPriceAPI = async (token_id: string) => {
  try {
    const res = await axios.get(
      BACKEND_ROOT_URL + "/transactions/cryptoPrices/" + token_id
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
};
const getUserFromEmailAPI = async (email: string) => {
  try {
    const res = await axios.get(
      BACKEND_ROOT_URL + "/users/retrieveByEmail/" + email
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
};
const loanAPI = async (user_id: string, amount: number) => {
  try {
    const res = await axios.post(
      BACKEND_ROOT_URL + "/transactions/loan/" + amount + "?user_id=" + user_id
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
};
export {
  signupAPI,
  createWalletAPI,
  getWalletAPI,
  retrieveCryptoPricesAPI,
  getTransLogsAPI,
  getBalanceAPI,
  transferAPI,
  retrieveWallet,
  ethPriceAPI,
  getUserFromEmailAPI,
  loanAPI,
};
