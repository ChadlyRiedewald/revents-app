import ModalWrapper from '../../app/common/modals/ModalWrapper';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../app/common/form/TextInput';
import { Button, Divider, Label } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../app/common/modals/modalReducer';
import { signInWithEmail } from '../../app/firestore/firebaseService';
import SocialLogin from './SocialLogin';

const LoginForm = () => {
    const dispatch = useDispatch();

    return (
        <ModalWrapper size='mini' header='Sign in to Re-vents'>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    try {
                        await signInWithEmail(values);
                        setSubmitting(false);
                        dispatch(closeModal());
                    } catch (error) {
                        setErrors({
                            auth: 'Incorrect e-mail or password ',
                        });
                        setSubmitting(false);
                    }
                }}
                validationSchema={Yup.object({
                    email: Yup.string().required().email(),
                    password: Yup.string().required(),
                })}
            >
                {({ isSubmitting, isValid, dirty, errors }) => (
                    <Form className='ui form'>
                        <TextInput name='email' placeholder='Email Address' />
                        <TextInput
                            name='password'
                            placeholder='Password'
                            type='password'
                        />
                        {errors.auth && (
                            <Label
                                basic
                                color='red'
                                style={{ marginBottom: 10 }}
                                content={errors.auth}
                            />
                        )}
                        <Button
                            loading={isSubmitting}
                            disabled={!isValid || !dirty || isSubmitting}
                            type='submit'
                            fluid
                            size='large'
                            color='teal'
                            content='Login'
                        />
                        <Divider horizontal>Or</Divider>
                        <SocialLogin />
                    </Form>
                )}
            </Formik>
        </ModalWrapper>
    );
};

export default LoginForm;
