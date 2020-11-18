import React from 'react'
import { useEffect, useState } from 'react'
import * as actions from '../../actions'
import { connect } from 'react-redux'
import $ from 'jquery'
import PropTypes from 'prop-types'

function ContactDetails({currentContact, deleteContact, auth, fetchContact, handleDelete }) {
    const [contact, setContact] = useState({})

    useEffect(()=> {
        if(currentContact) {
            setContact(currentContact)
        }
    }, [currentContact])

    const handleDeleteContact = async () => {
        await deleteContact(contact.email, auth.user)
        $('.modal').modal('hide')
        await fetchContact(auth.user)
        handleDelete()
    }

    return (
        <>
            <div className="contact-detail-div">
                <img src={contact.avatar} className="avatar-contact" width="100px" alt=""/>
                <span id="contact-details">{contact.firstname + ' ' + contact.lastname}</span>
                <svg width="1em" height="1em" viewBox="0 0 16 16" data-toggle="modal" data-target="#deleteModal"
                    className="bi bi-trash-fill" fill="currentColor" 
                    xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                </svg>
                <hr/>
                <p><span className="email-label">Email</span><span className="email-details">{contact.email}</span></p>
                <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Delete Contact</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Do you want to delete this contact?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={handleDeleteContact}>Delete</button>
                        </div>
                        </div>
                    </div>
                    </div>
            </div>
        </>
    )
}

function mapStateToProps( { auth } ) {
    return {
        auth
    }
}

ContactDetails.propTypes = {
    auth: PropTypes.object.isRequired,
    deleteContact: PropTypes.func.isRequired,
    fetchContact: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    currentContact: PropTypes.object.isRequired
}

export default connect(mapStateToProps, actions) (ContactDetails)