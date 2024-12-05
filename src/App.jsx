import { useState, useEffect } from "react";

const language = [
  { code: "en", name: "Inglês" },
  { code: "de", name: "Alemão" },
  { code: "es", name: "Espanhol" },
  { code: "fr", name: "Francês" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
];

function App() {
  const [sourceLang, setSourceLang] = useState("pt"); // Texto de Origem
  const [targetLang, setTargetLang] = useState("en"); // Texto para a Tradução
  const [sourceText, setSourceText] = useState(""); // Campo do texto
  const [isLoading, setIsLoading] = useState(false); // Loading para a tradução
  const [translatedText, setTranslatedText] = useState(""); // Resposta do campo do texto
  const [error, setError] = useState(""); // Mensagem de erro

  useEffect(() => {
    // Tempo de resposta para a tradução
    if (sourceText) {
      const play = setTimeout(() => {
        handleTranslate();
      }, 500);
      return () => clearTimeout(play);
    }
  }, [sourceLang, sourceText, targetLang]);

  const handleTranslate = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${sourceText}&langpair=${sourceLang}|${targetLang}`
      );

      // Verificação de Erro!
      if (!response.ok) {
        throw new Error(`HTTP ERROR: ${response.status}`);
      }

      const data = await response.json();
      setTranslatedText(data.responseData.translatedText);
    } catch (error) {
      setError(
        `Erro ao tentar traduzir: ${error.message}. Tente novamente mais tarde!`
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Verificação de Idiomas diferentes
  const swapTranslate = () => {
    if (sourceLang === targetLang) {
      setError(
        "Por favor, para melhor experiência, selecione dois idiomas diferentes."
      );
      return;
    }
    // Troca os idiomas
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };
  // Verificação de Idiomas diferentes
  const handleSourceLangChange = (event) => {
    const newSourceLang = event.target.value;
    if (newSourceLang === targetLang) {
      setError(
        "Por favor, para melhor experiência, selecione dois idiomas diferentes."
      );
      return;
    }
    setSourceLang(newSourceLang);
  };

  const handleTargetLangChange = (event) => {
    const newTargetLang = event.target.value;
    if (newTargetLang === sourceLang) {
      setError(
        "Por favor, para melhor experiência, selecione dois idiomas diferentes."
      );
      return;
    }
    setTargetLang(newTargetLang);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col ">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center ">
          <h1 className="text-headerColor text-2xl font-bold">
            Google_Tradutor
          </h1>
        </div>
      </header>
      <main className="flex-grow flex items-start justify-center px-4 py-8 ">
        <div className="w-full max-w-5xl bg-white rounded-lg shadow-md overflow-hidden ">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 ">
            <select
              value={sourceLang}
              onChange={handleSourceLangChange}
              className="text-sm text-textColor bg-transparent border-none focus:outline-none cursor-pointer"
            >
              {language.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>

            <button
              className="p-2 rounded-full hover:bg-gray-200 outline-none"
              onClick={swapTranslate}
            >
              <svg
                className="w-5 h-5 text-headerColor"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </button>

            <select
              value={targetLang}
              onChange={handleTargetLangChange}
              className="text-sm text-textColor bg-transparent border-none focus:outline-none cursor-pointer"
            >
              {language.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-4">
              <textarea
                value={sourceText}
                onChange={(event) => setSourceText(event.target.value)}
                placeholder="Digite seu texto"
                className="w-full h-40 text-lg text-textColor bg-transparent resize-none border-none outline-none "
              ></textarea>
            </div>

            <div className="p-4 relative bg-secondaryBackground border-l border-gray-100 ">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-800"></div>
                </div>
              ) : (
                <p className="text-lg text-textColor">{translatedText}</p>
              )}
            </div>
          </div>
          {error && (
            <div className="p-4 bg-red-100 border-t-orange-400 text-red-700">
              {error}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto ">
        <div className="max-w-5xl mx-auto px-4 py-3 text-sm text-headerColor">
          {new Date().getFullYear()} Replica Google_Tradutor
        </div>
      </footer>
    </div>
  );
}

export default App;
