import { useState } from "react";
import Header from "./components/header";
import Editor from "./components/Editor";
import Appearance from "./components/appearance";
import Preview from "./components/Preview";
import { useCode } from "./hooks/code";
import { HiOutlineLink, HiOutlinePencil } from "react-icons/hi";
import { AiOutlineEye } from "react-icons/ai";
import { BsBrush } from "react-icons/bs";
import { FaFileDownload } from "react-icons/fa";

export default function App() {
  const { getCode } = useCode();
  const [preview, setPreview] = useState(false);
  const [showDesign, setShowDesign] = useState(false);

  // Optimasi fungsi download agar lebih rapi
  const download = (filename, text) => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/html;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownload = () => {
    const generatedCode = getCode();
    download("index.html", generatedCode);
  };

  return (
    <>
      {!preview && <Header />}

      <div
        className={`w-full min-h-screen grid ${
          preview ? "" : "lg:grid-cols-2"
        } bg-slate-50 dark:bg-primary font-nunito transition-colors duration-300`}
      >
        <div className={`w-full p-4 pb-96 ${preview && "hidden"}`}>
          {showDesign ? <Appearance /> : <Editor />}
        </div>

        <div
          className={`${
            preview ? "flex" : "hidden"
          } justify-center items-center lg:flex`}
        >
          <Preview preview={preview} />

          <div
            className={`relative ${
              preview ? "flex" : "hidden"
            } justify-center items-center lg:flex`}
          >
            {preview ? (
              <div
                onClick={() => setPreview(false)}
                className="fixed left-6 top-6 p-4 hidden lg:flex justify-center items-center space-x-2 bg-white dark:bg-secondary border border-gray-200 dark:border-border-dark rounded-2xl shadow-lg cursor-pointer hover:bg-slate-100 hover:scale-105 transition-all duration-200"
              >
                <HiOutlinePencil
                  size={23}
                  className="text-gray-700 dark:text-gray-400"
                />
                <span className="text-xl text-gray-800 dark:text-white font-bold">
                  Kembali ke Editor
                </span>
              </div>
            ) : (
              <div className="fixed top-24 p-3 hidden lg:flex items-center space-x-2 bg-white dark:bg-secondary rounded-2xl shadow-md border border-gray-200 dark:border-border-dark cursor-pointer">
                {showDesign ? (
                  <div
                    onClick={() => setShowDesign(false)}
                    className="flex p-3 items-center space-x-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-border-dark rounded-xl transition-all duration-200"
                  >
                    <HiOutlineLink
                      size={22}
                      className="text-gray-700 dark:text-gray-400"
                    />
                    <span className="text-base font-semibold text-gray-800 dark:text-white">
                      Tautan
                    </span>
                  </div>
                ) : (
                  <div
                    onClick={() => setShowDesign(true)}
                    className="flex p-3 items-center space-x-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-border-dark rounded-xl transition-all duration-200"
                  >
                    <BsBrush
                      size={22}
                      className="text-gray-700 dark:text-gray-400"
                    />
                    <span className="text-base font-semibold text-gray-800 dark:text-white">
                      Tampilan
                    </span>
                  </div>
                )}
                <div
                  onClick={() => setPreview(true)}
                  className="flex p-3 items-center space-x-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-border-dark rounded-xl transition-all duration-200"
                >
                  <AiOutlineEye
                    size={24}
                    className="text-gray-700 dark:text-gray-400"
                  />
                  <span className="text-base font-semibold text-gray-800 dark:text-white">
                    Pratinjau
                  </span>
                </div>
                <div
                  onClick={handleDownload}
                  className="flex p-3 items-center space-x-2 cursor-pointer bg-blue-50 hover:bg-blue-100 dark:bg-blue-900 dark:hover:bg-blue-800 rounded-xl transition-all duration-200"
                >
                  <FaFileDownload
                    size={22}
                    className="text-blue-600 dark:text-blue-300"
                  />
                  <span className="text-base font-bold text-blue-700 dark:text-blue-200">
                    Unduh Kode
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Menu */}
      <div className="fixed z-50 bottom-0 w-full p-3 bg-white dark:bg-secondary flex justify-around items-center border-t border-gray-200 dark:border-border-dark shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] rounded-t-2xl lg:hidden">
        {preview ? (
          <div
            onClick={() => setPreview(false)}
            className="flex justify-center items-center space-x-2 cursor-pointer w-full py-2 hover:bg-slate-50 rounded-xl transition-all"
          >
            <HiOutlinePencil
              size={30}
              className="text-gray-700 dark:text-gray-400"
            />
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              Tutup Pratinjau
            </span>
          </div>
        ) : (
          <>
            {showDesign ? (
              <div
                onClick={() => setShowDesign(false)}
                className="flex flex-col justify-center items-center cursor-pointer p-2 hover:bg-slate-50 rounded-xl transition-all w-1/3"
              >
                <HiOutlineLink
                  size={28}
                  className="text-gray-700 dark:text-gray-400 mb-1"
                />
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-300">
                  Tautan
                </span>
              </div>
            ) : (
              <div
                onClick={() => setShowDesign(true)}
                className="flex flex-col justify-center items-center cursor-pointer p-2 hover:bg-slate-50 rounded-xl transition-all w-1/3"
              >
                <BsBrush
                  size={26}
                  className="text-gray-700 dark:text-gray-400 mb-1"
                />
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-300">
                  Tampilan
                </span>
              </div>
            )}
            <div
              onClick={() => setPreview(true)}
              className="flex flex-col justify-center items-center cursor-pointer p-2 hover:bg-slate-50 rounded-xl transition-all w-1/3"
            >
              <AiOutlineEye
                size={28}
                className="text-gray-700 dark:text-gray-400 mb-1"
              />
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-300">
                Pratinjau
              </span>
            </div>
            <div
              onClick={handleDownload}
              className="flex flex-col justify-center items-center cursor-pointer p-2 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 rounded-xl transition-all w-1/3"
            >
              <FaFileDownload
                size={26}
                className="text-blue-600 dark:text-blue-400 mb-1"
              />
              <span className="text-sm font-bold text-blue-700 dark:text-blue-300">
                Unduh
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
}
