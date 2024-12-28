import {
     Modal,
     ModalContent,
     ModalHeader,
     ModalBody,
     ModalFooter,
     Button,
} from "@nextui-org/react";
import { ErrorMessage } from "../error-message";
import { useCreateContext } from "../../context-provider/context-provider";
import { Input } from "../input";
import { TextArea } from "../text-area";
import { Control, FieldErrors, UseFormHandleSubmit } from "react-hook-form";
import { useHandleFileChange } from "../../hooks/useHandleFileChange";
import { CourseData, LessonsData } from "../../types";



type Props = {
     isOpen: boolean
     onClose: () => void
     onSubmit: (data: any) => Promise<void>
     handleSubmit: UseFormHandleSubmit<CourseData | LessonsData, undefined>
     control: Control<any>
     errors: FieldErrors<CourseData | LessonsData>
     setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>
     modal: 'lessons' | 'course'
     modalTitle: string
     error: string
     setError: React.Dispatch<React.SetStateAction<string>>
}

export const AddModalUniversal = ({
     isOpen,
     onClose,
     onSubmit,
     handleSubmit,
     control,
     errors,
     setSelectedFile,
     modalTitle,
     modal,
     error,
     setError

}: Props) => {
     const { theme } = useCreateContext()
     const { handleFileChange } = useHandleFileChange(setSelectedFile)

     return (
          <Modal className={`${theme} text-foreground-500 modal`} backdrop="blur" isOpen={isOpen} onClose={onClose} size={`lg`}>
               <ModalContent>
                    {(onClose) => (
                         <>
                              <form onSubmit={handleSubmit(onSubmit)}>
                                   <ModalHeader className="flex flex-col gap-1">{modalTitle}</ModalHeader>
                                   <ModalBody>
                                        <Input
                                             name={`title`}
                                             label={`Название`}
                                             type={`text`}
                                             control={control}
                                        />

                                        {
                                             modal === `course` &&
                                             <TextArea
                                                  name={`description`}
                                                  control={control}
                                                  errors={errors}
                                                  label="Описание"
                                                  maxLength={150}
                                             />
                                        }

                                        <div className="flex justify-between">
                                             <p>{modal === `course` ? `аватар курса:` : `контент урока`}</p>
                                             <input type="file" name={modal === `course` ? `img:` : `file`} onChange={handleFileChange} />
                                        </div>

                                        <ErrorMessage error={error} setError={setError} />
                                   </ModalBody>
                                   <ModalFooter className="flex justify-between">
                                        <Button color="danger" onPress={onClose}>
                                             Закрыть
                                        </Button>
                                        <Button color="primary" type="submit"  >
                                             Сохранить
                                        </Button>
                                   </ModalFooter>
                              </form>
                         </>
                    )}
               </ModalContent>
          </Modal >
     )
}
