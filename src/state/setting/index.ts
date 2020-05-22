import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { deleteUser } from 'state/setting/deleteUser'


type DeleteUserForm = {
  confirmPassword: string
  deleteFlag: boolean
}

type ChangePasswordForm = {
  currentPassword: string
  newPassword: string
  newPasswordConfirm: string
}

type SettingForm = {
  deleteUserForm: DeleteUserForm
  changePasswordForm: ChangePasswordForm
}

const initialState: SettingForm = {
  deleteUserForm: {
    confirmPassword: '',
    deleteFlag: false
  },
  changePasswordForm: {
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: ''
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
    changeChangePasswordForm: (state: SettingForm, action: PayloadAction<ChangePasswordForm>) => {
      state.changePasswordForm = action.payload
    },
  }
})

export const settingThunk = {
  deleteUser
}

export default settingSlice
