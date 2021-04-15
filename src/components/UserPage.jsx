import { useStoreState, useStoreActions } from 'easy-peasy'
import React, { useState } from 'react'
import { Button, Modal, ModalDialog, ModalContent, ModalTitle, Input, stickyAlert, Table } from 'reacthalfmoon';
import { buyProduct } from '../api';
import './UserPage.css';

const UserPage = () => {

    const darkmode = useStoreState((state) => state.darkmode);

    const jwt = useStoreState((state) => state.jwt);
    const userData = useStoreState((state) => state.userData);
    const scoreData = useStoreState((state) => state.scoreData);
    const products = useStoreState((state) => state.products);
    const history = useStoreState((state) => state.history);
    
    const updateScore = useStoreActions((actions) => actions.updateScore);
    const updateHistory = useStoreActions((actions) => actions.updateHistory);

    const [isBuyModalOpen, setBuyModalOpen] = useState(false)
    const [emailAddress, setEmailAddress] = useState(userData.email);

    const [currentProduct, setCurrentProduct] = useState(null);
    const [transactionState, setTransactionState] = useState(null);
    const [transactionError, setTransactionError] = useState(null);

    const showCurrentProductModal = (product) => {
        setCurrentProduct(product);
        setBuyModalOpen(true);
    }

    const handleConfirmClick = () => {
        setTransactionState('PENDING');
        buyProduct(jwt, currentProduct.id, emailAddress).then((data) => {
            if (data.error) {
                setTransactionState('ERRORED');
                setTransactionError(data.message || 'Something went wrong');
            } else {
                updateScore(data.scoreData);
                updateHistory(data.history);
                setTransactionState('SUCCESS');
                setBuyModalOpen(false);
                stickyAlert({
                    title: "Success",
                    content: "Your payment will be processed in the next few hours!"
                });
            }
        });
    };

    return (
        <>
        <Modal isOpen={isBuyModalOpen} toggle={()=>{setBuyModalOpen(!isBuyModalOpen)}}>
            <ModalDialog>
                <ModalContent>
                    <ModalTitle>Where should we send the money?</ModalTitle>
                    {transactionError && (<u style={{ color: 'red' }}>{transactionError}</u>)}
                    <p>Enter your PayPal email address below:</p>
                    <Input value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} style={{
                        marginBottom: '20px'
                    }} />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <Button onClick={()=>{setBuyModalOpen(!isBuyModalOpen)}}>Cancel</Button>
                        <Button disabled={transactionState === 'PENDING'} onClick={()=> handleConfirmClick()} style={{
                            backgroundColor: transactionState === 'ERRORED' ? 'red' : 'green',
                            color: 'white'
                        }}>{transactionState === 'ERRORED' ? 'Retry' : 'Confirm'}</Button>
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
                    {products.map((product) => {
                        return (
                            <div key={product.id} style={{
                                padding: '10px',
                                backgroundColor: !darkmode ? 'rgb(0, 121, 193, 0.1)' : 'rgb(0, 121, 193, 0.2)',
                                borderRadius: '10px',
                                margin: '20px'
                            }}>
                                <h6 style={{
                                    textAlign: 'center',
                                }}>
                                    <b>{product.name}</b>
                                </h6>
                                <hr />
                                <div style={{
                                    textAlign: 'center'
                                }}>
                                    <img src={process.env.PUBLIC_URL + '/paypal-icon.webp'} alt="PayPal" style={{
                                        borderRadius: '50%',
                                        height: '150px'
                                    }} />
                                </div>
                                <hr />
                                <div>
                                    <Button style={{
                                        width: '100%',
                                        backgroundColor: !darkmode ? '#0079C1' : '#00457C',
                                        color: 'white'
                                    }} onClick={() => scoreData.points >= product.points && showCurrentProductModal(product)} disabled={scoreData.points < product.points}>Buy for {product.points} points</Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <h4>History</h4>
                <p>Here are your previous payments</p>
                {history.length > 0 ?
                (<Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Points</th>
                            <th>Money</th>
                            <th>Email (paypal)</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map((entry) => {
                        return (
                            <tr key={entry.id}>
                                <th>{entry.id}</th>
                                <td>{entry.nb_points}</td>
                                <td>${products.find((p) => p.id === entry.product_id).paypal}</td>
                                <td>{entry.email_address}</td>
                                <td>{new Date(entry.created_at).toLocaleDateString()}</td>
                                <td>{!entry.paid ? <b style={{
                                    color: 'orange'
                                }}>Processing...</b> : <b style={{
                                    color: 'green'
                                }}>Paid</b>}</td>
                            </tr>
                        )})}
                    </tbody>
                </Table>) : <p style={{
                    color: 'gray'
                }}>There is nothing here... Buy something and it will appear here!</p>}
            </div>
        </div>
        </>
    )
}

export default UserPage
