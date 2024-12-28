import {
     Modal,
     ModalContent,
     ModalHeader,
     ModalBody,
     ModalFooter,
     Button,
     useDisclosure,
} from "@nextui-org/react";
import { useCreateContext } from "../../context-provider/context-provider";

type Props = {
     isOpen: boolean
     onOpen: () => void
     content: string
     onClose: () => void
}
export const CheckHtml = ({ isOpen, content, onClose }: Props) => {
     const { theme } = useCreateContext()

     return (
          <Modal className={`${theme} text-foreground-500 modal`} isOpen={isOpen} size={"full"} onClose={onClose}>
               <ModalContent>
                    {(onClose) => (
                         <>
                              <ModalHeader className="flex flex-col gap-1">Содержимое урока</ModalHeader>
                              <ModalBody className="flex flex-col justify-center items-start overflow-y-auto">
                                   <div dangerouslySetInnerHTML={{ __html: content }} />
                              </ModalBody>
                              <ModalFooter>
                                   <Button color="danger" variant="light" onPress={onClose}>
                                        Закрыть
                                   </Button>
                              </ModalFooter>
                         </>
                    )}
               </ModalContent>
          </Modal>
     )
}
