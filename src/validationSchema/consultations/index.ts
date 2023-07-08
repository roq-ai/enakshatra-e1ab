import * as yup from 'yup';

export const consultationValidationSchema = yup.object().shape({
  status: yup.string().required(),
  date_time: yup.date().required(),
  customer_id: yup.string().nullable(),
  consultant_id: yup.string().nullable(),
});
