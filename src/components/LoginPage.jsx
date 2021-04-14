import { useStoreState } from 'easy-peasy'
import React from 'react'
import { Button } from 'reacthalfmoon'
import LoadingAnimation from './LoadingAnimation';

const LoginPage = () => {

    const loginLoading = useStoreState((state) => state.loginLoading);

    const handleClick = () => {
        window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${escape(process.env.REACT_APP_REDIRECT_URI)}&response_type=code&scope=identify%20email`
    }

    return (
        <div style={{
            display: 'grid',
            placeItems: 'center',
            height: '100%'
        }}>
            {!loginLoading ? <Button onClick={handleClick}>Login using Discord</Button> : <LoadingAnimation />}
        </div>
    )
}

export default LoginPage