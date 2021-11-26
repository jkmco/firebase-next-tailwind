import "../styles/globals.css";
import "tailwindcss/tailwind.css";

import Sidebar from "../components/Sidebar";

import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex">
      <Sidebar />
      <Component {...pageProps} />
      <Toaster />
    </div>
  );
}

export default MyApp;
