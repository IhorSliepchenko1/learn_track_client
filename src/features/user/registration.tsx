import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../app/components/input";
import { Button, Link } from "@nextui-org/react";
import { ErrorMessage } from "../../app/components/error-message";
import { hasErrorField } from "../../utils/has-error-field";
import { Registration as TypeRegistration } from "../../app/types";
import { useRegisterMutation, useSendCodeMutation } from "../../app/services/userApi";
import { ChangeTypeButton } from "../../app/components/buttons/change-type-button";

type Props = {
     setSelected: (value: string) => void;
};

export const Registration = ({ setSelected }: Props) => {
     const { handleSubmit, control, setValue, reset } = useForm<TypeRegistration>({
          mode: "onChange",
          reValidateMode: "onBlur",
          defaultValues: {
               name: "",
               email: "",
               password: "",
               code: "",
          },
     });

     const [registration, { isLoading }] = useRegisterMutation();
     const [send, { isLoading: loadingCheckMail }] = useSendCodeMutation();
     const [isVisiblePass, setIsVisiblePass] = useState(false);
     const [error, setError] = useState("");
     const [codeInput, setCodeInput] = useState(false);
     const [countdown, setCountdown] = useState<number | null>(null);
     const [intervalId, setIntervalId] = useState<number | null>(null);

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

     const onSendCode = async (data: TypeRegistration) => {
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

     const onSubmit = async (data: TypeRegistration) => {
          try {
               await registration(data).unwrap();
               resetForm();
               setSelected("login")
          } catch (err) {
               if (hasErrorField(err)) {
                    setError(err.data.message);
               }
          }
     };

     useEffect(() => {
          const savedData = JSON.parse(localStorage.getItem("dataRegistration") || "{}");
          const expirationTimestamp = localStorage.getItem("expirationTimestamp");

          if (savedData.email && expirationTimestamp) {
               const timeLeft = Math.floor((Number(expirationTimestamp) - Date.now()) / 1000);
               if (timeLeft > 0) {
                    setCodeInput(true);
                    setCountdown(timeLeft);
                    
                    // удержание инпутов в заполненом состоянии
                    Object.keys(savedData).forEach((key) => {
                         setValue(key as keyof TypeRegistration, savedData[key]);
                    });

                    startCountdown();
               } else {
                    resetForm();
               }
          }
     }, [setValue]);

     return (
          <>
               <form className="flex flex-col gap-4" onSubmit={handleSubmit(codeInput ? onSubmit : onSendCode)}>
                    <div className="flex justify-between items-center">
                         <Input
                              control={control}
                              name="email"
                              label="Ваш почтовый адрес"
                              type="email"
                              variant="underlined"
                              required="Обязательное поле"
                         />
                    </div>

                    <Input
                         control={control}
                         name="name"
                         label="Ваше имя"
                         type="text"
                         variant="underlined"
                         required="Обязательное поле"
                    />

                    <Input
                         control={control}
                         name="password"
                         endContent={
                              <ChangeTypeButton
                                   isVisible={isVisiblePass}
                                   setIsVisible={setIsVisiblePass}
                              />
                         }
                         variant="underlined"
                         required="Обязательное поле"
                         type={isVisiblePass ? "text" : "password"}
                         label={"Пароль"} />

                    {codeInput && (
                         <Input
                              control={control}
                              name="code"
                              label="Код верификации"
                              type="text"
                              variant="underlined"
                              required="Обязательное поле"
                              placeholder={
                                   countdown !== null
                                        ? `Код истечёт через ${countdown} сек.`
                                        : "Введите код"
                              }
                         />
                    )}

                    <ErrorMessage error={error} setError={setError} />

                    <p className="flex justify-center gap-1 text-center text-small">
                         Уже есть аккаунт?
                         <Link
                              size="sm"
                              className="cursor-pointer"
                              onPress={() => setSelected("login")}
                         >
                              Войдите
                         </Link>
                    </p>

                    {!codeInput && (
                         <Button fullWidth type="submit" isLoading={loadingCheckMail}>
                              Отправить код подтверждения
                         </Button>
                    )}

                    {codeInput && (
                         <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
                              Зарегистрироваться
                         </Button>
                    )}
               </form>
          </>
     );
};
