import * as Yup from 'yup'

const formSchema = Yup.object({
    username: Yup.string()
        .required('Username required')
        .min(6, 'Username too short. Minimun length is 6')
        .max(28, 'Username too long. Maximum length is 28'),
    password: Yup.string()
        .required('Password required')
        .min(6, 'Password too short. Minimun length is 6')
        .max(28, 'Password too long. Maximum length is 28'),
})

export { formSchema }
