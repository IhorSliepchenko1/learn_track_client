import { Card, CardHeader, CardBody, CardFooter, Avatar } from "@nextui-org/react";
import { IoArrowBack } from "react-icons/io5";
import { useGetByIdCourseQuery, useLazyGetByIdCourseQuery, useUpdateCourseMutation } from "../app/services/courseApi";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Spinner from "../app/components/spinner";
import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "../app/components/input";
import { Button } from "../app/components/buttons/button";
import { useHandleFileChange } from "../app/hooks/useHandleFileChange";
import { BASE_URL } from "../constants";
import { hasErrorField } from "../utils/has-error-field";
import { ErrorMessage } from "../app/components/error-message";
import { TextArea } from "../app/components/text-area";


type UpdateData = {
  title: string;
  description: string;
  image_url: string | null;
}


export const CourseId = () => {
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
    watch
  } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      image_url: "",
      title: "",
      description: "",
    },
  });

  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetByIdCourseQuery(Number(id));
  const [triggerGetById] = useLazyGetByIdCourseQuery()
  const [update] = useUpdateCourseMutation()
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState("")
  const { handleFileChange } = useHandleFileChange(setSelectedFile)
  const fileInputRef = useRef<HTMLInputElement>(null);
  const titleWatch = watch(`title`)
  const descriptionWatch = watch(`description`)

  const isDisabledButton = useMemo(() => {
    if (selectedFile) {
      return false;
    }

    if (data) {
      const isTitleUnchanged = titleWatch === data.title;
      const isDescriptionUnchanged = descriptionWatch === data.description;

      return isTitleUnchanged && isDescriptionUnchanged;
    }

    return true;

  }, [data, titleWatch, descriptionWatch, selectedFile]);


  useEffect(() => {
    if (data) {
      reset((prev) => {
        const current = {
          image_url: data.image_url ?? "",
          title: data.title ?? "",
          description: data.description ?? "",
        };
        return JSON.stringify(prev) !== JSON.stringify(current) ? current : prev;
      });
    }
  }, [data, reset]);


  const onSubmit = async (updateData: UpdateData) => {
    try {
      setError("");
      const formData = new FormData();
      if (selectedFile) formData.append('img', selectedFile);

      if (updateData.description !== data?.description) {
        if (updateData.description) formData.append('description', updateData.description);
      }

      if (updateData.title !== data?.title) {
        console.log(updateData.title, data?.title);

        if (updateData.title) formData.append('title', updateData.title);
      }

      await update({ courseData: formData, id: Number(id) }).unwrap();
      await triggerGetById(Number(id)).unwrap()
      setSelectedFile(null)

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (err) {
      if (hasErrorField(err)) {
        setError(err.data.message)
      }
    }
  }



  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <div className="flex justify-start p-1">
            <Button
              icon={<IoArrowBack />}
              color="default"
              size="sm"
              variant="flat"
              onPress={() => navigate(-1)}
            >
              Назад
            </Button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl" style={{ marginInline: 'auto' }}>
            <Card className="py-4">

              <CardHeader className="flex justify-between items-center">
                <h4 className="font-bold text-large">Информация о курсе</h4>
                <Avatar isBordered radius="sm" src={`${BASE_URL}/${data?.image_url}`} />
              </CardHeader>

              <CardBody className="overflow-visible py-2 flex flex-col gap-3">
                <Input
                  name="title"
                  label="Название"
                  type="text"
                  control={control}
                  required="Обязательное поле"
                />

                <TextArea
                  name="description"
                  label="Описание курса"
                  control={control}
                  rules={{ required: "Обязательное поле" }}
                  errors={errors}
                  maxLength={150}
                />

                <input
                  ref={fileInputRef}
                  type="file"
                  name="img"
                  onChange={handleFileChange}
                />


              </CardBody>
              <ErrorMessage error={error} setError={setError} />

              <CardFooter className="flex justify-end">
                <Button color={isDisabledButton ? "default" : "primary"} variant="flat" size="md" type="submit" disabled={isDisabledButton} >Редактировать</Button>
              </CardFooter>
            </Card>

          </form>
        </div>
      )}
    </>
  );
};
