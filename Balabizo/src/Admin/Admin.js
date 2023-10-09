import React, { useState } from 'react';
import './Admin.css';
import Sidebar from './Components/Sidebar'
import AddAdmin from './Components/AddAdmin';
import PackageList from './Components/PackageList';
import AddPackageForm from './Components/AddPackageForm';
import PharmacistList from './Components/PharmacistList';
import PatientList from './Components/PatientList'
import InfoCard from './Components/InfoCard'


function Admin() {
  const [activeItem, setActiveItem] = useState(null);

  const selectItem = (activeItem)=>{
    setActiveItem(activeItem);
    console.log(activeItem)

  };


  
  const [packages, setPackages] = useState([]); // Your packages array
  // Other state and functions for managing packages

  const handleAddPackageClick = (activeItem) => {
    console.log("add package!!");
    setActiveItem(activeItem);
    console.log(activeItem);
    
    // Implement the logic to add a new package to the 'packages' state
    // For example: setPackages([...packages, newPackage]);
  };

  const handleView = (activeItem) => {
    setActiveItem(activeItem);
    console.log(activeItem);
    
    // Implement the logic to add a new package to the 'packages' state
    // For example: setPackages([...packages, newPackage]);
  };


  const packageData = [
    {
      id: 1,
      name: 'Silver Package',
      price: 3600,
      doctorDiscount: 40,
      medicineDiscount: 20,
      familyDiscount: 10,
    },
    {
      id: 2,
      name: 'Gold Package',
      price: 6000,
      doctorDiscount: 60,
      medicineDiscount: 30,
      familyDiscount: 15,
    },
    {
      id: 3,
      name: 'Platinum Package',
      price: 9000,
      doctorDiscount: 80,
      medicineDiscount: 40,
      familyDiscount: 20,
    },
    {
      id: 4,
      name: 'Silver Package',
      price: 3600,
      doctorDiscount: 40,
      medicineDiscount: 20,
      familyDiscount: 10,
    },
    {
      id: 5,
      name: 'Silver Package',
      price: 3600,
      doctorDiscount: 40,
      medicineDiscount: 20,
      familyDiscount: 10,
    },
    {
      id: 6,
      name: 'Silver Package',
      price: 3600,
      doctorDiscount: 40,
      medicineDiscount: 20,
      familyDiscount: 10,
    },
    {
      id: 7,
      name: 'Silver Package',
      price: 3600,
      doctorDiscount: 40,
      medicineDiscount: 20,
      familyDiscount: 10,
    },
    {
      id: 8,
      name: 'Silver Package',
      price: 3600,
      doctorDiscount: 40,
      medicineDiscount: 20,
      familyDiscount: 10,
    },
    {
      id: 9,
      name: 'Silver Package',
      price: 3600,
      doctorDiscount: 40,
      medicineDiscount: 20,
      familyDiscount: 10,
    },
    {
      id: 10,
      name: 'Silver Package',
      price: 3600,
      doctorDiscount: 40,
      medicineDiscount: 20,
      familyDiscount: 10,
    },
    {
      id: 11,
      name: 'Silver Package',
      price: 3600,
      doctorDiscount: 40,
      medicineDiscount: 20,
      familyDiscount: 10,
    },
    {
      id: 12,
      name: 'Silver Package',
      price: 3600,
      doctorDiscount: 40,
      medicineDiscount: 20,
      familyDiscount: 10,
    },
    {
      id: 13,
      name: 'Silver Package',
      price: 3600,
      doctorDiscount: 40,
      medicineDiscount: 20,
      familyDiscount: 10,
    },
    {
      id: 14,
      name: 'Silver Package',
      price: 3600,
      doctorDiscount: 40,
      medicineDiscount: 20,
      familyDiscount: 10,
    },
    {
      id: 15,
      name: 'Silver Package',
      price: 3600,
      doctorDiscount: 40,
      medicineDiscount: 20,
      familyDiscount: 10,
    },

    // Add more package data here...
  ];
  

  const Usernames = [
    {username: "JohnDoe"},
    {username: "JohnDoe"},
    {username: "JohnDoe"},
    {username: "JohnDoe"},
    {username: "JohnDoe"},
    {username: "JohnDoe"},
    {username: "JohnDoe"},
    {username: "JohnDoe"},
    {username: "JohnDoe"},
    // Add more usernames here as needed
  ];


 


   // Define content components for each sidebar item
   const contentComponents = {
    ADD_ADMIN: <AddAdmin onSave={()=>{}} onCancel={selectItem}/>,
    VIEW_REMOVE_ADMIN: <div>View/Remove Admin Content</div>,
    VIEW_Pharmacists_Join_Requests: <PharmacistList pharmacists={Usernames} onRemove={()=>{}}  onView={handleView}  onReject={()=>{}} type={'Info_Request'}/>,
    VIEW_REMOVE_Pharmacists: <PharmacistList pharmacists={Usernames} onRemove={()=>{}}   onView={selectItem} type={'Info_View'}/>,
    VIEW_REMOVE_Patients: <PatientList patients={Usernames} onRemove={()=>{}}  onView={selectItem}/>,
    VIEW_All_Medicine: <div>View All Available Medicines Content</div>,
    VIEW_Health_Package: <PackageList packages={packageData} onAddPackageClick={selectItem}/>,
    ADD_PACKAGE:<AddPackageForm onAdd={()=>{}} onCancel={selectItem}/>,
    Info_View:<InfoCard info={['ahmed','20 years','temp','temp',]} type={'notrequest'} />,
    Info_Request:<InfoCard info={['ahmed','20 years','temp','temp',]} type={'request'} />,
    Nothing:<></>,
  };



  return (



    <div className="admin-container">
      <Sidebar setActiveItem={selectItem} />

      <main className="main-content">
         {/* Display the content based on the activeItem */}
         {activeItem && contentComponents[activeItem]}
      </main>
    </div>
  );
}

export default Admin;
