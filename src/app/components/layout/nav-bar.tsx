import { logout } from "../../../features/user/userSlice";
import { useCheckValidToken } from "../../hooks/useCheckValidToken";
import { BASE_URL } from "../../../constants";
import { MdOutlineFileDownload } from "react-icons/md";
import { ChangeAvatarModals } from "../modals/change-avatar-modals";
import { IoIosLogOut } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

import {
     useDisclosure,
     Chip,
     Divider,
     Dropdown,
     DropdownTrigger,
     DropdownMenu,
     DropdownItem,
     Avatar,
} from "@nextui-org/react";
import { useCreateContext } from "../../context-provider/context-provider";
import { useDispatch } from "react-redux";


export const NavBar = () => {
     const dispatch = useDispatch()
     const { decoded } = useCheckValidToken()
     const { isOpen, onOpen, onClose } = useDisclosure();

     const handleOpen = () => {
          onOpen();
     };

     const { theme, toggleTheme } = useCreateContext()

     return (
          <>
               <div className={`flex ${decoded.role === `ADMIN` ? `justify-between` : `justify-end`} items-center p-2`}>
                    {decoded.role === `ADMIN` && <Chip color="success">Администратор</Chip>}
                    <ChangeAvatarModals isOpen={isOpen} onClose={onClose} />

                    <Dropdown className={`${theme} text-foreground-500`}>
                         <DropdownTrigger>
                              <div className="flex flex-row-reverse items-center gap-2 cursor-pointer">
                                   <Avatar as="button" className="transition-transform" radius="full" src={`${BASE_URL}/${decoded.avatar_url}`} />
                                   <h2 style={{ textAlign: `center` }}>{decoded.name}</h2>
                              </div>
                         </DropdownTrigger>

                         <DropdownMenu aria-label="Profile Actions" variant="flat">
                              <DropdownItem key="change-theme" endContent={theme === `dark` ? <MdOutlineLightMode /> : <MdDarkMode />} onClick={() => toggleTheme()}>
                                   Сменить тему
                              </DropdownItem>
                              <DropdownItem key="change-image" onClick={() => handleOpen()} endContent={<MdOutlineFileDownload />}>
                                   Сменить фото
                              </DropdownItem>
                              <DropdownItem key="logout" onClick={() => dispatch(logout())} endContent={<IoIosLogOut />}>
                                   Выйти
                              </DropdownItem>
                         </DropdownMenu>
                    </Dropdown>
               </div>
               <Divider />
          </>
     )
}
