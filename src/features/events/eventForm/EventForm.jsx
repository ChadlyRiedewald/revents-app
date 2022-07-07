/* global google */
import { Button, Confirm, Header, Segment } from 'semantic-ui-react';
import { Link, Redirect, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listenToEvents } from '../eventActions';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import { categoryData } from '../../../app/api/categoryOptions';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import {
    addEventToFirestore,
    cancelEventToggle,
    listenToEventFromFirestore,
    updateEventInFirestore,
} from '../../../app/firestore/firestoreService';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { toast } from 'react-toastify';
import { useState } from 'react';

const EventForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [loadingCancel, setLoadingCancel] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const { id } = useParams();
    const { loading, error } = useSelector(state => state.async);

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

    async function handleCancelToggle(event) {
        setConfirmOpen(false);
        setLoadingCancel(true);
        try {
            await cancelEventToggle(event);
            setLoadingCancel(false);
        } catch (error) {
            setLoadingCancel(true);
            toast.error(error.message);
        }
    }

    useFirestoreDoc({
        query: () => listenToEventFromFirestore(id),
        data: event => dispatch(listenToEvents([event])),
        deps: [id, dispatch],
        shouldExecute: !!id,
    });

    if (loading) return <LoadingComponent content='Loading event...' />;

    if (error) return <Redirect to='/error' />;

    return (
        <Segment clearing>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        selectedEvent
                            ? await updateEventInFirestore(values)
                            : await addEventToFirestore(values);
                        setSubmitting(false);
                        history.push('/events');
                    } catch (error) {
                        toast.error(error.message);
                        setSubmitting(false);
                    }
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
                        {selectedEvent && (
                            <Button
                                loading={loadingCancel}
                                type='button'
                                floated='left'
                                content={
                                    selectedEvent.isCancelled
                                        ? 'Reactivate Event'
                                        : 'Cancel Event'
                                }
                                color={
                                    selectedEvent.isCancelled ? 'green' : 'red'
                                }
                                onClick={() => setConfirmOpen(true)}
                            />
                        )}
                    </Form>
                )}
            </Formik>
            <Confirm
                content={
                    selectedEvent?.isCancelled
                        ? 'This will reactive the event - are you sure?'
                        : 'This will cancel the event - are you sure?'
                }
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={() => handleCancelToggle(selectedEvent)}
            />
        </Segment>
    );
};

export default EventForm;
