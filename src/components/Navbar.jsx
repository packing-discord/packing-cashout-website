import React, { useState } from 'react'
import { Navbar, NavbarNav, NavbarBrand, NavbarContent, Switch, toggleDarkmode } from 'reacthalfmoon';

const PackingNavbar = () => {

    const [darkmode, setDarkmode] = useState(false);

    const handleToggleDarkmode = () => {
        setDarkmode(!darkmode);
        toggleDarkmode(!darkmode);
    }

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
                    checked={darkmode} 
                    toggle={()=> handleToggleDarkmode()}
                    style={{
                        marginRight: '10px'
                    }}
                >
                    Darkmode
                </Switch> 
                  <div style={{
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid orange'
                  }}>
                    Androz#2091
                  </div>
                </NavbarNav>
            </NavbarContent>
        </Navbar>
    )
}

export default PackingNavbar
