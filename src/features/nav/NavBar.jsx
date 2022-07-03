import { Button, Container, Menu } from 'semantic-ui-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import SignedOutMenu from './SignedOutMenu';
import SignedInMenu from './SignedInMenu';
import { useState } from 'react';

const NavBar = ({ setFormOpen }) => {
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();

    function handleSignOut() {
        setAuth(false);
        navigate('/');
    }

    return (
        <>
            <Menu inverted fixed='top'>
                <Container>
                    <Menu.Item as={NavLink} to='/' header>
                        <img
                            src='/assets/logo.png'
                            alt='logo'
                            style={{ marginRight: 15 }}
                        />
                        Re-vents
                    </Menu.Item>
                    <Menu.Item as={NavLink} to='events' name='Events' />
                    {auth && (
                        <Menu.Item as={NavLink} to='create-event'>
                            <Button
                                onClick={() => setFormOpen(true)}
                                positive
                                inverted
                                content='Create Event'
                            />
                        </Menu.Item>
                    )}

                    {auth ? (
                        <SignedInMenu signOut={handleSignOut} />
                    ) : (
                        <SignedOutMenu setAuth={setAuth} />
                    )}
                </Container>
            </Menu>
            <Container className='main'>
                <Outlet />
            </Container>
        </>
    );
};

export default NavBar;
