import React from 'react'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import PropTypes from 'prop-types'

function ContactList({ auth, contact, fetchContact, handleClickContact }) {
    const [contactList, setContactList] = useState([])


    useEffect(() => {
        if(auth.isAuthenticated) {
            fetchContact(auth.user)
        }
    }, [auth, fetchContact])

    useEffect(() => {
        if(contact.user) {
            setContactList(contact.user)
        }
    }, [contact])

    const renderListItem = () => {
        if(contactList) {
            return contactList.map((eachContact) => {
                return <button onClick={() => handleClickContact(eachContact)} className="show-details-button" key={eachContact.email}><li className="list-group-item">
                    <img width="25px" src={eachContact.avatar} className="avatar-image" alt=""/>
                    <span className = 'list-text'>{eachContact.firstname + ' ' + eachContact.lastname}</span>
                </li></button>
            })
        }
    }

    return (
        <div className="contact-list">
            {contact.user && contact.user.length > 0 && <ul className="list-group">
                {renderListItem()}
            </ul>}
            {contact.user && contact.user.length === 0 && 'No contacts to display.'}
        </div>
    )
}

function mapStateToProps( { auth, contact } ) {
    return {
        auth,
        contact
    }
}

ContactList.propTypes = {
    auth: PropTypes.object.isRequired,
    contact: PropTypes.object.isRequired,
    handleClickContact: PropTypes.func.isRequired,
    fetchContact: PropTypes.func.isRequired
}


export default connect(mapStateToProps, actions) (ContactList)
