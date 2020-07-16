import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Search from "./components/Search";
import './App.css';

function App() {

  const [call, setCall] = useState({})

  useEffect(() => {
    axios.get("https://api.github.com/search/repositories?q=calculator&page=1&per_page=10")
      .then(response => {
        setCall(response.data)
      })
  },[])

  return (
    <div className="App">
      <Search/>
    </div>
  );
}

export default App;
