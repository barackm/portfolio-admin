import { Formik, Form as FormikForm } from 'formik';
import React from 'react';

interface FormikProps {
  initialValues: any;
  onSubmit: (values: any) => void;
  validationSchema: any;
  children: React.ReactNode;
}
const Form = (props: FormikProps) => {
  const { initialValues, onSubmit, validationSchema, children } = props;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <FormikForm>{children}</FormikForm>}
    </Formik>
  );
};

export default Form;
