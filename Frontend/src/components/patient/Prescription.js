// import React, { useEffect,useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import {
//   Button,
//   Typography,
//   Paper,
//   IconButton,
//   Box,
//   Grid,
// } from "@mui/material";
// import {viewPrescription} from "../../features/patientSlice"
// import { Link } from "react-router-dom";

// const App = () => {
// const [prescId,setprescId]=useState(0);

//   const dispatch = useDispatch();



//   // useEffect(() => {
//   //   dispatch(viewPrescription(prescriptionId));
//   // }, [dispatch]);

//   // const row = useSelector((state) => {
//   //   // Find the row with the specified prescriptionId
//   //   const desiredPrescriptionId = prescriptionId; // Replace with the desired prescription ID
//   //   console.log( state.patient.presc.find((row) => row._id === desiredPrescriptionId))
//   // });
//   const Info = {
//     margin: "20px 20px",
//     alignItems: "baseline",
//   };
//   const Infox = {
//     margin: "10px 20px",
//   };
//   const subInfo = {
//     margin: "0px 103px",
//   };


//   return (
//     <>
//       <Paper
//         sx={{
//           width: "60%",
//           marginTop: "40px",
//           marginLeft: "20%",
//           boxShadow: "5px 5px 5px 5px #8585854a",
//         }}
//       >
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={4}>
//             <Box style={Info}>
//               <Typography sx={{ fontSize: "16px" }}>
                
//                 <strong>Patient Name : </strong>{row.patientID.name}
//               </Typography>
//               <Typography sx={{ fontSize: "16px" }}>
                
//                 <strong>|DBirth : </strong>{row.patientID.dBirth}
//               </Typography>
//               <Typography sx={{ fontSize: "16px" }}>
                
//                 <strong>Gender : </strong>{row.patientID.gender}
//               </Typography>
//               <Typography sx={{ fontSize: "16px" }}>
                
//                 <strong>Date : </strong>{row.datePrescribed}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <img
//               src="/virtualclinic.png"
//               alt="virtualclinic"
//               width={"200px"}
//               sx={{ marginBottom: "50px" }}
//             />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <Box sx={{ margin: "20px 20px 0px 80px" }}>
//               <Typography sx={{ fontSize: "16px" }}>{row.doctorID.name}</Typography>
//               <Typography sx={{ fontSize: "16px" }}> {row.doctorID.speciality}</Typography>
//             </Box>
//           </Grid>
//         </Grid>

        
      
//         <Paper
//           sx={{
//             width: "100px",
//             marginTop: "40px",
//             marginLeft: "40%",
//             boxShadow: "none",
//             display: "flex",
//           }}
//         >
//           {true ? (
//             <img
//               src="/Pharmacy Stamp.png"
//               alt="hospital stamp"
//               width={"100px"}
//             />
//           ) : (
//             ""
//           )}
//           <Link to={"/Home"}>
//             <Button
//               sx={{
//                 margin: "10px 0px 0px 50px",
//                 justifyItems: "center",
//                 color: "black",
//                 border: "black",
//                 left: "-350%",
//               }}
//             >
//               <IconButton sx={{ paddingLeft: "0px" }}>
//                 <ArrowBackIosIcon />
//               </IconButton>
//               Back
//             </Button>
//           </Link>
//         </Paper>
//       </Paper>
//     </>
//   );
// };

// export default App;
