/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#f1f3f4", // Cor de fundo personalizada
        secondaryBackground: "#f5f5f5", // Cor de fundo secundária
        headerColor: "#5f6368", // Cor do cabeçalho
        textColor: "#3c4043", // Cor do texto
      },
    },
  },
  plugins: [],
};
