import { Formik, Form as FormikForm } from 'formik';
import React from 'react';

interface FormikProps {
  initialValues: any;
  onSubmit: (values: any) => void;
  validationSchema?: any;
  children: React.ReactNode;
  enableReinitialize?: boolean;
}
const Form = (props: FormikProps) => {
  const {
    initialValues,
    onSubmit,
    validationSchema,
    children,
    enableReinitialize,
  } = props;
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize={enableReinitialize}
    >
      {() => <FormikForm>{children}</FormikForm>}
    </Formik>
  );
};

Form.defaultProps = {
  enableReinitialize: false,
};
export default Form;
