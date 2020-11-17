import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import PropTypes from 'prop-types'

export class SignIn extends Component {
    state = {
            email: '',
            password: '',
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
            email: this.state.email,
            password: this.state.password,
        }
        this.props.loginUser(user)
    }

    componentDidUpdate(prevProps) {
        if (this.props.errors !== prevProps.errors) {
            this.setState({ errors: this.props.errors })
        }
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render() {
        const { errors } = this.state
        return (
            <div className="form-center">
                <form onSubmit={ this.handleSubmit } className="form-signin">
                <img className="mb-4 logo" src="./logo.png" alt="" width="150" height="150" />
                <div className="form-group">
                    <input type="email" 
                        id="inputEmail" 
                        name="email"
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
                <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">
                    Sign in
                </button>
                <div className = "sign-msg">Don't have an account? &nbsp;
                <Link to="/register">Create new account</Link></div>
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

SignIn.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps, actions) (SignIn)
