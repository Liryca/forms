import * as Yup from "yup";

export const GeneralSettingsScheme = Yup.object().shape({
  title: Yup.string().required('Поле "title" обязательно'),
  description: Yup.string().required('Поле "description" обязательно'),
  theme: Yup.string().required('Поле "theme" обязательно'),
  isPublic: Yup.boolean(),
});
