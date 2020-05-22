import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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

const settingFormSlice = createSlice({
  name: 'settingForm',
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

export default settingFormSlice
