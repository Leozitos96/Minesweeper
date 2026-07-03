import './App.css';

function App() {
  return (
    <div className='layout-site'>
      <header className='App-header'>
        <div id='container' className='container'>
          <b1 id='title' className='title'>Minesweeper</b1>
          <div id='container-right' className='container-right'>
            <button id='guide'>Guide</button>
          </div>
        </div>
      </header>


      <footer className="App-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h3>Minesweeper App</h3>
            <p>A classic minesweeper game.</p>
          </div>
          <div className="footer-links">
            <h4>Connect With Me</h4>
            <div className="social-row">
              <a href="https://github.com/Leozitos96" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} minesweeperapp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
