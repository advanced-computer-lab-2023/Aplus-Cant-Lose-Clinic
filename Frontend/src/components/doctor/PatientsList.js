import ButtonBar from './ButtonBar'
import Table from './Table'
import SearchField from './SearchField'
import Calendar from './Calendar';

function PatientList() {

  return (
    <div className="App" >

      <ButtonBar/>
      <div style={{ display :'flex',placeItems: 'flex-end'}}>
      <SearchField/>
      <Calendar/>
      </div>
      <Table/>

    </div>
  );
}

export default PatientList;
