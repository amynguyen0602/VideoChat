import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import NavBar from './layout/NavBar'
import ContactDetails from './contact/ContactDetails'
import isEmpty from '../validation/isEmpty'
import * as actions from '../actions'
import $ from 'jquery'
import RoomList from './contact/RoomList'
import ContactList from './contact/ContactList'
import RoomDetails from './contact/RoomDetails'

export class Home extends Component {
    state = {
        email: '',
        errors: {},
        showContactDetails: false,
        showRoomDetails: false,
        currentContact: {},
        currentRoom: {}
    }
    async componentDidMount() {
        if(!this.props.auth.isAuthenticated) {
            this.props.history.push('/signin')
        }
    }

    handleAdd = (e) => {
        this.setState({
            email: '',
            errors: {}
        })
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            errors: {}
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.errors !== prevProps.errors) {
            this.setState({ errors: this.props.errors })
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault()
            const contact = {
                email: this.state.email
            }
            const { user } = this.props.auth
            await this.props.addContact(user, contact)
            if(isEmpty(this.state.errors)) {
                $('.modal').modal('hide')
                this.props.fetchContact(this.props.auth.user)
            }
    }

    handleContactClick = (contact) => {
        this.setState({showContactDetails: true, showRoomDetails: false, currentContact: contact})
    } 

    handleRoomClick = (room) => {
        this.setState({showContactDetails: false, showRoomDetails: true, currentRoom: room})
    } 

    render() {
        const { errors } = this.state
        return (
            <>  
                <NavBar />
                <div className="home-body">
                <div className="row contact">
                    <div className="col-4">
                        <h5>My Contacts
                            <svg onClick={ this.handleAdd } data-toggle="modal" data-target="#addContactModal"
                                 width="1em" height="1em" viewBox="0 0 16 16" 
                                 className="plus bi bi-journal-plus" fill="currentColor" 
                                 mlns="http://www.w3.org/2000/svg">
                            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                            <path fillRule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"/>
                            </svg>
                        </h5>
                        <div className="accordion" id="accordionMyContact">
                                <div className="card text-white bg-dark">
                                    <div className="card-header" id="headingOne">
                                    <h2 className="mb-0">
                                        <button className="collapse-btn btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Contacts
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                        </button>
                                    </h2>
                                </div>
                                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionMyContact">
                                    <div className="card-body">
                                        <ContactList handleClickContact = { this.handleContactClick } />
                                    </div>
                                </div>
                        </div>
                        <div className="card text-white bg-dark">
                                <div className="card-header" id="headingTwo">
                                    <h2 className="mb-0">
                                        <button className="collapse-btn btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Rooms
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                        </button>
                                    </h2>
                                </div>
                                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionMyContact">
                                    <div className="card-body">
                                        <RoomList handleClickRoom = { this.handleRoomClick }/>    
                                    </div>
                                    </div>
                                </div>
                        </div>
                        </div>
                        <div className="col-8">
                            {!this.state.showContactDetails && !this.state.showRoomDetails && <div className="no-contact">
                                <img width= '150px' src='contact.png' alt="" />
                                <p>Click on contact name to view contact details.</p>
                            </div>}
                            {this.state.showContactDetails && <ContactDetails currentContact={this.state.currentContact} />}
                            {this.state.showRoomDetails && <RoomDetails currentRoom={this.state.currentRoom} />}
                        </div>
                    </div>
                    <div className="modal fade" data-backdrop="static" data-keyboard="false" id="addContactModal" tabIndex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="editModalLabel">Add Contact</h5>
                                        <button type="button" className="close" onClick = {this.reset} data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                            <form onSubmit={ this.handleSubmit } className="edit-form">
                            <div className="modal-body">
                                    <div className="form-group">
                                        <input type="text" 
                                            name="email" 
                                            id="inputEmail" 
                                            className="form-control" 
                                            placeholder="Email" 
                                            onChange={ this.handleInputChange }
                                            value={this.state.email} />
                                        {errors.email && (<div className="error text-danger">{errors.email}</div>)}
                                        </div>
                                    </div> 
                                    <div className="modal-footer">
                                        <button type="button" onClick={this.reset} className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary">Save changes</button>
                                    </div>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

function mapStateToProps( { auth, errors, contact } ) {
    return {
        auth,
        errors,
        contact
    }
}

Home.propTypes = {
    auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps, actions) (Home)
