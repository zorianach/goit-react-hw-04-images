import { ModalContent, Overlay } from "./Modal.styled";
import { useEffect } from 'react';


const Modal = ({selectedPhoto:{imgUrl, tag}, onClose}) => {

    useEffect(() => {
        // клавіша Escape
        const onEscapeCloseModal = (event) => {
            if (event.code === 'Escape') {
            onClose();
            }
        };
        window.addEventListener('keydown', onEscapeCloseModal);

        return () => window.removeEventListener('keydown', onEscapeCloseModal);
    }, [onClose]);
       
       // клік на оверлей  
      const onClickOverlay = (event) => {
        if (event.target === event.currentTarget) {
            onClose()
        };
    }
        return (
            <Overlay onClick={onClickOverlay}>
                <ModalContent>
                    <img src={imgUrl} alt={tag}/>
                </ModalContent>
            </Overlay>)
}

export default Modal;