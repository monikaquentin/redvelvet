import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'attributes',
  initialState: {
    attr: undefined
  },
  reducers: {
    setAttributes: (state, action) => (state = action.payload)
  }
})

export const { setAttributes } = slice.actions
export const attributes = (state) => state.attributes
export const attr = (state) => state.attributes.attr
export default slice.reducer
