import React from 'react'
import { useEffect, useState } from 'react'

function ContactDetails({currentContact}) {
    const [contact, setContact] = useState({})
    useEffect(()=> {
        if(currentContact) {
            setContact(currentContact)
        }
    }, [currentContact])
    return (
        <div className="contact-detail-div">
            <img src={contact.avatar} className="avatar-contact" width="100px" alt=""/>
            <span id="contact-details">{contact.firstname + ' ' + contact.lastname}</span>
            <hr/>
            <p><span className="email-label">Email</span><span className="email-details">{contact.email}</span></p>
        </div>
    )
}

export default ContactDetails