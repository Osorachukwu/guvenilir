import React from 'react'
import companyLogo from "../../assets/logo.png"
import { Link } from 'react-router-dom'

export default function Logo({ logoSize = 140 }) {
    return (
        <Link to="/">
            <img src={companyLogo} alt="Glassdoor Holdings" width={logoSize} />
        </Link>
    )
}