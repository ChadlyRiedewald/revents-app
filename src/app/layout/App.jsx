import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import NavBar from '../../features/nav/NavBar';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage';
import EventForm from '../../features/events/eventForm/EventForm';

const App = () => {
    return (
        <>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path={'/'} element={<NavBar />}>
                    <Route path='events' element={<EventDashboard />} />
                    <Route path='events/:id' element={<EventDetailedPage />} />
                    <Route path='create-event' element={<EventForm />} />
                    <Route path='manage/:id' element={<EventForm />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
