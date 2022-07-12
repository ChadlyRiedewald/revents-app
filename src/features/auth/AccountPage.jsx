import { Button, Header, Label, Segment } from 'semantic-ui-react';
import { Form, Formik } from 'formik';
import TextInput from '../../app/common/form/TextInput';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { updateUserPassword } from '../../app/firestore/firebaseService';
import { toast } from 'react-toastify';

const AccountPage = () => {
    const { currentUser } = useSelector(state => state.auth);

    return (
        <Segment>
            <Header dividing size='large' content='Account' />
            {currentUser.providerId === 'password' && (
                <>
                    <Header color='teal' sub content='Change Password' />
                    <p>Use this form to change your password</p>
                    <Formik
                        initialValues={{ newPassword1: '', newPassword2: '' }}
                        validationSchema={Yup.object({
                            newPassword1: Yup.string().required(
                                'Password is required'
                            ),
                            newPassword2: Yup.string()
                                .oneOf(
                                    [Yup.ref('newPassword1')],
                                    'Passwords do not match'
                                )
                                .required('Confirm your new password'),
                        })}
                        onSubmit={async (
                            values,
                            { setSubmitting, setErrors, resetForm }
                        ) => {
                            try {
                                await updateUserPassword(values);
                                toast.success(
                                    'Successfully updated your password'
                                );
                                resetForm({ values: '' });
                            } catch (error) {
                                setErrors({ auth: error.message });
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ errors, isSubmitting, isValid, dirty }) => (
                            <Form className='ui form'>
                                <TextInput
                                    name='newPassword1'
                                    type='password'
                                    placeholder='New Password'
                                />
                                <TextInput
                                    name='newPassword2'
                                    type='password'
                                    placeholder='Confirm Password'
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
                                    style={{ display: 'block' }}
                                    type='submit'
                                    disabled={
                                        !isValid || isSubmitting || !dirty
                                    }
                                    loading={isSubmitting}
                                    size='large'
                                    positive
                                    content='Update password'
                                />
                            </Form>
                        )}
                    </Formik>
                </>
            )}
            {currentUser.providerId === 'facebook.com' && (
                <>
                    <Header color='teal' sub content='Facebook account' />
                    <p>Please visit Facebook to update your account</p>
                    <Button
                        icon='facebook'
                        color='facebook'
                        as={Link}
                        to='https://www.facebook.com'
                        content='Go to Facebook'
                    />
                </>
            )}
            {currentUser.providerId === 'google.com' && (
                <>
                    <Header color='teal' sub content='Google account' />
                    <p>Please visit Google to update your account</p>
                    <Button
                        icon='google'
                        color='google plus'
                        as={Link}
                        to='https://www.google.com'
                        content='Go to Google'
                    />
                </>
            )}
        </Segment>
    );
};

export default AccountPage;
