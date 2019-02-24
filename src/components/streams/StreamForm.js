import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends Component {
    renderError({error, touched }){
        if(touched && error){
            return(
                <div className="ui error message">{error}</div>
            );
        }
    }
    
    renderInput = ({input, label, placeHolder, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} placeholder={placeHolder} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    }

    onSubmit = formValues => {
        this.props.onSubmit(formValues)
    };

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Title: " placeHolder="Type some title"/>
                <Field name="description" component={this.renderInput} label="Description: " placeHolder="Enter some description"/>
                <button className="ui button primary">Submit</button>
            </form>
        );
    } 
};

const validate = (formValues) => {
    const errors = {};
    if(!formValues.title){
        errors.title = 'You must enter a title';    
    }

    if(!formValues.description){
        errors.description = 'You must enter a descriptions';
    }

    return errors;
};

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);
