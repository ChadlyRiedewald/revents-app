import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar';
import { Container } from 'semantic-ui-react';
import { useState } from 'react';

const App = () => {
    const [formOpen, setFormOpen] = useState(false);

    return (
        <>
            <NavBar setFormOpen={setFormOpen} />
            <Container className='main'>
                <EventDashboard formOpen={formOpen} setFormOpen={setFormOpen} />
            </Container>
        </>
    );
};

export default App;