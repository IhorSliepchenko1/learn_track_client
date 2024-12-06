type Props = {
     error: string
     setError: React.Dispatch<React.SetStateAction<string>>
}
import { Alert } from 'antd';
import { useEffect } from 'react';

export const ErrorMessage = ({ error = ``, setError }: Props) => {

     useEffect(() => {
          if (error) {
               const timer = setTimeout(() => {
                    setError('');
               }, 3000);

               return () => clearTimeout(timer);
          }
     }, [error]);

     return error && <div className='p-2'><Alert message={error} type="error" showIcon /></div>

}
