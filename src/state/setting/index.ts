import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { deleteUser } from 'state/setting/deleteUser'
import { changeEmail, verifyNewEmail } from 'state/setting/changeEmail'
import { changePassword } from 'state/setting/changePassword'
import { changeUserInfo } from 'state/setting/changeUserInfo'


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

type ChangeUserInfo = {
  userName: string
  imgType: string
  img64: string
}

type SettingForm = {
  deleteUserForm: DeleteUserForm
  changeEmailForm: ChangeEmailForm
  changePasswordForm: ChangePasswordForm
  changeUserInfo: ChangeUserInfo
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
  },
  changeUserInfo: {
    userName: '',
    imgType: '',
    img64: ''
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
    changeUserInfo: (state: SettingForm, action: PayloadAction<ChangeUserInfo>) => {
      state.changeUserInfo = action.payload
    }
  }
})

export const settingThunk = {
  deleteUser,
  changeEmail, verifyNewEmail,
  changePassword,
  changeUserInfo
}

export default settingSlice
