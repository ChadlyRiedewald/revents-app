import { Header, Menu } from 'semantic-ui-react';
import Calendar from 'react-calendar';

const EventFilters = () => {
    return (
        <>
            <Menu vertical size='large' style={{ width: '100%' }}>
                <Header icon='filter' attached color='teal' content='Filters' />
                <Menu.Item content='All Events' />
                <Menu.Item content={`I'm going`} />
                <Menu.Item content={`I'm hosting`} />
            </Menu>
            <Menu vertical size='large' style={{ width: '100%' }}>
                <Header
                    icon='calendar'
                    content='Select date'
                    attached
                    color='teal'
                />
                <Menu.Item content={<Calendar />} />
            </Menu>
        </>
    );
};

export default EventFilters;
