import * as types from '../types';

/**
 * Action creators, these are functions that create actions.
 * Action creators are pure functions.
 */
export const listBlogs = (text) => {
    return {
        type: types.LIST_BLOGS,
        text
    }
}

export const enumerateBlogs = (index) => {
    return {
        type: types.ENUMERATE_BLOGS,
        index

    }
 }