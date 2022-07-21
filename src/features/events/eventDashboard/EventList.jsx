import EventListItem from './EventListItem';
import InfiniteScroll from 'react-infinite-scroller';

const EventList = ({ events, getNextEvents, loading, moreEvents }) => {
    return (
        <>
            {events.length !== 0 && (
                <InfiniteScroll
                    loadMore={getNextEvents}
                    pageStart={0}
                    hasMore={!loading && moreEvents}
                    initialLoad={false}
                >
                    {events.map(event => (
                        <EventListItem event={event} key={event.id} />
                    ))}
                </InfiniteScroll>
            )}
        </>
    );
};

export default EventList;
