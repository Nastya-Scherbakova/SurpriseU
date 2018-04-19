import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react';

import { Field, Form,MySlider, Select, FieldArea } from '../molecules'
import { Button, Layout, Textarea  } from '../atoms'

@inject('presentsStore')
@observer
export default class PresentForm extends Component {
    render() {
        const  { onFieldChange, onFieldBlur, onAgeFieldChange, onAgeChange } = this.props.presentsStore;
        const present = this.props.presentsStore.formPresent,
              errors = this.props.presentsStore.formErrors;
        return <Form>
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
            <MySlider 
                error={errors.startAge}
                start={present.startAge}
                end={present.endAge} 
                onChange={onAgeChange}
                onFieldChange={onAgeFieldChange}
                onBlur={onFieldBlur}
                  />
            <Button shine darkblue>Зберегти</Button>

        </Form>;
    }
}

const genders = [
    {
        icon: 'Mars',
        value: 1
    },{
        icon: 'Circle',
        value: 0
    },{
        icon: 'Venus',
        value: 2
    },
];