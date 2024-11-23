import Image from "next/image";
import {AdminWrapper} from "../components/admin/AdminMain"

//should take a post request with the user's jwt,for identification while using the app.
export default function AdminPage(){
  return (
    //before reaching the AdminWrapper component his role is checked here in order to establish whether he's an admin
    <AdminWrapper userName="@ronnyogetaz"/>
  );
}
