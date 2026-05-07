import { useEffect, useState } from "react";
import notebookImage from "../assets/notebook.jpg";
import mouseImage from "../assets/mouse.jpg";
import headphoneImage from "../assets/fone.jpg";
import tecladoImage from "../assets/teclado.jpg";

import api from "../services/api";

function Dashboard() {
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [cardNumber, setCardNumber] = useState("");

  const [cardName, setCardName] = useState("");

  const [cvv, setCvv] = useState("");

  const [paymentMessage, setPaymentMessage] = useState("");

  const [encryptedPreview, setEncryptedPreview] = useState("");

  // Carrega produtos protegidos por JWT
  async function loadProducts() {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(
        "/api/products",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setProducts(response.data.products);
    } catch (error) {
      console.log(error);

      alert("Erro ao carregar produtos");
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  // Processa pagamento seguro
  async function handlePayment() {
    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        "/api/payment",

        {
          cardNumber,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data);

      // Mensagem de sucesso
      setPaymentMessage("Pagamento processado com segurança!");

      // Mostra preview do dado criptografado
      setEncryptedPreview(response.data.encryptedCard);
    } catch (error) {
      console.log(error);

      alert("Erro no pagamento");
    }
  }

  return (
    <div className="min-h-screen bg-lime-200 p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-lime-800 text-4xl font-bold">SystemD Shop :D</h1>

          <p className="text-gray-500 mt-2">
            Plataforma protegida com MFA, JWT e AES
          </p>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");

            window.location.reload();
          }}
          className="bg-red-700 hover:bg-red-800 transition-all text-white px-5 py-3 rounded-lg font-semibold"
        >
          Sair
        </button>
      </div>

      {/* Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-lime-100 p-6 rounded-2xl shadow-xl border border-lime-100"
          >
            {/* Imagem fake */}
            <img
              src={product.id === 1 ? notebookImage : product.id === 2 ? mouseImage : product.id === 3 ? headphoneImage : tecladoImage}
              alt={product.name}
              className="h-48 w-full object-cover rounded-xl mb-5"
            />

            <h2 className="text-lime-800 text-2xl font-semibold mb-3">
              {product.name}
            </h2>

            <p className="text-lime-500 text-2xl font-bold mb-5">
              R$ {product.price}
            </p>

            <button
              onClick={() => {
                setSelectedProduct(product);

                setPaymentMessage("");

                setEncryptedPreview("");
              }}
              className="bg-lime-600 hover:bg-lime-700 transition-all text-white px-5 py-3 rounded-lg font-semibold w-full"
            >
              Comprar Agora
            </button>
          </div>
        ))}
      </div>

      {/* Modal de checkout */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-lime-200 p-8 rounded-2xl w-full max-w-5xl border border-gray-800 flex gap-8">
            {/* Lado esquerdo */}
            <div className="w-1/2">
              <h2 className="text-lime-800 text-3xl font-bold mb-2">
                Checkout Seguro
              </h2>

              <p className="text-gray-500 mb-8">
                Complete a compra com criptografia AES
              </p>

              {/* Resumo */}
              <div className="bg-lime-700 p-5 rounded-xl mb-6">
                <p className="text-lime-400 text-sm mb-2">
                  Produto selecionado
                </p>

                <div className="flex justify-between items-center">
                  <h3 className="text-white text-xl font-semibold">
                    {selectedProduct.name}
                  </h3>

                  <p className="text-lime-200 text-xl font-bold">
                    R$ {selectedProduct.price}
                  </p>
                </div>
              </div>

              {/* Cartão visual */}
              <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 rounded-2xl">
                <div className="flex justify-between items-center mb-10">
                  <p className="text-white text-sm">Cartão Seguro</p>

                  <p className="text-white text-sm">AES Protected</p>
                </div>

                <h3 className="text-white text-3xl tracking-widest mb-8">
                  {cardNumber || "•••• •••• •••• ••••"}
                </h3>

                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-300 text-xs mb-1">TITULAR</p>

                    <p className="text-white">{cardName || "Seu Nome"}</p>
                  </div>

                  <div>
                    <p className="text-gray-300 text-xs mb-1">CVV</p>

                    <p className="text-white">{cvv || "***"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lado direito */}
            <div className="w-1/2 flex flex-col justify-between">
              <div>
                <h3 className="text-lime-800 text-2xl font-semibold mb-6">
                  Dados do Pagamento
                </h3>

                {/* Inputs */}
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Número do cartão"
                    className="bg-lime-100 text-gray-500 p-4 rounded-lg outline-none"
                    onChange={(e) => setCardNumber(e.target.value)}
                    value={cardNumber}
                  />

                  <input
                    type="text"
                    placeholder="Nome no cartão"
                    className="bg-lime-100 text-gray-500 p-4 rounded-lg outline-none"
                    onChange={(e) => setCardName(e.target.value)}
                    value={cardName}
                  />

                  <input
                    type="text"
                    placeholder="CVV"
                    className="bg-lime-100 text-gray-500 p-4 rounded-lg outline-none"
                    onChange={(e) => setCvv(e.target.value)}
                    value={cvv}
                  />
                </div>

                {/* Segurança */}
                <div className="bg-lime-100/30 border border-lime-700 p-4 rounded-xl mt-6">
                  <p className="text-lime-600 font-semibold">
                    🔒 Dados protegidos com AES Encryption
                  </p>
                </div>

                {/* Resultado */}
                {paymentMessage && (
                  <div className="bg-lime-700 p-4 rounded-xl mt-6">
                    <p className="text-lime-200 font-bold mb-4">
                      ✅ {paymentMessage}
                    </p>

                    <p className="text-lime-400 text-sm mb-2">
                      Dados criptografados:
                    </p>

                    <div className="bg-black p-3 rounded-lg overflow-auto">
                      <p className="text-lime-400 text-sm break-all">
                        {encryptedPreview}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Botões */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={handlePayment}
                  className="bg-lime-600 hover:bg-lime-700 transition-all text-white px-5 py-4 rounded-lg font-semibold w-full"
                >
                  Finalizar Compra
                </button>

                <button
                  onClick={() => setSelectedProduct(null)}
                  className="bg-red-700 hover:bg-red-800 transition-all text-white px-5 py-4 rounded-lg font-semibold w-full"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
