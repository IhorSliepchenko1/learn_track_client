import { useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "../../app/components/input"
import { Button, Link } from "@nextui-org/react"
import {
     useLazyCheckQuery,
     useLoginMutation,
} from "../../app/services/userApi"
import { useNavigate } from "react-router-dom"
import { ErrorMessage } from "../../app/components/error-message"
import { hasErrorField } from "../../utils/has-error-field"
import { ChangeTypeButton } from "../../app/components/buttons/change-type-button"

type Login = {
     email: string
     password: string
}

type Props = {
     setSelected: (value: string) => void
}

export const Login = ({ setSelected }: Props) => {
     const {
          handleSubmit,
          control,
     } = useForm<Login>({
          mode: "onChange",
          reValidateMode: "onBlur",
          defaultValues: {
               email: "",
               password: "",
          },
     })

     const [login, { isLoading }] = useLoginMutation()
     const navigate = useNavigate()
     const [error, setError] = useState("")
     const [isVisiblePass, setIsVisiblePass] = useState(false);
     const [triggerCurrentQuery] = useLazyCheckQuery()

     const onSubmit = async (data: Login) => {
          try {
               await login(data).unwrap()
               await triggerCurrentQuery().unwrap()
               localStorage.removeItem(`dataRegistration`)
               localStorage.removeItem(`expirationTimestamp`)
               navigate("/")
          } catch (err) {
               if (hasErrorField(err)) {
                    setError(err.data.message)
               }
          }
     }
     return (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
               <Input
                    control={control}
                    name="email"
                    label="Email"
                    type="email"
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

               <ErrorMessage error={error} setError={setError} />

               <p className="flex justify-center gap-1 text-center text-small">
                    Нет аккаутна?
                    <Link
                         size="sm"
                         className="cursor-pointer"
                         onPress={() => setSelected("sign-up")}
                    >
                         Зарегистрируйтесь
                    </Link>
               </p>

               <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
                    Войти
               </Button>
          </form>
     )
}