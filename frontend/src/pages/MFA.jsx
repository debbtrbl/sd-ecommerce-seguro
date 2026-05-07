import { useState } from "react";

import api from "../services/api";


function MFA({ setStep }) {

  const [code, setCode] = useState("");


  async function verifyMFA(e) {

    e.preventDefault();

    try {

      const response = await api.post(

        "/auth/verify-mfa",

        {
          code
        }

      );


      // Salva token
      localStorage.setItem(
        "token",
        response.data.token
      );


      alert("MFA validado com sucesso!");

      setStep("dashboard");

    } catch (error) {

      console.log(error);

      alert("Código inválido");

    }

  }


  return (

    <div className="min-h-screen bg-lime-200 flex items-center justify-center">

      <div className="bg-lime-100 p-10 rounded-2xl shadow-2xl w-[400px]">

        <h1 className="text-lime-800 text-3xl font-bold text-center mb-2">
          Verificação MFA
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Digite o código enviado para seu email
        </p>

        <form
          onSubmit={verifyMFA}
          className="flex flex-col gap-4"
        >

          <input
            type="text"
            placeholder="Código MFA"
            className="bg-lime-50 text-gray-700 p-3 rounded-lg outline-none"
            onChange={(e) =>
              setCode(e.target.value)
            }
          />

          <button
            type="submit"
            className="bg-lime-600 hover:bg-lime-700 transition-all text-white p-3 rounded-lg font-semibold"
          >
            Validar Código
          </button>

        </form>

      </div>

    </div>

  );

}

export default MFA;