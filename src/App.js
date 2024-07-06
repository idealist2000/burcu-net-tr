import React from 'react';
import Header from './components/Header'; // Header bileşenini içe aktarma
import './App.css'; // CSS dosyasını içe aktarma

function App() {
  return (
    <div className="App">
      <Header /> {/* Header bileşenini kullanma */}
      <main>
        <h2>Welcome to Burcu Net</h2>
        <p>Your source for the best divination services.</p>
      </main>
    </div>
  );
}

export default App;
