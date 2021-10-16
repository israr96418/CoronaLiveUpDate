import React from 'react'
import { Link } from 'react-router-dom'




function Navbar() {
    const navsty = {
        color: 'white'
    };

    return (
        <nav>
            <h3>Logo</h3>
            <ul className="navlist">
                <Link style={navsty} to="/about">
                    <li>About</li>
                </Link>

                <Link style={navsty} to="/shop">
                    <li>Shop</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Navbar
