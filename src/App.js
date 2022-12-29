import { useState } from 'react';
import './App.css';

let calc_fibonacci = n => {
  let a1 = 0, a2 = 1, an = n
  for(let i = 2; i <= n; i++) {
    an = a1 + a2;
    a1 = a2;
    a2 = an;
  }

  setResult(an)
  console.log(an)
}

function App() {

  // Użycie state do przechowywania numeru wyrazu i jego wartości i późniejszego odświeżenia
  const [result, setResult] = useState()
  const [n, setN] = useState()

  setResult(0);

  return (
    <div>
      <header>
        <p>
          Aplikacja FibCalc <br/>
          Maciej Wicha
          IMST I2S 1.5 - piątek 14.15
        </p>
      </header>
      <main>
        <p>
          Który wyraz ciągu Fibonacciego chcesz obliczyć?
        </p>
        <input type="number" defaultValue="0" min="0" max="0" step="1" id="n" onChange={event => setN(event.target.value)}></input>
        <button onClick={calc_fibonacci(n)}> = </button>
        <input type="number" disabled id="result" value={result}></input>
      </main>
    </div>
  );
}

export default App;
