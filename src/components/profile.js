import React from "react"
import { getUser } from "../services/auth"

console.log(getUser())
const Profile = () => (
  <div>
    <h2>Profile</h2>
    <ul>
      <li>Name: {getUser().user.firstname} {getUser().user.lastname}</li>
      <li>Email: {getUser().user.email}</li>
      <li>Orgnaization: {getUser().user.organization}</li>
      <li>Department: {getUser().user.department}</li>
      <li>Designation: {getUser().user.designation}</li>
      <li>Phone: {getUser().user.phone}</li>
    </ul>
  </div>
)
export default Profile
