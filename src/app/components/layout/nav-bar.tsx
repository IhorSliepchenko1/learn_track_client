import { useDispatch } from "react-redux";
import { Button, useDisclosure } from "@nextui-org/react";
import { logout } from "../../../features/user/userSlice";
import { Avatar } from "@nextui-org/react";
import { useCheckValidToken } from "../../hooks/useCheckValidToken";
import { BASE_URL } from "../../../constants";
import { MdOutlineFileUpload } from "react-icons/md";
import styled from 'styled-components';
import { ChangeAvatarModals } from "../modals/change-avatar-modals";

const ImageSlot = styled.div`
    position: relative;

    &:hover  {
    span {
        display: block;
        }

     &::after {
        position: absolute;
        content: '';
        height: 100%;
        width: 100%;
        background: rgba(255, 255, 255, 0.445);
        border-radius: 50%;
        z-index: 999;
        top: 0;
        left: 0;
        cursor: pointer;
    }
  }`;

const Span = styled.span`
    position: absolute;
    z-index: 9999;
    top: 30%;
    right: 30%;
    color: black;
    cursor: pointer;
    display: none;
`;



export const NavBar = () => {
     const dispatch = useDispatch()
     const { decoded } = useCheckValidToken()
     const { isOpen, onOpen, onClose } = useDisclosure();

     const handleOpen = () => {
          onOpen();
     };


     return (
          <header className="flex gap-3 justify-end p-3 items-center">
               <ChangeAvatarModals isOpen={isOpen} onClose={onClose} />
               <ImageSlot onClick={() => handleOpen()}>
                    <Span>
                         <MdOutlineFileUpload />
                    </Span>
                    <Avatar isBordered radius="full" src={`${BASE_URL}/${decoded.avatar_url}`} />
               </ImageSlot>
               <Button color="primary" variant="bordered" onClick={() => dispatch(logout())}>
                    Выйти
               </Button>
          </header>
     )
}
