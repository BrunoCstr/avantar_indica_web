module.exports = {
  content: [
    "./src/app/(*)/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-purple": "#4A04A5",
        "secondary-purple": "#6500CC",
        "tertiary-purple": "#3E0085",
        "tertiary-purple-opacity": "rgba(62, 0, 133, 0.5)",
        "fourth-purple": "#6800E0",
        "fifth-purple": "#170138",
        "sixteen-purple": "#8822ED",
        pink: "#C252F2",
        blue: "#29F3DF",
        "blue-navigator": "#00D2BE",
        orange: "#E06400",
        "second-orange": "#F28907",
        yellow: "#F1B808",
        "primary-lillac": "#9F8CF2",
        "secondary-lillac": "#B270FF",
        "tertiary-lillac": "#A556FF",
        black: "#000000",
        "purple-black": "#0F0124",
        white: "#F6F3FF",
        "white-navBar": "#E3E3E3",
        "white-btn-modal": "#F4F4F4",
        "white-opacity": "#FFFFFFD4",
        gray: "#CDCDCD",
        red: "#FF0000",
        transparent: "transparent",
        green: "#32CD32",
      },
      fontFamily: {
        sans: ["FamiljenGrotesk-Regular", "sans-serif"],
        familjen: [
            "FamiljenGrotesk-Regular",
            "FamiljenGrotesk-Medium",
            "FamiljenGrotesk-SemiBold",
            "FamiljenGrotesk-Bold",
          ],
      },
      safelist: [
        "bg-[url('/bg_login.png')]",
        "bg-[url('/bg_forgotPassword.png')]",
      ],    
    },
  },
  plugins: [],
};
