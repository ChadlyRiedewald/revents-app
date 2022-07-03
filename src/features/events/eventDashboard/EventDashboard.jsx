import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
import { useState } from 'react';
import { sampleData } from '../../../app/api/sampleData';

const EventDashboard = () => {
    const [events, setEvents] = useState(sampleData);

    // function handleCreateEvent(event) {
    //     setEvents([...events, event]);
    // }
    //
    // function handleUpdateEvent(updatedEvent) {
    //     setEvents(
    //         events.map(event =>
    //             event.id === updatedEvent.id ? updatedEvent : event
    //         )
    //     );
    // }

    function handleDeleteEvent(eventId) {
        setEvents(events.filter(event => event.id !== eventId));
    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <EventList events={events} deleteEvent={handleDeleteEvent} />
            </Grid.Column>
            <Grid.Column width={6}>
                <h2>Event filters</h2>
            </Grid.Column>
        </Grid>
    );
};

export default EventDashboard;
