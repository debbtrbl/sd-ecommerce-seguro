import { useState } from "react";

import Login from "./pages/Login";
import MFA from "./pages/MFA";
import Dashboard from "./pages/Dashboard";


function App() {

  const [step, setStep] = useState("login");


  return (

    <div>

      {step === "login" && (
        <Login setStep={setStep} />
      )}

      {step === "mfa" && (
        <MFA setStep={setStep} />
      )}

      {step === "dashboard" && (
        <Dashboard />
      )}

    </div>

  );

}

export default App;