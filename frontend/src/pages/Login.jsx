import { useState } from "react";

import api from "../services/api";


function Login({ setStep }) {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");


  async function handleLogin(e) {

    e.preventDefault();

    try {

      await api.post(

        "/auth/login",

        {
          email,
          password
        }

      );

      alert("Código MFA enviado para o email!");

      setStep("mfa");

    } catch (error) {

      console.log(error);

      alert("Erro no login");

    }

  }


  return (

    <div className="min-h-screen bg-lime-200 flex items-center justify-center">


      <div className="bg-lime-100 p-10 rounded-2xl shadow-2xl w-[400px]">

        <h1 className="text-lime-800 text-3xl font-bold text-center mb-8">
        Faça seu Login :D
        </h1>
        

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4"
        >

          <input
            type="email"
            placeholder="Email"
            className="bg-lime-50 text-gray-700 p-3 rounded-lg outline-none"
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Senha"
            className="bg-lime-50 text-gray-700 p-3 rounded-lg outline-none"
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="submit"
            className="bg-lime-600 hover:bg-lime-700 transition-all text-white p-3 rounded-lg font-semibold"
          >
            Entrar
          </button>

        </form>

      </div>

    </div>

  );

}

export default Login;