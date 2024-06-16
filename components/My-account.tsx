"use client";

import {
  CreditCard,
  Github,
  LifeBuoy,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarUI } from "./Avatar";

import { useRouter } from "next/navigation";
// import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useLogOutUserMutation } from "@/redux/auth/authApi";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";

type props = {
  profilePic: string;
};

const MyAccount: React.FC<props> = ({ profilePic }) => {
  // const [logOut, setLogOut] = useState(false);
  const router = useRouter();
  const [  logOutUser ] = useLogOutUserMutation();



  const handleLogOut = async () => {
    await signOut({ redirect: false });
    await logOutUser(null);
  
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <AvatarUI profilePic={profilePic} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              router.push("/profile");
            }}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Github className="mr-2 h-4 w-4" />
          <span>GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Support</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MyAccount;
