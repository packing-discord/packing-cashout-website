import React from 'react'
import { Button } from 'reacthalfmoon'

const LoginPage = () => {

    const handleClick = () => {
        window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${escape(process.env.REACT_APP_REDIRECT_URI)}&response_type=code&scope=identify%20email`
    }

    return (
        <div style={{
            display: 'grid',
            placeItems: 'center',
            height: '100%'
        }}>
            <Button onClick={handleClick}>Login using Discord</Button>
        </div>
    )
}

export default LoginPage