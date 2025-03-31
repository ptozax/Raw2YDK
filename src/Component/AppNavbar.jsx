import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';


import { NavLink } from 'react-router-dom';


import { GiDiamondRing, GiBroadsword } from 'react-icons/gi';
import { FaGem, FaUsers, FaArchive, FaTools, FaQrcode, FaBook, FaCog, FaDatabase } from 'react-icons/fa';


function AppNavbar() {


    const mainNavLinks = [
        { key: "#/", href: "/", icon: FaGem, text: "Home" },
        { key: "#/Cards", href: "/Cards", icon: FaQrcode, text: "Cards Info" },
        { key: "#/Convert", href: "/Convert", icon: FaTools, text: "Convert Text To YDK" },
        // { key: "/characters", href: "/characters", icon: BsPeopleFill, text: "Characters"},
        // { key: "/teams", href: "/teams", icon: FaUsers, text: "Teams"}, // Assuming count 9 from image text
        // { key: "/archive", href: "/archive", icon: FaArchive, text: "Archive" },
        // { key: "/scanners", href: "/scanners", icon: FaQrcode, text: "Scanners" },
        // { key: "/docs", href: "/docs", icon: FaBook, text: "Docs" },
    ];

    const settingsNavLinks = [
        // { key: "/settings", href: "/settings", icon: FaCog, text: "Settings" },
        // { key: "/database", href: "/database", icon: FaDatabase, text: "Database", count: 1 },
    ];

   
    // Style object for the active link (matches the image highlight)
    const activeStyle = {
        borderBottom: '3px solid #0dcaf0', // Using Bootstrap 'info' color
        color: 'white' // Ensure text is white when active on dark background
    };
     const inactiveStyle = {
        // color: 'rgba(255, 255, 255, 0.55)' // Example: Default Bootstrap inactive color for variant="dark"
     };


    const renderNavLinkContent = (item) => (
        <>
            {item.icon && <item.icon className="me-2" />}
            <span>{item.text}</span>
            {item.count !== undefined && (
                <Badge pill bg="secondary" className="ms-2">
                    {item.count}
                </Badge>
            )}
        </>
    );

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
            <Container fluid>
                <Navbar.Brand as={NavLink} to="/">
                    <GiDiamondRing size="1.5em" className="me-2" />
                    Raw2YDK
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {mainNavLinks.map((item) => (
                            <Nav.Link
                                key={item.key}
                                as={NavLink}
                                to={item.href} 
                                style={({ isActive }) => isActive ? activeStyle : inactiveStyle }
                            >
                                {renderNavLinkContent(item)}
                            </Nav.Link>
                        ))}
                    </Nav>
                    <Nav>
                       {settingsNavLinks.map((item) => (
                             <Nav.Link
                                key={item.key}
                                as={NavLink} // Render Nav.Link as NavLink
                                to={item.href} // Use 'to' prop for destination path
                                style={({ isActive }) => isActive ? activeStyle : inactiveStyle }
                            >
                                {renderNavLinkContent(item)}
                            </Nav.Link>
                        ))}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppNavbar;