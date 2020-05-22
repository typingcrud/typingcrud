import React from 'react'
import { DeleteUser } from 'views/UserSetting/DeleteUser'

const UserSetting: React.FC = () => {
  return (
    <React.Fragment>
      <h2>User</h2>
      <DeleteUser/>
    </React.Fragment>
  )
}

export default UserSetting
