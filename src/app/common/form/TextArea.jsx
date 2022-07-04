import { useField } from 'formik';
import { FormField, Label } from 'semantic-ui-react';

const TextArea = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <FormField error={meta.touched && !!meta.error}>
            <label>{label}</label>
            <textarea {...field} {...props} />
            {meta.touched && meta.error ? (
                <Label
                    basic
                    pointing='above'
                    size='small'
                    color='red'
                    content={meta.error}
                />
            ) : null}
        </FormField>
    );
};

export default TextArea;
