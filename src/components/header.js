import React from "react";
import { useDarkMode } from "../context/darkModeContext";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { MdLightMode } from "react-icons/md";

function Header() {
  const { dark, setDark } = useDarkMode();

  const handleDark = () => {
    setDark(!dark);
    localStorage.setItem("dark", JSON.stringify(!dark));
  };

  return (
    <header className="sticky top-0 w-full p-4 flex justify-between items-center bg-white/80 dark:bg-primary/80 backdrop-blur-md border-b border-gray-200 dark:border-border-dark z-50 transition-colors duration-300">
      {/* Bagian Logo */}
      <h1 className="text-2xl font-nunito flex font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 cursor-pointer hover:opacity-80 transition-opacity">
        NgeLinkDo
      </h1>

      <div className="flex justify-center items-center space-x-5">
        {/* Tombol Dark/Light Mode dengan efek hover membulat */}
        <div
          onClick={handleDark}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-border-dark transition-all duration-200 cursor-pointer"
          title={dark ? "Ubah ke Mode Terang" : "Ubah ke Mode Gelap"}
        >
          {dark ? (
            <BsFillMoonStarsFill size={20} className="text-gray-300" />
          ) : (
            <MdLightMode size={24} className="text-gray-600" />
          )}
        </div>

        {/* Tombol Call to Action (CTA) Utama */}
        <a
          rel="noreferrer"
          href="#" // Nanti bisa kamu ganti dengan link profil freelance atau Dribbble/Figma milikmu
          target="_blank"
          className="px-5 py-2 text-white text-sm font-nunito font-bold rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          Portofolio
        </a>
      </div>
    </header>
  );
}

export default Header;
