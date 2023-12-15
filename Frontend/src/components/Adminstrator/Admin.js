import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Hpackages from "./Hpackages";
import ViewAdmins from "./ViewAdmins";
import ViewDoctors from "./ViewDoctors";
import ViewMedicines from "./ViewMedicines";
import ViewPatients from "./ViewPatients";
import ViewPendingDr from "./ViewPendingDr";
import AddAdmin from "./AddAdmin";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, display: "flex" }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Administrator" {...a11yProps(0)} sx={{ width: "220px",fontSize: "18px" }}/>
          <Tab
            label="Doctors Join Requests"
            {...a11yProps(1)}
            sx={{ width: "220px",fontSize: "18px"}}
          />
          <Tab
            label="Joined Doctors"
            {...a11yProps(2)}
            sx={{ width: "220px" ,fontSize: "18px"}}
          />
          <Tab
            label="Patients List"
            {...a11yProps(3)}
            sx={{ width: "220px",fontSize: "18px" }}
          />
          <Tab
            label="Health Packages"
            {...a11yProps(4)}
            sx={{ width: "220px" ,fontSize: "18px"}}
          />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <div style={{display:"flex",gap:"400px"}}>
<>
          <ViewAdmins /></>
          <div >
          <AddAdmin/>
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ViewPendingDr />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ViewDoctors />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <ViewPatients />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <Hpackages />
      </CustomTabPanel>
    </Box>
  );
}
