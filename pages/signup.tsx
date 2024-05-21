import { useState } from "react";
import { NextPage } from "next";
import { signupAPI, createWalletAPI, retrieveWallet } from "../utils/apis/api";
import { Layout } from "../components";
import { Button, Card, Input } from "@nextui-org/react";
import Router from "next/router";

export interface SignUp {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPass: string;
  gender: string; // Add gender field
}

const Signup: NextPage = () => {
  const [signupDetails, setSignupDetails] = useState<SignUp>({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPass: "",
    gender: "", // Initialize gender field
  });

  const handleChange = (e: { target: { value: string; name: string } }) => {
    const { value, name } = e.target;
    setSignupDetails((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   const { email } = signupDetails;
  //   const allowedEmails = ["psi@ksp.com", "pi@ksp.com", "dysp@ksp.com"];
    
  //   if (allowedEmails.includes(email)) {
  //     localStorage.setItem("email", signupDetails.email);
  //     Router.push("/dashboard1.html"); // Redirect to dashboard1.html if email is in the allowed list
  //     return; // Prevent further execution of signupAPI
  //   }


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const allowedEmails = ["psi@ksp.com", "pi@ksp.com", "dysp@ksp.com"];
    const { email } = signupDetails;

    if (!allowedEmails.includes(email)) {
      alert(`Please use one of the following emails: ${allowedEmails.join(", ")}`);
      return;
    }

    // Your form submission logic

    // Redirect to dashboard on another port
    // window.location.href = "http://localhost:5500/index.html"; // Replace with the URL of your dashboard
    localStorage.setItem("email", email);

    // Redirect to the dashboard1.html page with the email as a query parameter
    Router.push({
      pathname: "/index1.html",
      query: { email: email }
    });

    await signupAPI({
      username: signupDetails.username,
      email: signupDetails.email,
      firstName: signupDetails.firstName,
      lastName: signupDetails.lastName,
      password: signupDetails.password,
      gender: signupDetails.gender, // Include gender in the API call
    });
    await createWalletCall();
  };

  const createWalletCall = async () => {
    // calling backend to create wallet
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      const res = await createWalletAPI(user_id);
      const res1 = await retrieveWallet(user_id);
      // Router.push("/dashboard1.html");
    }
  };

  return (
    <Layout>
      <div className="md:w-[400px] w-[350px] mx-auto">
        <Card
          css={{
            marginTop: "4rem",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Card.Body>
            <form
              className="px-4 py-4"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
             <h1 className="mb-8 text-3xl text-center">Login</h1>
              <Input
                type="text"
                className="mb-4"
                fullWidth
                name="email"
                placeholder="Please Enter Your Email ID"
                value={signupDetails.email}
                onChange={handleChange}
              />

              <Input
                type="password"
                className="mb-4"
                fullWidth
                name="password"
                placeholder="Please Enter Your Password"
                value={signupDetails.password}
                onChange={handleChange}
              />

              <Button type="submit" css={{ width: "100%" }}>
               Submit
              </Button>
            </form>
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
};

export default Signup;


// "scripts": {
//   "dev": "next dev",
//   "build": "next build",
//   "start": "next start",
//   "lint": "next lint",
//   "test": "jest --watch",