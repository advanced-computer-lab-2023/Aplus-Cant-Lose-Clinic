import PatientsList from './patientsListComponents/patientsList'
import View from './viewComponents/View.jsx'
import {Routes,Route} from 'react-router-dom';


function App() {

  return (
    <div>
     <Routes>
      <Route path='/' element={<PatientsList />} />
      <Route path='/patientsList' element={<PatientsList />} />
      <Route path='/patientsList/view' element={<View />}/>
     </Routes>
    </div>
  );
}

export default App;
