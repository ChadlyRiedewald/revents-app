import { Button, Container, Menu } from 'semantic-ui-react';
import { NavLink, useHistory } from 'react-router-dom';
import SignedOutMenu from './SignedOutMenu';
import SignedInMenu from './SignedInMenu';
import { useState } from 'react';

const NavBar = () => {
    const [auth, setAuth] = useState(false);
    const history = useHistory();

    function handleSignOut() {
        setAuth(false);
        history.push('/');
    }

    return (
        <>
            <Menu inverted fixed='top'>
                <Container>
                    <Menu.Item exact as={NavLink} to='/' header>
                        <img
                            src='/assets/logo.png'
                            alt='logo'
                            style={{ marginRight: 15 }}
                        />
                        Re-vents
                    </Menu.Item>
                    <Menu.Item as={NavLink} to='/events' name='Events' />
                    <Menu.Item as={NavLink} to='/sandbox' name='Sandbox' />
                    {auth && (
                        <Menu.Item as={NavLink} to='/createEvent'>
                            <Button positive inverted content='Create Event' />
                        </Menu.Item>
                    )}

                    {auth ? (
                        <SignedInMenu signOut={handleSignOut} />
                    ) : (
                        <SignedOutMenu setAuth={setAuth} />
                    )}
                </Container>
            </Menu>
        </>
    );
};

export default NavBar;
