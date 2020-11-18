import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import PropTypes from 'prop-types'
import { NavLink, withRouter } from 'react-router-dom'
import isEmpty from '../../validation/isEmpty'
import $ from 'jquery'

export class NavBar extends Component {
    state = {
            iniFirstname: '',
            iniLastname: '',
            firstname: '',
            lastname:'',
            email: '',
            avatar: '',
            password: '',
            password_confirm: '',
            change_pw_flag: false,
            errors: {}
        }

    componentDidMount() {
        if(this.props.auth) {
            const { auth: { user } } = this.props
        this.setState({iniFirstname: user.firstname,
            iniLastname: user.lastname,
            firstname: user.firstname, 
            lastname: user.lastname, 
            email: user.email, 
            avatar: user.avatar})
        }
        
    }

    logout = () => {
        this.props.logoutUser()
        this.props.history.push('/signin')
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value.trim(),
            errors: {}
        })
    }

    handleCheck = (e) => {
        this.setState({ change_pw_flag: !this.state.change_pw_flag, password: '', password_confirm: ''})
    }
    
    handleSubmit = async (e) => {
        e.preventDefault()
            const editUser = {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                password: this.state.password,
                password_confirm: this.state.password_confirm,
                change_pw_flag: this.state.change_pw_flag
            }
            await this.props.editUser(editUser)
            if(isEmpty(this.state.errors)) {
                $('.modal').modal('hide')
                const { auth: { user } } = this.props
                this.setState({iniFirstname: user.firstname,
                    iniLastname: user.lastname,
                    firstname: user.firstname, 
                    lastname: user.lastname, 
                    email: user.email, 
                    avatar: user.avatar})
        }
    }

    
    reset = (e) => {
        this.setState({
            firstname: this.state.iniFirstname,
            lastname: this.state.iniLastname,
            password: '',
            password_confirm: ''
        })
    }

    handleEdit = (e) => {
        this.setState({
            errors: {},
            change_pw_flag: false,
        })
    }

    onChange = (e) => {
        this.setState({avatar_upload:e.target.files[0]})
    }


    componentDidUpdate(prevProps) {
        if (this.props.errors !== prevProps.errors) {
            this.setState({ errors: this.props.errors })
        }
    }

    render() {
        const { firstname, lastname, email, avatar } = this.state
        const name = `${firstname} ${lastname}`
        const { errors } = this.state
        return (
            <>
            <nav className="navbar navbar-dark navbar-expand fixed-top">
                <NavLink exact={true} activeClassName='is-active' className="navbar-brand" to="/">
                <img src="/logo.png" width="55" height="55" className="d-inline-block align-top logo-img" alt=""/>
                <span id="app-name">Chatterbox</span>
                </NavLink>
                <ul className="navbar-nav ml-auto mr-1">
                    <li className="nav-item">
                        <NavLink activeStyle={{ color: 'white' }}  activeClassName='is-active' className="nav-link video-link" to="/roomchat">
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-camera-video" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175l3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z"/>
                    </svg> Join a Room
                        </NavLink>
                    </li>
                    <li className="nav-item dropdown dropleft">
                        <a className="nav-link dropdown-toggle avatar" 
                            id="navbarDropdown" role="button" data-toggle="dropdown" 
                            aria-haspopup="true" aria-expanded="false">
                            <img src={avatar} className="avatar-image" width="30px" alt=""/>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <svg onClick={this.handleEdit} data-toggle="modal" data-target="#editInfoModal" 
                                width="1em" height="1em" viewBox="0 0 16 16" 
                                className="bi bi-pencil-fill" fill="currentColor" 
                                xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                            </svg>
                            <div className="dropdown-item user-info name">{name}</div>
                            <div className="dropdown-item user-info email-dropdown">{email}</div>
                            <div className="dropdown-divider"></div>
                                <button className="dropdown-item" onClick={this.logout}>SIGN OUT</button>
                        </div>
                    </li>
                </ul>
            </nav>
            <div className="modal fade" data-backdrop="static" data-keyboard="false" id="editInfoModal" tabIndex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editModalLabel">Edit Profile</h5>
                                <button type="button" className="close" onClick = {this.reset} data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                    <form onSubmit={ this.handleSubmit } className="edit-form">
                    <div className="modal-body">
                                    <div className="form-group">
                                        <input type="text" 
                                            name="firstname" 
                                            id="inputFirstName" 
                                            className="form-control" 
                                            placeholder="First Name" 
                                            onChange={ this.handleInputChange }
                                            value = { firstname }/>
                                        {errors.firstname && (<div className="error text-danger">{errors.firstname}</div>)}
                                    </div>
                                    <div className="form-group">
                                        <input type="text" 
                                                id="inputLastName" 
                                                name="lastname" 
                                                className="form-control" 
                                                placeholder="Last Name"
                                                onChange={ this.handleInputChange }
                                                value = { lastname }/>
                                        {errors.lastname && (<div className="error text-danger">{errors.lastname}</div>)}
                                    </div>
                                    <div className="custom-control custom-switch">
                                        <input name = "change_pw_flag" type="checkbox" value={this.state.change_pw_flag} checked = {this.state.change_pw_flag} onChange={ this.handleCheck } className="custom-control-input" id="customSwitch1"/>
                                        <label className="custom-control-label" htmlFor="customSwitch1">Change Password</label>
                                    </div>
                                    {this.state.change_pw_flag ? 
                                    <div>
                                    <div className="form-group">
                                        <input type="password" 
                                            name="password" 
                                            id="inputPassword" 
                                            className="form-control" 
                                            placeholder="Password"
                                            onChange={ this.handleInputChange }></input>
                                        {errors.password && (<div className="error text-danger">{errors.password}</div>)}
                                    </div>
                                    <div className="form-group">
                                        <input type="password" 
                                            name="password_confirm" 
                                            id="inputPasswordConfirmed" 
                                            className="form-control" 
                                            placeholder="Password Confirmed"
                                            onChange={ this.handleInputChange }></input>
                                        {errors.password_confirm && (<div className="error text-danger">{errors.password_confirm}</div>)}
                                    </div></div> : null}
                            </div> 
                            <div className="modal-footer">
                                <button type="button" onClick={this.reset} className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div>
                    </form>
                    </div>
                </div>
             </div>
         </>
        )
    }
}

function mapStateToProps( { auth, errors } ) {
    return {
        errors,
        auth
    }
}

NavBar.propTypes = {
    editUser: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

export default connect(mapStateToProps, actions) (withRouter(NavBar))
