import { Divider, useDisclosure } from "@nextui-org/react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { Button } from "./buttons/button";
import { TbFileTypeHtml } from "react-icons/tb";
import { CheckHtml } from "./modals/check-html";
import { ModalDelete } from "./modals/delete";
import { useState } from "react";
import { useLazyGetAllLessonsQuery, useDeleteLessonMutation, useUpdateLessonMutation } from "../services/lessonsApi";
import { useParams } from "react-router-dom";
import { hasErrorField } from "../../utils/has-error-field";
import { LessonsData } from "../types";
import { AddModalUniversal } from "./modals/add-modal-universal";
import { useForm } from "react-hook-form";

type Props = {
     title: string;
     content: string;
     number: number
     lessons_id: number
}

export const LessonsCard = ({ title, number, content, lessons_id }: Props) => {
     const {
          handleSubmit,
          reset,
          formState: { errors },
          control,
     } = useForm({
          mode: "onChange",
          reValidateMode: "onBlur",
          defaultValues: {
               title,
               content: "",
          },
     })

     const [selectedFile, setSelectedFile] = useState<File | null>(null)
     const [updateLesson] = useUpdateLessonMutation()
     const [error, setError] = useState("")
     const { id } = useParams()

     const onSubmit = async (data: LessonsData) => {
          try {
               const formData = new FormData();
               if (selectedFile) formData.append('file', selectedFile);
               if (data.title) formData.append('title', data.title);
               if (id) {
                    const course_id = id
                    formData.append('course_id', course_id);
               }
               console.log(lessons_id);

               await updateLesson({ lessonData: formData, id: lessons_id }).unwrap();
               await triggerGet(Number(id)).unwrap()
               reset();
               onClose()

          } catch (err) {
               if (hasErrorField(err)) {
                    setError(err.data.message)
               }
          }
     }

     const { onOpen, isOpen, onClose, onOpenChange } = useDisclosure();
     const [modalVariant, setModalVariant] = useState(0)
     const [triggerGet] = useLazyGetAllLessonsQuery()
     const [deleteLessonsId] = useDeleteLessonMutation()

     const openModalHtml = () => {
          setModalVariant(1)
          onOpen()
     }

     const openModalDelete = () => {
          setModalVariant(0)
          onOpen()
     }

     const openModalUpdate = () => {
          setModalVariant(2)
          onOpen()
     }

     const deleteLesson = async () => {
          await deleteLessonsId(Number(lessons_id)).unwrap()
          await triggerGet(Number(id)).unwrap()
     }



     return (
          <>
               <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                         <span>{number}.</span>
                         <h3>{title}</h3>
                    </div>
                    <div className="flex gap-2">
                         <Button size="sm" icon={<TbFileTypeHtml />} color="secondary" variant="bordered" onPress={openModalHtml}>check html</Button>
                         <Button size="sm" icon={<MdDelete />} color="danger" variant="bordered" onPress={openModalDelete}>delete</Button>
                         <Button size="sm" icon={<MdEdit />} color="warning" variant="bordered" onPress={openModalUpdate}>update</Button>
                    </div>
               </div>
               <Divider />
               {
                    modalVariant === 1 ?
                         <CheckHtml
                              onClose={onClose}
                              onOpen={onOpen}
                              isOpen={isOpen}
                              content={content}
                         />
                         :
                         <ModalDelete
                              isOpen={isOpen}
                              onOpenChange={onOpenChange}
                              deleteItem={deleteLesson} />
               }

               {modalVariant === 2 &&
                    <AddModalUniversal
                         isOpen={isOpen}
                         onClose={onClose}
                         onSubmit={onSubmit}
                         handleSubmit={handleSubmit}
                         control={control}
                         errors={errors}
                         setSelectedFile={setSelectedFile}
                         modalTitle={`Редактировать`}
                         modal={`lessons`}
                         error={error}
                         setError={setError}
                    />
               }

          </>

     )
}
