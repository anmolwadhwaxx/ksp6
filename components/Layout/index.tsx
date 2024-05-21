import Head from "next/head";
import Image from "next/image";
import { ReactNode } from "react";
import { Navbar, Text, Button, Loading, Dropdown } from "@nextui-org/react";
import { useRouter } from "next/router";

interface Props {
  children: ReactNode;
  email?: string;
  // showWalletOptions: boolean;
  // setShowWalletOptions: (showWalletOptions: boolean) => void;
}

export default function Layout(props: Props) {
  const { children } = props;

  // const { address, isConnecting: accountLoading, connector } = useAccount();
  const { pathname } = useRouter();

  // const renderLabel = () => {
  //   return <span className="truncate max-w-[150px]">{address}</span>;
  // };

  // const renderButton = () => {
  //   if (address) {
  //     return (
  //       <Dropdown>
  //         <Dropdown.Button flat>{renderLabel()}</Dropdown.Button>
  //         <Dropdown.Menu
  //           aria-label="Static Actions"
  //           onAction={connector?.disconnect}
  //         >
  //           <Dropdown.Item key="disconnect">Disconnect</Dropdown.Item>
  //         </Dropdown.Menu>
  //       </Dropdown>
  //     );
  //   }

  //   const disable = accountLoading || showWalletOptions;
  //   return (
  //     <Button
  //       disabled={disable}
  //       auto
  //       ghost
  //       bordered
  //       onClick={() => setShowWalletOptions(true)}
  //     >
  //       {disable ? (
  //         <Loading type="points" color="currentColor" size="sm" />
  //       ) : (
  //         "Connect"
  //       )}
  //     </Button>
  //   );
  // };

  return (
    <div>
      <Head>
        <title>Karnataka State Police - ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್</title>
        <meta
          name="description"
          content="Unleash the power of crypto and fiat with our all-in-one bank account"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar>
        <Navbar.Brand>
          <div className="ml-12">
            <Image src="/icon.png" width={60} height={60} alt="Karnataka State Police - ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್" />
          </div>
          <div style={{ fontSize: '24px', lineHeight: '20px' }}>
      <h1> Karnataka State Police - ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್</h1>
    </div>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
          {pathname !== "/" &&
            pathname !== "/signup" &&
            pathname !== "/login" && (
              <>
                <Navbar.Link isActive={pathname == "/account"} href="/account">
                  Account: {props.email}
                </Navbar.Link>
                {/* <Navbar.Link isActive={pathname == "/loan"} href="/loan">
                  Loans
                </Navbar.Link> */}
              </>
            )}
        </Navbar.Content>
        {/* <Navbar.Content>{renderButton()}</Navbar.Content> */}
      </Navbar>
      {children}
    </div>
  );
}
