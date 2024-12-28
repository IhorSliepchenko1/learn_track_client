import { useState } from "react";
import { hasErrorField } from "../../../utils/has-error-field";
import { useForm } from "react-hook-form";
import { AddModalUniversal } from "./add-modal-universal";
import { LessonsData } from "../../types";
import { useAddLessonMutation, useLazyGetAllLessonsQuery } from "../../services/lessonsApi";
import { useParams } from "react-router-dom";

type Props = {
     isOpen: boolean
     onClose: () => void
}

export const AddLessons = ({ isOpen, onClose }: Props) => {
     const { id } = useParams()
     const {
          handleSubmit,
          reset,
          formState: { errors },
          control,
     } = useForm({
          mode: "onChange",
          reValidateMode: "onBlur",
          defaultValues: {
               title: '',
               content: "",
          },
     })

     const [selectedFile, setSelectedFile] = useState<File | null>(null)
     const [addLesson] = useAddLessonMutation()
     const [triggerGet] = useLazyGetAllLessonsQuery()
     const [error, setError] = useState("")

     const onSubmit = async (data: LessonsData) => {
          try {
               const formData = new FormData();
               if (selectedFile) formData.append('file', selectedFile);
               if (data.title) formData.append('title', data.title);
               if (id) {
                    const course_id = id
                    formData.append('course_id', course_id);
               }

               await addLesson({ lessonData: formData }).unwrap();
               await triggerGet(Number(id)).unwrap()
               reset();
               onClose()

          } catch (err) {
               if (hasErrorField(err)) {
                    setError(err.data.message)
               }
          }
     }

     return (
          <AddModalUniversal
               isOpen={isOpen}
               onClose={onClose}
               onSubmit={onSubmit}
               handleSubmit={handleSubmit}
               control={control}
               errors={errors}
               setSelectedFile={setSelectedFile}
               modalTitle={`Добавить урок`}
               modal={`lessons`}
               error={error}
               setError={setError}
          />
     );
};
