import { Button, ButtonGroup, VStack, Heading } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React from 'react'
import { formSchema } from '../../utils/schema'
import TextField from '../TextField'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
            }}
            validationSchema={formSchema}
            onSubmit={(values, actions) => {
                const vals = { ...values }
                fetch('http://localhost:4000/auth/login', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(vals),
                })
                    .catch((err) => {
                        return
                    })
                    .then((res) => {
                        if (!res || !res.ok || res.status >= 400) {
                            return
                        }
                        return res.json()
                    })
                    .then((data) => {
                        if (!data) return
                        console.log(data)
                        actions.resetForm()
                    })
            }}
        >
            <VStack
                as={Form}
                w={{ base: '90%', md: '500px' }}
                m="auto"
                justify="center"
                h="85vh"
                spacing="1rem"
            >
                <Heading>Log In</Heading>
                <TextField
                    name="username"
                    placeholder="Enter username"
                    label="Username"
                />
                <TextField
                    name="password"
                    placeholder="Enter password"
                    label="Password"
                    type="password"
                />
                <ButtonGroup pt="1rem">
                    <Button colorScheme="teal" type="submit">
                        Login
                    </Button>
                    <Button onClick={() => navigate('/register')}>
                        Create Account
                    </Button>
                </ButtonGroup>
            </VStack>
        </Formik>
    )
}

export default Login
