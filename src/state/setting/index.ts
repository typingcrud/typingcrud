import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { deleteUser } from 'state/setting/deleteUser'


type DeleteUserForm = {
  confirmPassword: string
  deleteFlag: boolean
}

type SettingForm = {
  deleteUserForm: DeleteUserForm
}

const initialState: SettingForm = {
  deleteUserForm: {
    confirmPassword: '',
    deleteFlag: false
  }
}

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    changeDeleteUserForm: (state: SettingForm, action: PayloadAction<DeleteUserForm['confirmPassword']>) => {
      state.deleteUserForm.confirmPassword = action.payload
    },
    showDeleteUserForm: (state: SettingForm, action: PayloadAction<DeleteUserForm['deleteFlag']>) => {
      state.deleteUserForm.deleteFlag = action.payload
    },
  }
})

export const settingThunk = {
  deleteUser
}

export default settingSlice
