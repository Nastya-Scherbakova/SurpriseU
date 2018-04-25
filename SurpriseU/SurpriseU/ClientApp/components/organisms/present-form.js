import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components'
import { Field, Form,Slider, Select, FieldArea } from '../molecules'
import { Button, Layout, Textarea  } from '../atoms'
import { Autocomplete } from '../organisms' 
import { withRouter } from 'react-router-dom'
import { ProfileTemplate } from '../templates'
@inject('presentsStore', 'tagsStore')
@withRouter
@observer
export default class PresentForm extends Component {
    
    componentDidMount = () => this.props.history.location.pathname.includes('new') ?
        this.props.presentsStore.newPresent() :
        this.props.presentsStore.getEditablePresent(this.props.match.params.presentId);



    render() {
        const  { onFieldChange, onFieldBlur, onAgeFieldChange, onAgeChange } = this.props.presentsStore;
        const present = this.props.presentsStore.formPresent,
            errors = this.props.presentsStore.formErrors;
        const { likes, celebrations } = this.props.tagsStore;
        return <ProfileTemplate><Form>
            <Field name='title'
                value={present.title}
                onChange={onFieldChange}
                onBlur={onFieldBlur}
                error={errors.title}
                label='Назва' />
            <FieldArea name='content'
                value={present.content}
                onChange={onFieldChange}
                onBlur={onFieldBlur}
                error={errors.content}
                label='Інформація' />
            <Field name='photo'
                value={present.photo}
                onChange={onFieldChange}
                onBlur={onFieldBlur}
                error={errors.photo}
                label='Фото' />
            <Select name='gender' 
                values={genders} 
                value={present.gender}
                onChange={onFieldChange} />
            <Slider 
                error={errors.startAge}
                start={present.startAge}
                end={present.endAge} 
                onChange={onAgeChange}
                onFieldChange={onAgeFieldChange}
                onBlur={onFieldBlur} />
            <Tags><Autocomplete width='47%'
                suggestions={likes} />
            <Autocomplete width='47%'
                suggestions={celebrations} /></Tags>
        </Form> </ProfileTemplate>;
    }
}


const Tags = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`


const genders = [
    {
        icon: 'Mars',
        value: 1
    },{
        icon: 'BothGenders',
        value: 0
    },{
        icon: 'Venus',
        value: 2
    },
];