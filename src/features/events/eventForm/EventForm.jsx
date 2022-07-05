/* global google */
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
import PlaceInput from '../../../app/common/form/PlaceInput';

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
        city: {
            address: '',
            latLng: null,
        },
        venue: {
            address: '',
            latLng: null,
        },
        date: '',
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        category: Yup.string().required('Category is required'),
        description: Yup.string().required('Description is required'),
        city: Yup.object().shape({
            address: Yup.string().required('City is required'),
        }),
        venue: Yup.object().shape({
            address: Yup.string().required('Venue is required'),
        }),
        date: Yup.string().required('Date is required'),
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
                {({ isSubmitting, dirty, isValid, values }) => (
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
                        <PlaceInput name='city' placeholder='City' />
                        <PlaceInput
                            name='venue'
                            disabled={!values.city.latLng}
                            placeholder='Venue'
                            options={{
                                location: new google.maps.LatLng(
                                    values.city.latLng
                                ),
                                radius: 1000,
                                types: ['establishment'],
                            }}
                        />
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
