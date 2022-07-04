import { Button, Header, Segment } from 'semantic-ui-react';
import cuid from 'cuid';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, updateEvent } from '../eventActions';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import { categoryData } from '../../../app/api/categoryOptions';
import DateInput from '../../../app/common/form/DateInput';

const EventForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();

    const selectedEvent = useSelector(state =>
        state.event.events.find(e => e.id === id)
    );
    const initialValues = selectedEvent ?? {
        title: '',
        category: '',
        description: '',
        city: '',
        venue: '',
        date: '',
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('You must provide a title'),
        category: Yup.string().required('You must provide a category'),
        description: Yup.string().required('You must provide a description'),
        city: Yup.string().required('You must provide a city'),
        venue: Yup.string().required('You must provide a venue'),
        date: Yup.string().required('You must provide a date'),
    });

    return (
        <Segment clearing>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={values => {
                    selectedEvent
                        ? dispatch(updateEvent({ ...selectedEvent, ...values }))
                        : dispatch(
                              createEvent({
                                  ...values,
                                  id: cuid(),
                                  hostedBy: 'Bob',
                                  attendees: [],
                                  hostPhotoURL: '/assets/user.png',
                              })
                          );
                    history.push('/events');
                }}
            >
                {({ isSubmitting, dirty, isValid }) => (
                    <Form className='ui form'>
                        <Header sub content='Event Details' />
                        <TextInput name='title' placeholder='Event title' />
                        <SelectInput
                            name='category'
                            placeholder='Category'
                            options={categoryData}
                        />
                        <TextArea
                            name='description'
                            placeholder='Description'
                            rows={3}
                        />
                        <Header sub content='Event Location Details' />
                        <TextInput name='city' placeholder='City' />
                        <TextInput name='venue' placeholder='Venue' />
                        <DateInput
                            name='date'
                            placeholderText='Event date'
                            timeFormat='HH:mm'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='d MMMM yyyy, hh:mm '
                        />
                        <Button
                            loading={isSubmitting}
                            disabled={!isValid || !dirty || isSubmitting}
                            type='submit'
                            floated='right'
                            positive
                            content='Submit'
                        />
                        <Button
                            disabled={isSubmitting}
                            as={Link}
                            to='/events'
                            type='submit'
                            floated='right'
                            content='Cancel'
                        />
                    </Form>
                )}
            </Formik>
        </Segment>
    );
};

export default EventForm;
