

import MyTable from './components/Table';

function App() {
  const userId = 123;
  return (
    <div className="App">
      <MyTable userId={userId}/>
    </div>
  );
}

export default App;
