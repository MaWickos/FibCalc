import { useState } from 'react';
import './App.css';

function App() {

  // Użycie state do przechowywania numeru wyrazu i jego wartości i późniejszego odświeżenia
  const [result, setResult] = useState(0)
  const [n, setN] = useState()

  const calc_fibonacci = n => {
    let a1 = 0, a2 = 1, an = n
    for(let i = 2; i <= n; i++) {
      an = a1 + a2;
      a1 = a2;
      a2 = an;
    }
  
    setResult(an)
    console.log(an)
  }

  return (
    <div>
      <header>
        <p>
          <h1>Aplikacja FibCalc</h1>
          Maciej Wicha <br/>
          IMST I2S 1.5 (piątek 14.15)
        </p>
      </header>
      <hr/>
      <main>
        Który wyraz ciągu Fibonacciego chcesz obliczyć? <br/>
        an(<input type="number" defaultValue="0" min="0" max="0" step="1" id="n" onChange={event => setN(event.target.value)}></input>)
        <button onClick={() => calc_fibonacci(n)}> = </button>
        <input type="number" disabled id="result" value={result}></input>
      </main>
    </div>
  );
}



export default App;
