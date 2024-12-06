import Spinner from "../app/components/spinner"
import { useCheckQuery } from "../app/services/userApi"

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
     const { isLoading } = useCheckQuery()

     if (isLoading) {
          return <div
               style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
               }}
          >
               <Spinner />
          </div>

     }
     return children
}