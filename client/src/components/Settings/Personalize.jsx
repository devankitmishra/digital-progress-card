// import React, { useEffect, useState } from "react";
// import Settings from "./Settings";

// const Personalize = () => {
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "default");
//   const [mode, setMode] = useState(localStorage.getItem("mode") || "light");

//   const handleThemeChange = (selectedTheme) => {
//     setTheme(selectedTheme);
//   };

//   const toggleMode = () => {
//     setMode((prevMode) => {
//       const newMode = prevMode === "dark" ? "light" : "dark";
//       localStorage.setItem("mode", newMode);
//       return newMode;
//     });
//   };
//   const toggleThemeBlue = () => {
//     setTheme((prevTheme) => {
//       const newTheme = "blue";
//       localStorage.setItem("theme", newTheme);
//       return newTheme;
//     });
//   };
//   const toggleThemeGreen = () => {
//     setTheme((prevTheme) => {
//       const newTheme = "green";
//       localStorage.setItem("theme", newTheme);
//       return newTheme;
//     });
//   };
//   const toggleThemeRed = () => {
//     setTheme((prevTheme) => {
//       const newTheme = "red";
//       localStorage.setItem("theme", newTheme);
//       return newTheme;
//     });
//   };
//   const toggleThemeYellow = () => {
//     setTheme((prevTheme) => {
//       const newTheme = "yellow";
//       localStorage.setItem("theme", newTheme);
//       return newTheme;
//     });
//   };
//   const toggleThemePurple = () => {
//     setTheme((prevTheme) => {
//       const newTheme = "purple";
//       localStorage.setItem("theme", newTheme);
//       return newTheme;
//     });
//   };

//   useEffect(() => {
//     document.body.className = mode;
//   }, [mode]);

//   useEffect(() => {
//     document.body.id = theme;
//   }, [theme]);

//   return (
//     <div className="flex">
//       <Settings />

//       <div className="w-3/4 p-4">
//         {/* ----------------dark-light-mode------------------- */}
//         <div className="mb-4">
//           <label className="block mb-2">
//             <strong>Mode:</strong>
//           </label>
//           <button
//             onClick={toggleMode}
//             className={`p-2 border rounded ${
//               mode === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
//             }`}
//           >
//             {mode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
//           </button>
//         </div>
//         {/* ------------------------color-themes------------------------ */}
//         <div className="mb-4">
//           <label className="block mb-2">
//             <strong>Theme:</strong>
//           </label>

//           <div className="flex space-x-2">
//             <button
//               onClick={() => handleThemeChange("default")}
//               className="p-2 border rounded bg-white"
//             >
//               <div className="h-7 w-14 bg-gray-500"></div>
//             </button>

//             <button
//               onClick={toggleThemeBlue}
//               className="p-2 border rounded bg-white"
//             >
//               <div className=" bg-blue-500 h-7 w-14"></div>
//             </button>

//             <button
//               onClick={toggleThemeGreen}
//               className="p-2 border rounded bg-white"
//             >
//               <div className=" bg-green-500 h-7 w-14"></div>
//             </button>
//             <button
//               onClick={toggleThemeRed}
//               className="p-2 border rounded bg-white"
//             >
//               <div className=" bg-red-500 h-7 w-14"></div>
//             </button>
//             <button
//               onClick={toggleThemeYellow}
//               className="p-2 border rounded bg-white"
//             >
//               <div className="bg-yellow-500 h-7 w-14"></div>
//             </button>
//             <button
//               onClick={toggleThemePurple}
//               className="p-2 border rounded bg-white"
//             >
//               <div className="bg-purple-500 h-7 w-14"></div>
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Personalize;

import React, { useEffect, useState } from "react";
import Settings from "./Settings";
import { Check } from "lucide-react";
import useLocalStorage from "use-local-storage";
import { NavLink } from "react-router-dom";

const themes = {
  default: "bg-gray-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  red: "bg-red-500",
  yellow: "bg-yellow-500",
  purple: "bg-purple-500",
};

const Personalize = () => {
  const [theme, setTheme] = useLocalStorage("theme", "default");

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  };

  useEffect(() => {
    document.body.id = theme;
  }, [theme]);

  return (
    <div className="flex">
      <div className="hidden sm:block w-auto">
        <Settings />
      </div>

      <div className="w-3/4 p-4">
        {/* ----------------------------------Dark/Light Mode Toggle------------------------------------------- */}

        {/* ------------------------------------------------Color Themes------------------------------------------------ */}
        <div className="mb-4">
          <label className="block mb-2">
            <strong>Theme:</strong>
          </label>
          <div className="grid sm:flex gap-2 ">
            {Object.keys(themes).map((key) => (
              <button
                key={key}
                onClick={() => handleThemeChange(key)}
                className={`p-2 border rounded relative ${
                  theme === key ? "border-4 border-blue-500" : "bg-white"
                }`}
              >
                <div className={`h-7 w-14 ${themes[key]}`}></div>
                {theme === key && (
                  <Check className="absolute top-0 right-0 text-black" />
                )}
              </button>
            ))}
          </div>
        </div>
        <NavLink
          to="/settings"
          className="sm:hidden flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
        >
          <h2 className="text-xl font-semibold mb-2">Go Back</h2>
        </NavLink>
      </div>
    </div>
  );
};

export default Personalize;
