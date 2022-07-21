import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import UnauthModal from '../../features/auth/UnauthModal';

const PrivateRoute = ({ component: Component, prevLocation, ...rest }) => {
    const { authenticated } = useSelector(state => state.auth);
    return (
        <Route
            {...rest}
            render={props =>
                authenticated ? <Component {...props} /> : <UnauthModal />
            }
        />
    );
};

export default PrivateRoute;
