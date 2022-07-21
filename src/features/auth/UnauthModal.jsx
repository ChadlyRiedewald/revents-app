import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider, Modal } from 'semantic-ui-react';
import { openModal } from '../../app/common/modals/modalReducer';
import { useHistory } from 'react-router-dom';

const UnauthModal = ({ setModalOpen }) => {
    const [open, setOpen] = useState(true);
    const { prevLocation, currentLocation } = useSelector(state => state.auth);
    const history = useHistory();
    const dispatch = useDispatch();

    function handleClose() {
        if (currentLocation.pathname.includes('/profile/')) {
            history.push(prevLocation.pathname);
        } else if (currentLocation.pathname.includes('/events/')) {
            setOpen(false);
            setModalOpen(false);
        } else {
            history.push('/events');
            setOpen(false);
        }
    }

    function handleOpenLoginModal(modalType) {
        dispatch(openModal({ modalType }));
        setOpen(false);
        setModalOpen(false);
    }

    return (
        <Modal open={open} size='mini' onClose={handleClose}>
            <Modal.Header content='You need to be signed in to do that' />
            <Modal.Content>
                <p>Please either login or register to see this content</p>
                <Button.Group widths={4}>
                    <Button
                        fluid
                        color='teal'
                        content='Login'
                        onClick={() => handleOpenLoginModal('LoginForm')}
                    />
                    <Button.Or />
                    <Button
                        fluid
                        color='green'
                        content='Register'
                        onClick={() => handleOpenLoginModal('RegisterForm')}
                    />
                </Button.Group>
                <Divider />
                <div style={{ textAlign: 'center' }}>
                    <p>Or click cancel to continue as a guest</p>
                    <Button onClick={handleClose} content='Cancel' />
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default UnauthModal;
