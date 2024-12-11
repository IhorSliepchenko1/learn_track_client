import { jwtDecode } from "jwt-decode";
import { useAppSelector } from "../hooks";
import { useMemo } from "react";

type DecodeToken = {
     exp: number
     iat: number
     id: number,
     role: string,
     name: string,
     email: string,
     verification_status: boolean
     avatar_url: string
}

export const useCheckValidToken = () => {
     const { token } = useAppSelector((state) => state.auth)

     const decoded: DecodeToken = useMemo(() => {
          if (typeof token === `string`) {
               return jwtDecode(token);
          } else {
               return {
                    exp: 0,
                    iat: 0,
                    id: 0,
                    role: '',
                    name: '',
                    email: '',
                    verification_status: false,
                    avatar_url: '',
               }
          }
     }, [token])

     return { decoded }

}