
// import { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../App";
// import { Loader2 } from "lucide-react";

// export default function Login() {
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const { setIsLoggedIn } = useContext(AuthContext);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   function handleSubmit(e) {
//     e.preventDefault();
//     setIsLoading(true);
//     fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         username,
//         password,
//       }),
//     })
//       .then(async (response) => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           const message = await response.text();
//           alert(message);
//           setIsLoading(false);
//         }
//       })
//       .then((data) => {
//         localStorage.setItem("token", data.token);
//         console.log(data.token);
//         navigate("/");
//         setIsLoggedIn(true);
//         setIsLoading(false);
//       });
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md">
//         <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//           <div className="mb-4">
//             <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
//             <input
//               id="username"
//               type="text"
//               onChange={(e) => setUsername(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>
//           <div className="mb-6">
//             <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
//             <input
//               id="password"
//               type="password"
//               onChange={(e) => setPassword(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>
//           <div className="flex items-center justify-between">
//             <button type="submit" className="bg-gray-500 hover:bg-gray-800 text-white font-bold  py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//               {isLoading ? "Logging in..." : "Login"}
//             </button>
//             <Link to="/register" className="text-blue-500 hover:underline">Don't have an account? Register here</Link>
//           </div>
//         </form>
//         {isLoading && (
//           <div className="text-center">
//             <Loader2 className="inline-block align-middle animate-spin text-blue-500" />
//             <span className="ml-2">Logging in...</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import { Loader2 } from "lucide-react";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Menggunakan useNavigate dari react-router-dom
  const { setIsLoggedIn } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        } else {
          const message = await response.text();
          alert(message);
          setIsLoading(false);
        }
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        console.log(data.token);
        setIsLoggedIn(true);
        setIsLoading(false);
        navigate("/products"); // Navigasi ke halaman produk setelah login berhasil
      });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input
              id="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-gray-500 hover:bg-gray-800 text-white font-bold  py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              {isLoading ? "Logging in..." : "Login"}
            </button>
            <Link to="/register" className="text-blue-500 hover:underline">Don't have an account? Register here</Link>
          </div>
        </form>
        {isLoading && (
          <div className="text-center">
            <Loader2 className="inline-block align-middle animate-spin text-blue-500" />
            <span className="ml-2">Logging in...</span>
          </div>
        )}
      </div>
    </div>
  );
}
