import { Alert } from "@nextui-org/react";
import { useEffect } from 'react';

type Props = {
     error: string
     setError: React.Dispatch<React.SetStateAction<string>>
}


export const ErrorMessage = ({ error = ``, setError }: Props) => {

     useEffect(() => {
          if (error) {
               const timer = setTimeout(() => {
                    setError('');
               }, 3000);

               return () => clearTimeout(timer);
          }
     }, [error]);

     return error && <Alert title={error} color="danger" />


}
