import ModalWrapper from '../../app/common/modals/ModalWrapper';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../app/common/form/TextInput';
import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { signInUser } from './authActions';
import { closeModal } from '../../app/common/modals/modalReducer';

const LoginForm = () => {
    const dispatch = useDispatch();

    return (
        <ModalWrapper size='mini' header='Sign in to Re-vents'>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values, { setSubmitting }) => {
                    dispatch(signInUser(values));
                    setSubmitting(false);
                    dispatch(closeModal());
                }}
                validationSchema={Yup.object({
                    email: Yup.string().required().email(),
                    password: Yup.string().required(),
                })}
            >
                {({ isSubmitting, isValid, dirty }) => (
                    <Form className='ui form'>
                        <TextInput name='email' placeholder='Email Address' />
                        <TextInput
                            name='password'
                            placeholder='Password'
                            type='password'
                        />
                        <Button
                            loading={isSubmitting}
                            disabled={!isValid || !dirty || isSubmitting}
                            type='submit'
                            fluid
                            size='large'
                            color='teal'
                            content='Login'
                        />
                    </Form>
                )}
            </Formik>
        </ModalWrapper>
    );
};

export default LoginForm;