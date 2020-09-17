import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { deleteUser } from 'state/setting/deleteUser'
import { changeEmail, verifyNewEmail } from 'state/setting/changeEmail'
import { changePassword } from 'state/setting/changePassword'
import { image } from 'state/setting/image'


type DeleteUserForm = {
  confirmPassword: string
  deleteFlag: boolean
}

type ChangeEmailForm = {
  password: string
  newEmail: string
  verificationCode: string
  isNewEmailForm: boolean
}

type ChangePasswordForm = {
  currentPassword: string
  newPassword: string
  newPasswordConfirm: string
}

type SettingForm = {
  deleteUserForm: DeleteUserForm
  changeEmailForm: ChangeEmailForm
  changePasswordForm: ChangePasswordForm
}

const initialState: SettingForm = {
  deleteUserForm: {
    confirmPassword: '',
    deleteFlag: false
  },
  changeEmailForm: {
    password: '',
    newEmail: '',
    verificationCode: '',
    isNewEmailForm: true
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
    reset: (state: SettingForm) => {
      state.deleteUserForm = initialState.deleteUserForm
      state.changeEmailForm = initialState.changeEmailForm
      state.changePasswordForm = initialState.changePasswordForm
    },
    changeDeleteUserForm: (state: SettingForm, action: PayloadAction<DeleteUserForm['confirmPassword']>) => {
      state.deleteUserForm.confirmPassword = action.payload
    },
    showDeleteUserForm: (state: SettingForm, action: PayloadAction<DeleteUserForm['deleteFlag']>) => {
      state.deleteUserForm.deleteFlag = action.payload
    },
    changeChangeEmailForm: (state: SettingForm, action: PayloadAction<Omit<ChangeEmailForm, "isNewEmailForm">>) => {
      state.changeEmailForm = {
        ...action.payload,
        isNewEmailForm: state.changeEmailForm.isNewEmailForm
      }
    },
    changeViewOfChangeEmailForm: (state: SettingForm, action: PayloadAction<ChangeEmailForm['isNewEmailForm']>) => {
      state.changeEmailForm.isNewEmailForm = action.payload
    },
    changeChangePasswordForm: (state: SettingForm, action: PayloadAction<ChangePasswordForm>) => {
      state.changePasswordForm = action.payload
    },
  }
})

export const settingThunk = {
  deleteUser,
  changeEmail, verifyNewEmail,
  changePassword,
  image
}

export default settingSlice
