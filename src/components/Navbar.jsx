import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Navbar, NavbarNav, NavbarBrand, NavbarContent, Button } from 'reacthalfmoon';
import DarkModeToggle from "react-dark-mode-toggle";

const PackingNavbar = () => {

    const darkmode = useStoreState((state) => state.darkmode);
    const setDarkmode = useStoreActions((actions) => actions.setDarkmode);
    const logout = useStoreActions((actions) => actions.logout);
    
    const userData = useStoreState((state) => state.userData);

    const handleToggleDarkmode = () => setDarkmode(!darkmode);

    return (
        <Navbar>
            <NavbarContent style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
                <NavbarBrand style={{
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden'
                }}>
                    Packing Discord
                </NavbarBrand>
                <DarkModeToggle
                    onChange={handleToggleDarkmode}
                    checked={!darkmode}
                    size={60}
                    className="darkmode-toggler"
                />
                <NavbarNav>
                    {userData && <div style={{
                        padding: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <img src={userData.avatarURL} alt="user" style={{
                            borderRadius: '50%',
                            height: '30px',
                            marginRight: '10px'
                        }} />
                        <p>{userData.username}#{userData.discriminator}</p>
                        <Button style={{
                            marginLeft: '10px'
                        }} onClick={logout}>Logout</Button>
                    </div>}
                </NavbarNav>
            </NavbarContent>
        </Navbar>
    )
}

export default PackingNavbar
