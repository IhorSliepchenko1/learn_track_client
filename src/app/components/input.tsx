import { Input as NextInput } from "@nextui-org/react"
import { useState } from "react"
import { Control, useController } from "react-hook-form"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
type Props = {
     name: string
     label: string
     placeholder?: string
     type?: string
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     control: Control<any>
     required?: string
     endContent?: JSX.Element
     color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined
     disabled?: boolean
     variant?: "flat" | "bordered" | "underlined" | "faded" | undefined
}
export const Input = ({
     name,
     label,
     placeholder,
     type,
     control,
     required = ``,
     color = `default`,
     disabled = false,
     endContent,
     variant
}: Props) => {
     const {
          field,
          fieldState: { invalid },
          formState: { errors },
     } = useController({
          name,
          control,
          rules: {
               required,
               ...(type === "email" && {
                    pattern: {
                         value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                         message: "Введите корректный email адрес",
                    },
               }),
          },
     })


     const [isVisible, setIsVisible] = useState(false);
     const toggleVisibility = () => setIsVisible(!isVisible);

     const ChangeType = () => {
          return (
               <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                    {isVisible ? (
                         <FaEye className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                         <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                    )}
               </button>
          )
     }

     return (
          <NextInput
               id={name}
               label={label}
               type={isVisible ? "text" : type}
               placeholder={placeholder}
               value={field.value}
               name={field.name}
               isInvalid={invalid}
               onChange={field.onChange}
               onBlur={field.onBlur}
               errorMessage={`${errors[name]?.message ?? ``}`}
               color={color}
               disabled={disabled}
               variant={variant}
               endContent={type === `password` ? <ChangeType /> : endContent}
          />
     )
}