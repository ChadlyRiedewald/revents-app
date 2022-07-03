import {
    Button,
    Container,
    Header,
    Icon,
    Image,
    Segment,
} from 'semantic-ui-react';

import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <Segment inverted textAlign='center' vertical className='mastHead'>
            <Container>
                <Header as='h1' inverted>
                    <Image
                        size='massive'
                        src='/assets/logo.png'
                        style={{ marginBottom: 12 }}
                    />
                    Re-vents
                </Header>
                <Button onClick={() => navigate('events')} size='huge' inverted>
                    Get started
                    <Icon name='right arrow' inverted />
                </Button>
            </Container>
        </Segment>
    );
};

export default HomePage;
