import { useStoreState } from 'easy-peasy'
import React from 'react'
import { Button } from 'reacthalfmoon';
import './UserPage.css';

const UserPage = () => {

    const darkmode = useStoreState((state) => state.darkmode);

    const userData = useStoreState((state) => state.userData);
    const scoreData = useStoreState((state) => state.scoreData);

    return (
        <div style={{
            margin: '20px'
        }}>
            <h4 style={{
                textAlign: 'center'
            }}>Welcome, {userData.username}#{userData.discriminator}</h4>

            <h5 style={{
                textAlign: 'center'
            }}>You currently have <b style={{
                color: 'orange',
                fontSize: '1.3em'
            }}>{scoreData.points}</b> points to spend here!</h5>
            <div style={{
                marginLeft: '10px'
            }}>
                <h4>Rewards</h4>
                <p>Rewards can be bought using points!  Click on "Buy" and claim the money on PayPal!</p>
                <div className="prices-grid">
                    <div style={{
                        padding: '30px',
                        backgroundColor: !darkmode ? 'rgb(0, 121, 193, 0.1)' : '#0079C1'
                    }}>
                        <h6 style={{
                            textAlign: 'center'
                        }}>
                            $5 PayPal
                        </h6>
                        <hr />
                        <div style={{
                            textAlign: 'center'
                        }}>
                            <img src={process.env.PUBLIC_URL + '/paypal.png'} alt="PayPal" />
                        </div>
                        <hr />
                        <div>
                            <Button style={{
                                width: '100%',
                                backgroundColor: !darkmode ? '#0079C1' : '#00457C',
                                color: 'white'
                            }}>Buy</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPage
