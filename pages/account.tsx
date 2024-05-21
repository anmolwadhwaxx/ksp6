import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { Layout } from "../components";

const AccountFooter: NextPage = () => {
  const [email, setEmail] = useState<string>();
  const [walletKey, setWalletKey] = useState<string>();
  const [dashboardSrc, setDashboardSrc] = useState<string>(
    "https://app.powerbi.com/view?r=eyJrIjoiN2M3ODU5ODctMWQwYi00YWY2LWIwN2ItMGYyOGYyOTY4ZjdiIiwidCI6IjliZDg4NmM5LWY1MzItNDM0NS1hMmNlLWRhZjZlOTg5OGQzMiIsImMiOjN9"
  );

  // useEffect(() => {
  //   const check = localStorage.getItem("email");
  //   const check1 = localStorage.getItem("wallet_key");
  //   if (check && check1) {
  //     setEmail(check);
  //     setWalletKey(JSON.parse(check1).publicKey);
  //   }
  // }, []);

  useEffect(() => {
    const check = localStorage.getItem("email");
    if (check) {
      setEmail(check);
    }
  }, []);

  const handleDashboardChange = (dashboardNumber: number) => {
    // Update iframe source based on the dashboard number
    if (dashboardNumber === 1) {
      setDashboardSrc("URL_FOR_DASHBOARD_1");
    } else if (dashboardNumber === 2) {
      setDashboardSrc("URL_FOR_DASHBOARD_2");
    } else if (dashboardNumber === 3) {
      setDashboardSrc("URL_FOR_DASHBOARD_3");
    }
  };

  return (
    <Layout email={email}>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          {/* Your main content here */}
          <iframe
            src={dashboardSrc}
            className="mt-4 mx-auto"
            width="800"
            height="600"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          {/* <iframe class="airtable-embed" src="https://airtable.com/embed/appYFUDrCDg24ubSf/shrxE35dpRYuTuAyg?backgroundColor=yellow&viewControls=on" frameborder="0" onmousewheel="" width="100%" height="533" style="background: transparent; border: 1px solid #ccc;"></iframe> */}
        </main>
        <footer className="bg-gray-800 text-white py-4 text-center fixed bottom-0 w-full flex justify-center">
          <div className="flex space-x-4 mt-2">
            {email === "psi@ksp.com" && (
              <>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDashboardChange(1)}
                >
                  Dashboard 1
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDashboardChange(2)}
                >
                  Dashboard 2
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDashboardChange(3)}
                >
                  Dashboard 3
                </button>
              </>
            )}
            {email === "pi@ksp.com" && (
              <>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDashboardChange(2)}
                >
                  Dashboard 2
                </button>
              </>
            )}
            {email === "dysp@ksp.com" && (
              <>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDashboardChange(3)}
                >
                  Dashboard 3
                </button>
              </>
            )}
          </div>
        </footer>
      </div>
    </Layout>
  );
};


export default AccountFooter;
