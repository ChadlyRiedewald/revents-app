import { Button, Icon, Item, Label, List, Segment } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const EventListItem = ({ event }) => {
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
                                Hosted by{' '}
                                <Link to={`/profile/${event.hostUid}`}>
                                    {event.hostedBy}
                                </Link>
                            </Item.Description>
                            {event.isCancelled && (
                                <Label
                                    style={{ top: '-40px' }}
                                    ribbon='right'
                                    color='red'
                                    content='This event has been cancelled'
                                />
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <List horizontal>
                    <List.Item>
                        <Icon name='clock' />{' '}
                        {format(event.date, 'd MMMM yyyy, HH:mm')}
                    </List.Item>
                    <List.Item>
                        <Icon name='marker' /> {event.venue.address}
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
