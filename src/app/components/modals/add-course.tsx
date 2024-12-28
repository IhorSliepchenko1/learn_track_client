import { useState } from "react";
import { hasErrorField } from "../../../utils/has-error-field";
import { useForm } from "react-hook-form";
import { useAddCourseMutation, useLazyGetAllCourseQuery } from "../../services/courseApi";
import { AddModalUniversal } from "./add-modal-universal";
import { CourseData } from "../../types";

type Props = {
     isOpen: boolean
     onClose: () => void
}

export const AddCourse = ({ isOpen, onClose }: Props) => {
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
               description: "",
          },
     })

     const [selectedFile, setSelectedFile] = useState<File | null>(null)
     const [addCourse] = useAddCourseMutation()
     const [triggerGet] = useLazyGetAllCourseQuery()
     const [error, setError] = useState("")


     const onSubmit = async (data: CourseData) => {
          try {
               const formData = new FormData();
               if (selectedFile) formData.append('img', selectedFile);
               if (data.title) formData.append('title', data.title);
               if (data.description) formData.append('description', data.description);

               await addCourse({ courseData: formData }).unwrap();
               await triggerGet().unwrap()
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
               modalTitle={`Добавить курс`}
               modal={`course`}
               error={error}
               setError={setError}
          />
     );
};
