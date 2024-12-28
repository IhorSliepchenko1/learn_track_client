import {
     Modal,
     ModalContent,
     ModalHeader,
     ModalFooter,
     Button,
} from "@nextui-org/react";
import { useCreateContext } from "../../context-provider/context-provider";

type Props = {
     deleteItem: () => Promise<void>
     onOpenChange: () => void
     isOpen: boolean
}

export const ModalDelete = ({
     deleteItem,
     onOpenChange,
     isOpen
}: Props) => {
     const { theme } = useCreateContext()
     return (
          <Modal backdrop={"opaque"} className={`${theme === `light` ? `dark` : `light`} text-foreground bg-background`} isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
               <ModalContent>
                    {(onClose) => (
                         <>
                              <ModalHeader className="flex flex-col gap-1">Уверены что хотите удалить?</ModalHeader>
                              <ModalFooter className="flex justify-between">
                                   <Button color="danger" variant="flat" onPress={onClose}>
                                        закрыть
                                   </Button>
                                   <Button color="primary" onPress={() => {
                                        deleteItem()
                                        onClose()
                                   }}>
                                        удалить
                                   </Button>
                              </ModalFooter>
                         </>
                    )}
               </ModalContent>
          </Modal>
     )
}