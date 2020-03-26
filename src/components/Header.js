import React from 'react';

class Header extends React.Component {
    render() {
        return(
            <div style={{
                marginLeft: "5%",
                marginRight: "5%",
                marginTop: "1%",
                paddingBlock: "10px",
                height: "auto",
                backgroundColor: "#F7F7F7",
                display: "flex",
                justifyContent: "space-between"
            }}>
                <img src="../anumatiLogo.jpg" style={{
                    marginTop: "auto",
                    marginBottom: "auto",
                    opacity: "0.5"
                }} />
                <h5 style={{
                    fontWeight: "600",
                    fontSize: "14px",
                    color: "#909090",
                    marginTop: "auto",
                    marginBottom: "auto"
                }}>Sign out</h5>
            </div>
        );
    }
}

export default Header;