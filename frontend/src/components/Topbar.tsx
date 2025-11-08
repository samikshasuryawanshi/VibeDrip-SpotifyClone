import { SignedIn, SignedOut, UserButton} from "@clerk/clerk-react";
import { LayoutDashboardIcon, User } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "../components/SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";

const Topbar = () => {
    const {isAdmin} = useAuthStore(); // Replace with actual admin check logic
    console.log(isAdmin);

  return (
    <div className="flex items-center justify-between px-4 py-2 sticky top-0  bg-[linear-gradient(to_right,rgb(20,20,20),rgb(30,30,30),rgb(20,20,20))] shadow-lg  z-10 rounded-md backdrop-blur-md">
       <div className="flex items-center">
        <img className="h-12" src="/vibeDrip.png" alt="" />
         VibeDrip
       </div>
       <div className="flex items-center gap-4">
         {isAdmin && (
            <Link className="flex items-center bg-black/50 shadow-2xl rounded-md p-2" to={"/admin"}>
                <LayoutDashboardIcon className="size-5 mr-2" />
                Admin Dashboard
            </Link>
         )} 


         <SignedIn>
           <UserButton />
         </SignedIn>

         <SignedOut>
            <SignInOAuthButtons />
         </SignedOut>
       </div>
    </div>
  )
}

export default Topbar