import { useStoreState } from 'easy-peasy'
import React, { useState } from 'react'
import { Button, Modal, ModalDialog, ModalContent, ModalTitle, Input } from 'reacthalfmoon';
import './UserPage.css';

const UserPage = () => {

    const darkmode = useStoreState((state) => state.darkmode);

    const userData = useStoreState((state) => state.userData);
    const scoreData = useStoreState((state) => state.scoreData);

    const [isBuyModalOpen, setBuyModalOpen] = useState(false)
    const [emailAddress, setEmailAddress] = useState(userData.email);

    return (
        <>
        <Modal isOpen={isBuyModalOpen} toggle={()=>{setBuyModalOpen(!isBuyModalOpen)}}>
            <ModalDialog>
                <ModalContent>
                    <ModalTitle>Where should we send the money?</ModalTitle>
                    <p>Enter your PayPal email address below:</p>
                    <Input value={emailAddress} onChange={setEmailAddress} style={{
                        marginBottom: '20px'
                    }} />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <Button onClick={()=>{setBuyModalOpen(!isBuyModalOpen)}}>Cancel</Button>
                        <Button onClick={()=>{setBuyModalOpen(!isBuyModalOpen)}} style={{
                            backgroundColor: 'green',
                            color: 'white'
                        }}>Confirm</Button>
                    </div>
                </ModalContent>
            </ModalDialog>
        </Modal>
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
                        padding: '10px',
                        backgroundColor: !darkmode ? 'rgb(0, 121, 193, 0.1)' : 'rgb(0, 121, 193, 0.2)',
                        borderRadius: '10px'
                    }}>
                        <h6 style={{
                            textAlign: 'center',
                        }}>
                            <b>$5 Cash (PayPal)</b>
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
                            }} onClick={() => scoreData.points > 20 && setBuyModalOpen(true)} disabled={scoreData.points < 20}>Buy for 20 points</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default UserPage
