import {
    Button,
    Container,
    Header,
    Icon,
    Image,
    Segment,
} from 'semantic-ui-react';

import { useHistory } from 'react-router-dom';

const HomePage = () => {
    const history = useHistory();

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
                <Button
                    onClick={() => history.push('/events')}
                    size='huge'
                    inverted
                >
                    Get started
                    <Icon name='right arrow' inverted />
                </Button>
            </Container>
        </Segment>
    );
};

export default HomePage;
