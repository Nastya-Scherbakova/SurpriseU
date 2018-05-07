import {
    CHANGE_FIELD,
    BLUR_FIELD
} from '../actionTypes';

import { validate } from './validations';

export const update = (key, value) => ({
    type: CHANGE_FIELD,
    key, value
})

export const blur = (key, value) => ({
    type: BLUR_FIELD,
    error: validate(key, value),
    key, value
})

