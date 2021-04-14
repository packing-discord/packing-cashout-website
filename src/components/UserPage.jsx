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

            <h5>You currently have {scoreData.wins} wins and {scoreData.losses} losses, and a total of <b style={{
                color: 'orange'
            }}>{scoreData.points}</b> points to spend here!</h5>
            <div className="prices-grid">
                <div style={{
                    padding: '30px',
                    backgroundColor: darkmode ? '#292b2f' : '#FFA50080'
                }}>
                    <div style={{
                        padding: '10px',
                        textAlign: 'center'
                    }}>
                        $5 PayPal
                    </div>
                    <hr />
                    <div>
                        <Button style={{
                            width: '100%'
                        }}>Buy</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPage
