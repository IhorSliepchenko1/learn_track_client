import { Alert } from "@nextui-org/react";
import './alert.scss'

export const AlertSuccess = ({ message, classFrames, color }: { classFrames: string, message: string, color: "default" | "primary" | "secondary" | "success" | "warning" | "danger" }) => {
     return (
          <Alert color={color} title={message} className={`alert ${classFrames}`} />
     )
}
