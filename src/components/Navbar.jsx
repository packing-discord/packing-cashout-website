import React from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Navbar, NavbarNav, NavbarBrand, NavbarContent, Switch } from 'reacthalfmoon';

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
                <NavbarNav>
                    <Switch 
                        checked={!darkmode} 
                        toggle={()=> handleToggleDarkmode()}
                        style={{
                            marginRight: '10px'
                        }}
                    >
                        Darkmode
                    </Switch>
                    {userData && <div style={{
                        padding: '10px',
                        borderRadius: '4px',
                        border: '1px solid orange'
                    }}>
                        {userData.username}
                    </div>}
                </NavbarNav>
            </NavbarContent>
        </Navbar>
    )
}

export default PackingNavbar
