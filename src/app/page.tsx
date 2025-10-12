"use client"
import dynamic from "next/dynamic";
import Footer from "./components/Footer"
const Home = dynamic(() => import("./components/Home"), { ssr: false });
export default function App() {
  return (
    <>
      <Home />
      {/* <Hero3D /> */}
      <Footer /> 
    </>
  );
}