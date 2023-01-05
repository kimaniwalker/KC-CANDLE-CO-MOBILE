import React from 'react'
import Form from '../components/auth/Form'

export default function SignUpScreen() {


    return (
        <>
            <Form isSignup={true} setShowSignUp={() => true} showSignUp={true} />
        </>
    )
}
