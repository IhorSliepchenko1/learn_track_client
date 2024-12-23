import { Controller } from "react-hook-form";
import { Textarea } from "@nextui-org/react";

type Props = {
     name: string;
     control: any;
     rules?: any;
     errors: any;
     label: string;
     maxLength?: number;
};

export const TextArea = ({
     name,
     control,
     rules,
     errors,
     label,
     maxLength,
}: Props) => {
     return (
          <Controller
               name={name}
               control={control}
               rules={rules}
               render={({ field, fieldState: { invalid } }) => (
                    <Textarea
                         {...field}
                         label={label}
                         isInvalid={invalid}
                         maxLength={maxLength}
                         errorMessage={errors[name]?.message ?? ""}
                    />
               )}
          />
     )
}
