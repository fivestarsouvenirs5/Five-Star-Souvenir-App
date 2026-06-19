"use client"
import UsersPage from '../components/usersPage';
import { useMyUser } from "../context/userContext";

export default function Users() {
  const {myUser} = useMyUser();
    if (myUser?.app_metadata?.admin){
      return (
        <div>
          <UsersPage />
        </div>
      )
    }
    else {
      return(
        <div>Page not Available</div>
      )
    }
}
