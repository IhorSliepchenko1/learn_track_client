import {
     Modal,
     ModalContent,
     ModalHeader,
     ModalBody,
     ModalFooter,
     Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { hasErrorField } from "../../../utils/has-error-field";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../error-message";
import { useLazyCheckQuery, useSendCodeMutation, useUpdateUserMutation } from "../../services/userApi";
import { useCheckValidToken } from "../../hooks/useCheckValidToken";
import { useCreateContext } from "../../context-provider/context-provider";
import { Input } from "../input";
import { ChangeTypeButton } from "../buttons/change-type-button";

type Props = {
     isOpen: boolean
     onClose: () => void
}

type UpdateData = {
     name: string,
     email: string,
     oldPassword: string,
     newPassword: string,
     code: string
     avatar_url: string,
}

export const ChangeUserInfoModals = ({ isOpen, onClose }: Props) => {
     const { theme } = useCreateContext()
     const [selectedFile, setSelectedFile] = useState<File | null>(null)
     const [error, setError] = useState("")
     const { decoded } = useCheckValidToken()

     const {

          handleSubmit,
          reset,
          control,
          setValue,
          watch
     } = useForm({
          mode: "onChange",
          reValidateMode: "onBlur",
          defaultValues: {
               avatar_url: '',
               name: "",
               email: "",
               oldPassword: "",
               newPassword: "",
               code: "",
          },
     })
     const emailValue = watch("email");
     const [isVisibleOldPass, setIsVisibleOldPass] = useState(false);
     const [isVisibleNewPass, setIsVisibleNewPass] = useState(false);
     const [send, { isLoading: loadingCheckMail }] = useSendCodeMutation();
     const [update, { isLoading }] = useUpdateUserMutation()
     const [codeInput, setCodeInput] = useState(false);
     const [countdown, setCountdown] = useState<number | null>(null);
     const [intervalId, setIntervalId] = useState<number | null>(null);
     const [triggerGet] = useLazyCheckQuery()

     const startCountdown = () => {
          const timer = setInterval(() => {
               setCountdown((prev) => {

                    if (prev === null || prev <= 1) {
                         clearInterval(timer);
                         resetForm();
                         return null;
                    }

                    return prev - 1;
               });
          }, 1000);
          setIntervalId(timer);
     };

     const onSendCode = async (data: UpdateData) => {
          try {
               const response = await send({ email: data.email }).unwrap();
               const expirationTime = new Date(response.expiration_at).getTime();
               const currentTime = Date.now();
               const timeLeft = Math.floor((expirationTime - currentTime) / 1000);

               localStorage.setItem("dataRegistration", JSON.stringify(data));
               localStorage.setItem("expirationTimestamp", expirationTime.toString());

               setCodeInput(true);
               setCountdown(timeLeft);

               startCountdown();
          } catch (err) {
               if (hasErrorField(err)) {
                    setError(err.data.message);
               }
          }
     };

     const resetForm = () => {
          if (intervalId) {
               clearInterval(intervalId);
          }

          setCodeInput(false);
          setCountdown(null);
          localStorage.removeItem("dataRegistration");
          localStorage.removeItem("expirationTimestamp");
          reset();
     };

     useEffect(() => {
          const savedData = JSON.parse(localStorage.getItem("dataRegistration") || "{}");
          const expirationTimestamp = localStorage.getItem("expirationTimestamp");

          if (savedData.email && expirationTimestamp) {
               const timeLeft = Math.floor((Number(expirationTimestamp) - Date.now()) / 1000);
               if (timeLeft > 0) {
                    setCodeInput(true);
                    setCountdown(timeLeft);

                    Object.keys(savedData).forEach((key) => {
                         setValue(key as keyof UpdateData, savedData[key]);
                    });

                    startCountdown();
               } else {
                    resetForm();
               }
          }
     }, [setValue]);

     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files !== null) {
               setSelectedFile(e.target.files[0])
          }
     }

     const onSubmit = async (data: UpdateData) => {
          try {
               const formData = new FormData();
               if (selectedFile) formData.append('img', selectedFile);
               if (data.name) formData.append('name', data.name);
               if (data.email) formData.append('email', data.email);
               if (data.oldPassword) formData.append('oldPassword', data.oldPassword);
               if (data.newPassword) formData.append('newPassword', data.newPassword);
               if (data.code) formData.append('code', data.code);

               await update({ userData: formData, id: decoded.id }).unwrap();
               await triggerGet().unwrap()
               resetForm();
               onClose()

          } catch (err) {

               if (hasErrorField(err)) {
                    setError(err.data.message)
               }
          }
     }

     return (
          <Modal className={`${theme} text-foreground-500 modal`} backdrop="blur" isOpen={isOpen} onClose={onClose} size={`lg`}>
               <ModalContent>
                    {(onClose) => (
                         <>
                              <form onSubmit={handleSubmit(emailValue ? onSendCode : onSubmit)}>
                                   <ModalHeader className="flex flex-col gap-1">Редактировать пользователя</ModalHeader>
                                   <ModalBody>
                                        <Input
                                             name={`email`}
                                             label={`Email`}
                                             placeholder={`введите новый email`}
                                             type={`email`}
                                             control={control}
                                        />

                                        {codeInput && (
                                             <Input
                                                  control={control}
                                                  name="code"
                                                  label="Код верификации"
                                                  type="text"
                                                  required="Обязательное поле"
                                                  placeholder={
                                                       countdown !== null
                                                            ? `Код истечёт через ${countdown} сек.`
                                                            : "Введите код"
                                                  }
                                             />
                                        )}
                                        <Input
                                             name={`name`}
                                             label={`Имя:`}
                                             placeholder={`введите новое имя`}
                                             type={`text`}
                                             control={control}
                                        />
                                        <Input
                                             control={control}
                                             name="oldPassword"
                                             endContent={
                                                  <ChangeTypeButton
                                                       isVisible={isVisibleOldPass}
                                                       setIsVisible={setIsVisibleOldPass}
                                                  />
                                             }
                                             type={isVisibleOldPass ? "text" : "password"}
                                             label={"Старый пароль"} />

                                        <Input
                                             control={control}
                                             name="newPassword"
                                             endContent={
                                                  <ChangeTypeButton
                                                       isVisible={isVisibleNewPass}
                                                       setIsVisible={setIsVisibleNewPass}
                                                  />
                                             }
                                             type={isVisibleNewPass ? "text" : "password"}
                                             label={"Новый пароль"} />
                                        <div className="flex justify-between">
                                             <p>сменить аватар:</p><input type="file" name="img" onChange={handleFileChange} />
                                        </div>

                                        <ErrorMessage error={error} setError={setError} />
                                   </ModalBody>
                                   <ModalFooter className="flex justify-between">
                                        <Button color="danger" onPress={onClose}>
                                             Закрыть
                                        </Button>

                                        {!codeInput && emailValue ? (
                                             <Button type="submit" isLoading={loadingCheckMail} >
                                                  Отправить код
                                             </Button>
                                        ) : <Button color="primary" type="submit" isLoading={isLoading}>
                                             Подтвердить
                                        </Button>}
                                   </ModalFooter>
                              </form>
                         </>
                    )}
               </ModalContent>
          </Modal >
     );
};
