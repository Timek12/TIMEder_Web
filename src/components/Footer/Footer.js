// src/components/Footer/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-facebook"></i>
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-twitter"></i>
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-instagram"></i>
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-linkedin"></i>
                        </a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;