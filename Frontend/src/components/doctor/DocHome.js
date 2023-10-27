import React from 'react'
import { useDispatch, useSelector } from "react-redux";

export default function DocHome() {
console.log('im hiiim ')
const user = useSelector(state => state.user);

  return (
    <div>DocHome
    {  console.log(user)}
    </div>
  )
}
