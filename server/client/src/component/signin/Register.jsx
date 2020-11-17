import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

export class Register extends Component {
    state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            password_confirm: '',
            errors: {}
        }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        }
        this.props.registerUser(user, this.props.history)
        
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.errors !== prevProps.errors) {
            this.setState({ errors: this.props.errors })
        }
    }

    render() {
        const { errors } = this.state
        return (
            <div className="form-center">
                <form onSubmit={ this.handleSubmit } className="form-signin">
                <img className="mb-4 logo" src="./logo.png" alt="" width="150" height="150" />
                <div className="form-group">
                    <input type="text" 
                        name="firstname" 
                        id="inputFirstName" 
                        className="form-control" 
                        placeholder="First Name" 
                        onChange={ this.handleInputChange }/>
                    {errors.firstname && (<div className="error text-danger">{errors.firstname}</div>)}
                </div>
                <div className="form-group">
                    <input type="text" 
                            id="inputLastName" 
                            name="lastname" 
                            className="form-control" 
                            placeholder="Last Name"
                            onChange={ this.handleInputChange }/>
                    {errors.lastname && (<div className="error text-danger">{errors.lastname}</div>)}
                </div>
                <div className="form-group"> 
                    <input type="email" 
                        name="email" 
                        id="inputEmail" 
                        className="form-control" 
                        placeholder="Email address"
                        onChange={ this.handleInputChange }/>
                    {errors.email && (<div className="error text-danger">{errors.email}</div>)}
                </div>
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
                </div>
                <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">
                    Sign up
                </button>
                <div className = "sign-msg">Already had an account? &nbsp;
                <Link to="/signin">Sign in</Link></div>
                </form>
            </div>
        )
    }
}

function mapStateToProps( { errors, auth } ) {
    return {
        errors,
        auth
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

export default connect(mapStateToProps, actions) (withRouter(Register))
