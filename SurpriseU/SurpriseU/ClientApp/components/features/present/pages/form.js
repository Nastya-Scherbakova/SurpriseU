import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import { Field, Form, Slider, GenderTriple, FieldArea } from '../../../molecules'
import { Button, Layout, Textarea } from '../../../atoms'
import { Autocomplete } from '../../../organisms' 
import { ProfileTemplate } from '../../../templates'

@inject('presentsStore', 'tagsStore')
@withRouter
@observer
export default class PresentForm extends Component {
    
    componentDidMount = () => this.props.history.location.pathname.includes('new') ?
        this.props.presentsStore.newPresent() :
        this.props.presentsStore.getEditablePresent(this.props.match.params.presentId);

    submit = () => this.props.presentsStore.onSubmit();


    render() {
        const { onFieldChange, onFieldBlur } = this.props.presentsStore;
        const present = this.props.presentsStore.formPresent,
            errors = this.props.presentsStore.formErrors;
        const { likes, celebrations } = this.props.tagsStore;
        return (
            <ProfileTemplate>
                <Form submit={this.submit} title={this.props.history.location.pathname.includes('new') ? 'Додати подарунок' : 'Редагувати'} >
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
                        label='Фото'
                    />
                    <GenderTriple
                        value={present.gender}
                        onChange={onFieldChange}
                    />
                    <Slider
                        startAge={present.startAge}
                        endAge={present.endAge}
                        onChange={onFieldChange}
                    />
                    <Tags>
                        <Autocomplete width='47%'
                            suggestions={likes}
                            title='Подобається'
                        />
                        <Autocomplete width='47%'
                            suggestions={celebrations}
                            title='Свята'
                        />
                    </Tags>
                </Form>
            </ProfileTemplate>
        )
    }
}


const Tags = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

