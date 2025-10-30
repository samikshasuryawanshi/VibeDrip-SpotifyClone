import { SignedIn, SignedOut, UserButton} from "@clerk/clerk-react";
import { LayoutDashboardIcon, User } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "../components/SignInOAuthButtons";

const Topbar = () => {
    const isAdmin = false; // Replace with actual admin check logic

  return (
    <div className="flex items-center justify-between p-4 sticky top-0  bg-[linear-gradient(to_right,rgb(20,20,20),rgb(30,30,30),rgb(20,20,20))] shadow-lg  z-10 rounded-md backdrop-blur-md">
       <div className="flex gap-2 items-center">
         VibeDrip
       </div>
       <div className="flex items-center gap-4">
         {isAdmin && (
            <Link to={"/admin"}>
                <LayoutDashboardIcon className="size-4 mr-2" />
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