import Navbar from "@/components/NavBar";
import Signin from "./signin";
import Register from "../register/register";

export default function page() {
  return (
    <>
      <Navbar />
      <Signin />
    </>
  );
}
