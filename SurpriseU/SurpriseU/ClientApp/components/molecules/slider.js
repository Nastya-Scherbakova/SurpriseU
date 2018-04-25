import 'rc-slider/assets/index.css';
import * as React from 'react';
import Slider from 'rc-slider';
import {Error, Input} from '../atoms'
import styled, { css } from 'styled-components'
import { color, font } from '../theme'
const Range = Slider.Range;

const fieldHeight = '3.6rem'

const Wrapper = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
align-items: flex-start;
position: relative;
height: 5rem;
`
const RangeWrapper = styled.div`
    width: 55%;
    height:3.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
`
const ErrorWrapper = styled.div`
    width: 100%;
    position: absolute;
    bottom: 0;
    text-align: center;
`

const FieldContainer = styled.div`
    width: 20%;
    height: 3.6rem;
    font-family: ${font.formElement};
    color: ${color.text};
    -webkit-appearance: none;
    flex-shrink: 0;
    position:relative;
    top: 0;
    display: flex;
`


const Field = ({ error, onChange, onBlur, value, label, type, required, maxLength, name }) => (
    <FieldContainer >
        <Input
                value={value}
                onChange={e => onChange(e.target.name, e.target.value)}
                type={type}
                name={name}
                required={required}
                aria-describedby={label}
                aria-label={label}
                aria-required={required}
                maxLength={maxLength}
                autoCapitalize="false"
                autoCorrect="false"
                rounded
                back={color.backgroundWhite}
            />
    </FieldContainer>
);

export default class MySlider extends React.Component {
    state = {
        start: this.props.start,
        end: this.props.end,
        error: null
    }

   onChange = (field, value) => {
        const newAge = /[^[0-9]/.test(value) ? this.state[field] : Number(value);
       const error = (this.state.start > this.state.end) ?
           'Початковий вік має бути меншим ніж кінцевий' : '';
       this.setState({ [field]: newAge, error: error });
    };

    render() {
        const { onChange } = this.props;
        const { start, end, error } = this.state;
        return <Wrapper><Field
            name='start'
            value={start.toString()}
            onChange={this.onChange} />
            <RangeWrapper>
                <Range
                    value={[start, end]}
                    onChange={onChange}
                    allowCross={false} />
            </RangeWrapper>
            <Field
                name='end'
                value={end.toString()}
                onChange={this.onChange} />
            <ErrorWrapper>
                <Error
                    error={this.state.error}
                    active={(error && (error.length > 0)) ? true : false} />
            </ErrorWrapper>
        </Wrapper>;
    }
}
