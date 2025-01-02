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
      className="bg-slate-100 rounded-md px-4 py-2 shadow-xl text-black border-2 border-black text-nowrap hover:text-white hover:bg-black transition-all duration-150"
      onClick={onSubmit}
    >
      Signout
    </button>
  );
}
