import * as Yup from "yup";

export const GeneralSettingsScheme = Yup.object().shape({
  title: Yup.string().required('Поле "title" обязательно'),
  description: Yup.string().required('Поле "description" обязательно'),
  theme: Yup.string().required('Поле "theme" обязательно'),
  isPublic: Yup.boolean(),
  users: Yup.array().when("isPublic", {
    is: (isPublic) => !isPublic,
    then: () =>
      Yup.array().min(1, "Пожалуйста, добавьте хотя бы одного пользователя"),
    otherwise: () => Yup.array().notRequired(),
  }),
});
