import { Icon, Segment } from 'semantic-ui-react';
import GoogleMapReact from 'google-map-react';

const Marker = () => {
    return <Icon name='marker' size='big' color='red' />;
};

const EventDetailedMap = ({ latLng }) => {
    const zoom = 14;

    return (
        <Segment attached='bottom' style={{ padding: 0 }}>
            <div style={{ height: 300, width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: 'AIzaSyCbETrOL2ZZpSuRFOWyE4rC5wziQvHrifk',
                    }}
                    center={latLng}
                    zoom={zoom}
                >
                    <Marker lat={latLng.lat} lng={latLng.lng} />
                </GoogleMapReact>
            </div>
        </Segment>
    );
};

export default EventDetailedMap;