import React from 'react'
import {useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { API_URL } from "../../Consts.js";
const Success = () => {
    const navigate=useNavigate()
    const {id,h_id}=useParams()
    useEffect(() => {
      
        const mySuccessMethod = async() => {
          
            try{
         
                const response=await axios.patch(`${API_URL}/patient/CCSubscriptionPayment/${id}/${h_id}`)
             
        
              }catch(error)
              {
                console.error('Error:', error);
              } 
            console.log('Success! Payment completed');
            
        };

        
        mySuccessMethod();
        navigate('/Home');
    }, []); 
    
  return (
    <div>Success</div>
  )
}

export default Success