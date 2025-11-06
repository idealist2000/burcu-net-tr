import React from 'react';
import Header from './components/Header'; // Header bileşenini içe aktarma
import FortuneTeller from './components/FortuneTeller'; // FortuneTeller bileşenini içe aktarma
import './App.css'; // CSS dosyasını içe aktarma

function App() {
  return (
    <div className="App">
      <Header /> {/* Header bileşenini kullanma */}
      <main>
        <FortuneTeller /> {/* Fortune Teller bileşenini kullanma */}
      </main>
    </div>
  );
}

export default App;
