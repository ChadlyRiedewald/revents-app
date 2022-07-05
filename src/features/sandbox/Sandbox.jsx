import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { decrement, increment } from './testReducer';
import { openModal } from '../../app/common/modals/modalReducer';
import TestPlaceInput from './TestPlaceInput';
import TestMap from './TestMap';
import { useState } from 'react';

const Sandbox = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.test.data);

    const defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33,
        },
        zoom: 11,
    };

    const [location, setLocation] = useState(defaultProps);

    function handleSetLocation(latLng) {
        setLocation({
            ...location,
            center: { lat: latLng.lat, lng: latLng.lng },
        });
    }

    return (
        <>
            <h2>Testing 1...2...3...</h2>
            <h3>The data is: {data}</h3>
            <Button
                onClick={() => dispatch(increment(20))}
                content='Increment'
                color='green'
            />
            <Button
                onClick={() => dispatch(decrement(10))}
                content='Decrement'
                color='red'
            />
            <Button
                onClick={() =>
                    dispatch(
                        openModal({
                            modalType: 'TestModal',
                            modalProps: { data },
                        })
                    )
                }
                content='Open Modal'
                color='teal'
            />

            <div style={{ marginTop: 15 }}>
                <TestPlaceInput setLocation={handleSetLocation} />
            </div>
            <div style={{ marginTop: 15 }}>
                <TestMap location={location} />
            </div>
        </>
    );
};

export default Sandbox;