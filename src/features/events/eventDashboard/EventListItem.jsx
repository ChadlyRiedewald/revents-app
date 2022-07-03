import { Button, Icon, Item, List, Segment } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { Link } from 'react-router-dom';

const EventListItem = ({ event, deleteEvent }) => {
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image
                            size='tiny'
                            circular
                            src={event.hostPhotoURL}
                        />
                        <Item.Content>
                            <Item.Header content={event.title} />
                            <Item.Description>
                                Hosted by {event.hostedBy}
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <List horizontal>
                    <List.Item>
                        <Icon name='clock' /> {event.date}
                    </List.Item>
                    <List.Item>
                        <Icon name='marker' /> {event.venue}
                    </List.Item>
                </List>
            </Segment>
            <Segment secondary>
                <List horizontal>
                    {event.attendees.map(attendee => (
                        <EventListAttendee
                            key={attendee.id}
                            attendee={attendee}
                        />
                    ))}
                </List>
            </Segment>
            <Segment clearing>
                <div>{event.description}</div>
                <Button
                    onClick={() => deleteEvent(event.id)}
                    color='red'
                    floated='right'
                    content='Delete'
                    style={{ marginTop: '0.5em' }}
                />
                <Button
                    as={Link}
                    to={`/events/${event.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                    style={{ marginTop: '0.5em' }}
                />
            </Segment>
        </Segment.Group>
    );
};

export default EventListItem;
