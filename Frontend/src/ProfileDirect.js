import React from 'react'
import { useSelector } from 'react-redux'
import DocProfile from './components/doctor/DoctorProfileDialog';
import {useNavigate} from 'react-router-dom';
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
export default function ProfileDirect() {
  const navigate=useNavigate();
    const { role } = useSelector((state) => state.user);

  return (
    <div>
        {role === "doctor"?  <DocProfile/>:(
    <>
      <Link to="/Login" sx={{ left: "100%" }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            display: { xs: "none", sm: "flex" },
            fontSize: "20px",
            maragin: "auto",
          }}
        >
          Login
        </Typography>
      </Link>
    </>

  )}</div>
  )
}
