

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

  type props ={
    profilePic:string,
    
  }
  
  export const AvatarUI:React.FC<props> = ({profilePic}) =>{
    return (
      <Avatar >
        <AvatarImage src={profilePic} alt="profile image" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    )
  }
  