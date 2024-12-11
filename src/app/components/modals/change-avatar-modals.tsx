import {
     Modal,
     ModalContent,
     ModalHeader,
     ModalBody,
     ModalFooter,
     Button,
} from "@nextui-org/react";
import { useState } from "react";
import { hasErrorField } from "../../../utils/has-error-field";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../error-message";
import { useLazyCheckQuery, useUpdateUserMutation } from "../../services/userApi";
import { useCheckValidToken } from "../../hooks/useCheckValidToken";

type Props = {
     isOpen: boolean
     onClose: () => void
}


export const ChangeAvatarModals = ({ isOpen, onClose }: Props) => {
     const [selectedFile, setSelectedFile] = useState<File | null>(null)
     const [error, setError] = useState("")
     const { decoded } = useCheckValidToken()

     const {
          handleSubmit,
          reset
     } = useForm({
          mode: "onChange",
          reValidateMode: "onBlur",
          defaultValues: {
               avatar_url: '',
          },
     })
     const [update] = useUpdateUserMutation()
     const [triggerGet] = useLazyCheckQuery()

     const resetInput = () => {
          reset()
          setError(``)
     }
     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files !== null) {
               setSelectedFile(e.target.files[0])
          }
     }

     const onSubmit = async () => {
          try {
               const formData = new FormData();
               if (selectedFile) formData.append('img', selectedFile);
               console.log(formData.getAll('img'));

               await update({ userData: formData, id: decoded.id }).unwrap();
               await triggerGet().unwrap()
               resetInput()
               onClose()

          } catch (err) {

               if (hasErrorField(err)) {
                    setError(err.data.message)
               }
          }
     }

     return (
          <>
               <Modal className={`dark text-foreground-500 modal`} backdrop="blur" isOpen={isOpen} onClose={onClose}>
                    <ModalContent>
                         {(onClose) => (
                              <>
                                   <form onSubmit={handleSubmit(onSubmit)}>

                                        <ModalHeader className="flex flex-col gap-1">Сменить аватар</ModalHeader>
                                        <ModalBody>
                                             <input type="file" name="img" onChange={handleFileChange} />

                                             <ErrorMessage error={error} setError={setError} />
                                        </ModalBody>
                                        <ModalFooter className="flex justify-between">
                                             <Button color="danger" onPress={onClose}>
                                                  Закрыть
                                             </Button>
                                             <Button color="primary" type="submit">
                                                  Отправить
                                             </Button>
                                        </ModalFooter>
                                   </form>
                              </>
                         )}
                    </ModalContent>
               </Modal >

          </>
     );
};
