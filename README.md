# Zadanie 1 - FibCalc - PFwChO
Maciej Wicha, IMST I2S 1.5 (piątek 14.15)
Sprawozdanie z zadania obowiązkowego znajduje się na kursie Moodle.

# Punkt (1)
Program bazuje na aplikacji uruchamianej w ramach zajęć laboratoryjnym. 
W komponencie `App` dodano podstawowe informacje takie jak:
- Nazwa programu (**Aplikacja FibCalc**)
- Imię i nazwisko autora (**Maciej Wicha**)
- numer grupy dziekańskiej (**IMST I2S 1.5 (piątek 14.15)**)

Wyrazy ciągu Fibbonaciego obliczane są metodą interacyjną przy użyciu następującej funkcji:
```
const calc_fibonacci = n => {
    let a1 = 0, a2 = 1, an = n
    for(let i = 2; i <= n; i++) {
        an = a1 + a2;
        a1 = a2;
        a2 = an;
    }
    setResult(an)
}
```
Przy użyciu stanu w React, pobierana jest wartość z pola liczbowego
`<input type="number" defaultValue="0" min="0" max="0" step="1" id="n" onChange={event => setN(event.target.value)}></input>`
a zwracany wynik umieszczany jest w drugim polu zablokowanym do edycji
`<input type="number" disabled id="result" value={result}></input>`
obliczenia wywoływane są po naciśnięciu przycisku 
`<button onClick={() => calc_fibonacci(n)}> = </button>`

Polecenia wykorzystane do tworzenia repozytorium na  GitHubie:
1. Inicjalizacja repozytorium
    `git init -b main`

2. Dodanie wszystkich plików z bierzącej lokalizacji do repozytorium
    `git add .`

3. Dodanie informacji o commicie
    `git commit -M "Fibbonacci calc simple web app"`

4. Sprawdzenie statusu połączenia
    `gh auth status`

5. Wsyłanie plików do repozytorium zdalnego
    `gh repo create FibCalc --public --source . --remote=FibCalc --push`

# Punkt (2)
Polecenie wykorzystane do zbudowania obrazu lokalnie:
`docker build -t fibcalc:test .`

Uruchomienie kontenera zbudowanego w oparciu o utworzony obraz:
`docker run -it --rm -p 3000:3000 fibcalc:test`

Działająca aplikacja:


# Punkt (3)


# Punkt (4)