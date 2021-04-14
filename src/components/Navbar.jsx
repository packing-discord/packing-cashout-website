import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Navbar, NavbarNav, NavbarBrand, NavbarContent } from 'reacthalfmoon';
import DarkModeToggle from "react-dark-mode-toggle";

const PackingNavbar = () => {

    const darkmode = useStoreState((state) => state.darkmode);
    const setDarkmode = useStoreActions((actions) => actions.setDarkmode);
    
    const userData = useStoreState((state) => state.userData);

    const handleToggleDarkmode = () => setDarkmode(!darkmode);

    return (
        <Navbar>
            <NavbarContent style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
                <NavbarBrand>
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
                        {userData.username}#{userData.discriminator}
                    </div>}
                </NavbarNav>
            </NavbarContent>
        </Navbar>
    )
}

export default PackingNavbar
