import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { decrement, increment } from './testReducer';
import { openModal } from '../../app/common/modals/modalReducer';

const Sandbox = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.test.data);

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
        </>
    );
};

export default Sandbox;
