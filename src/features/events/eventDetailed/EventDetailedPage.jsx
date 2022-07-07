import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedSidebar from './EventDetailedSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { listenToEventFromFirestore } from '../../../app/firestore/firestoreService';
import { listenToEvents } from '../eventActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const EventDetailedPage = () => {
    const { id } = useParams();
    const { loading, error } = useSelector(state => state.async);
    const dispatch = useDispatch();

    const event = useSelector(state =>
        state.event.events.find(e => e.id === id)
    );

    useFirestoreDoc({
        query: () => listenToEventFromFirestore(id),
        data: event => dispatch(listenToEvents([event])),
        deps: [id, dispatch],
    });

    if (loading || (!event && !error))
        return <LoadingComponent content='Loading event...' />;

    if (error) return <Redirect to='/error' />;

    return (
        <Grid>
            <Grid.Column width={10}>
                <EventDetailedHeader event={event} />
                <EventDetailedInfo event={event} />
                <EventDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <EventDetailedSidebar attendees={event?.attendees} />
            </Grid.Column>
        </Grid>
    );
};

export default EventDetailedPage;
