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
Przy użyciu stanu w React, pobierana jest wartość z pola liczbowego \
`onChange={event => setN(event.target.value)}`
a zwracany wynik umieszczany jest w drugim polu `input` zablokowanym do edycji \
`value={result}`
obliczenia wywoływane są po naciśnięciu przycisku \
`<button onClick={() => calc_fibonacci(n)}> = </button>`

Polecenia wykorzystane do tworzenia repozytorium na  GitHubie:
1. Inicjalizacja repozytorium `git init -b main`

2. Dodanie wszystkich plików z bierzącej lokalizacji do repozytorium `git add .`

3. Dodanie informacji o commicie  `git commit -M "Fibbonacci calc simple web app"`

4. Sprawdzenie statusu połączenia `gh auth status`

5. Utworzenie repozytorium  `gh repo create FibCalc --public --source . --remote=FibCalc --push`

# Punkt (2)
Polecenie wykorzystane do zbudowania obrazu lokalnie: \
`docker build -t fibcalc:test .`

Uruchomienie kontenera zbudowanego w oparciu o utworzony obraz: \
`docker run -it --rm -p 3000:3000 fibcalc:test`

# Punkt (3)
Aby wykorzystać repozytorium `ghcr.io` należało zalogować się do GitHub Packages wykorzystując nazwę użytkownika GitHub i token.
```
- name: Login to GitHub Packages
uses: docker/login-action@v2
with:
  registry: ghcr.io
  username: ${{github.repository_owner}}
  password: ${{secrets.GIT_HUB_TOKEN}}
```

Wersjonowanie (semver) wymagały wykorzystania `metadata-action`do którego podano obraz utworzony w `ghcr.io`.
Nastepnie zgodnie z instrukcją i przykładoweym kodem zamieszczonym w opisie powyższego `action` dodano tagi i etykietę do obrazu.
```
  - name: Build and push
    id: docker_build
    uses: docker/build-push-action@v2
    with:
      cache-from: type=registry,src=docker.io/mawickos/fibcalc:obowiazkowe-cache
      cache-to: type=registry,ref=docker.io/mawickos/fibcalc:obowiazkowe-cache
      platforms: linux/amd64, linux/arm64
      context: ./
      file: ./Dockerfile
      push: true
      tags: ${{ steps.meta.outputs.tags }}
      labels: ${{ steps.meta.outputs.labels }}
  ```

# Punkt (4)
Listę dostępnych `workflow` w ramach GitHub Actions można wyświetlić poleceniem \
`gh workflow list`

Uruchomienie danego `workflow` wykono następującym poleceniem: \
`gh workflow run 44216443`

Aby wyświetlić aktualnie uruchomione `workflow` użyłem polecenia: \
`gh run list`

Aby na bieżąco podglądać status wykonywanej operacji za drugim razem wykorzystałem polecenie: \
`gh run workflow 44216443`

W serwisie DockerHub utworzony został obraz przechowujący `cache` powstały przy budowaniu obrazu.

# Linki
- Repozytorium DockerHub (docker.io): `docker.io/mawickos/fibcalc:obowiazkowe-cache`
- Repozytorium GitHub (ghcr.io): `ghcr.io/MaWickos/FibCalc`

