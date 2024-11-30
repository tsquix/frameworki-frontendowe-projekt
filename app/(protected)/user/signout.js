import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";

export default function LogoutForm() {
  const router = useRouter();

  const onSubmit = () => {
    signOut(auth);
    router.push("/");
  };

  return (
    <button
      className=" flex py-2 text-base font-medium text-dark hover:text-primary text-white lg:inline-flex bg-slate-500 w-full shadow-lg rounded-md px-2 justify-center hover:bg-white hover:text-black hover:font-bold transition-all  duration-200"
      onClick={onSubmit}
    >
      {" "}
      Signout
    </button>
  );
}
