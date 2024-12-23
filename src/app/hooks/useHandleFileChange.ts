export const useHandleFileChange = (setSelectedFile: (value: React.SetStateAction<File | null>) => void) => {
     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const file = event.target.files?.[0] || null;
          setSelectedFile(file);
     };

     return { handleFileChange }
}