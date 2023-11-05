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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
          <Tab label="Add administrator" {...a11yProps(0)}  sx={{width:"220px"}}/>
          <Tab label="Administrator" {...a11yProps(1)}  sx={{width:"220px"}}/>
          <Tab label=" Doctors Join Requests" {...a11yProps(2)}  sx={{width:"220px"}} />
          <Tab label="Joined Doctors" {...a11yProps(3)}  sx={{width:"220px"}} />
          <Tab label="Patients List" {...a11yProps(4)}  sx={{width:"220px"}} />
          <Tab label="Medicines" {...a11yProps(5)}  sx={{width:"220px"}} />
          <Tab label="Health Packages" {...a11yProps(6)}  sx={{width:"220px"}} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <AddAdmin/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ViewAdmins />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ViewPendingDr />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <ViewDoctors />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <ViewPatients />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <ViewMedicines />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        <Hpackages />
      </CustomTabPanel>
    </Box>
  );
}
