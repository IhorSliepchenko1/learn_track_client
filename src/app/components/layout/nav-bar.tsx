import { useDispatch } from "react-redux";
import { Button } from "@nextui-org/react";
import { logout } from "../../../features/user/userSlice";
import { Avatar } from "@nextui-org/react";
// import { useCheckValidToken } from "../../hooks/useCheckValidToken";
// import { useMemo } from "react";

export const NavBar = () => {
     const dispatch = useDispatch()
     // const { token } = useSelector((state) => state)

     // const userData = useMemo(() => {
     //      if (token) {
     //           console.log(token);

     //      }
     // }, [token])

     // const { decoded } = useCheckValidToken()

     return (
          <header className="flex justify-end p-3">
               <Avatar isBordered radius="full" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
               <Button color="primary" variant="bordered" onClick={() => dispatch(logout())}>
                    Выйти
               </Button>
          </header>
     )
}
