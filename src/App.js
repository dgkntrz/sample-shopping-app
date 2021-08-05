import './App.css';
import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './Main';

function App() {

  return (

    <div className="page-container">
      <header>
        <Header />
      </header>
      <body>
        <Main />
      </body>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}


export default App;
