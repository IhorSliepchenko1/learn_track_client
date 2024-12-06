import { Card, CardBody, Tab, Tabs } from "@nextui-org/react"
import { Login } from "../features/user/login"
import { Registration } from "../features/user/registration"
import { useState } from "react"

export const Auth = () => {
     const [selected, setSelected] = useState(`login`)
     return (
          <div className="flex items-center justify-center h-screen">
               <div className="max-w-xl w-full p-2">
                    <Card className="max-w-full w-[340px] h-[450px]">
                         <CardBody className="overflow-hidden">
                              <Tabs
                                   fullWidth
                                   size="md"
                                   selectedKey={selected}
                                   onSelectionChange={(key) => setSelected(key as string)}
                              >
                                   <Tab key="login" title="Вход">
                                        <Login setSelected={setSelected} />
                                   </Tab>
                                   <Tab key="sign-up" title="Регистрация">
                                        <Registration setSelected={setSelected} />
                                   </Tab>
                              </Tabs>
                         </CardBody>
                    </Card>
               </div>
          </div>
     )
}