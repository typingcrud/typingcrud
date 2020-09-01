import React from 'react'
import UserSetting from 'views/UserSetting'
import ChangePassword from 'views/ChangePassword'
import ChangeEmail from 'views/ChangeEmail'

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
