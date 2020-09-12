import React from 'react'
import UserSetting from 'views/Setting/DeleteUser'
import ChangePassword from 'views/Setting/ChangePassword'
import ChangeEmail from 'views/Setting/ChangeEmail'

const Setting: React.FC = () => {
  return (
    <div>
      <h1>Setting</h1>
      <UserSetting/>
      <ChangeEmail/>
      <ChangePassword/>
    </div>
  )
}

export default Setting
