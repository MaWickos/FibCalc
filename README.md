# Zadanie 1 - FibCalc - PFwChO
Maciej Wicha, IMST I2S 1.5 (piątek 14.15) \
Link do repozytorium na GitHub: `https://github.com/MaWickos/FibCalc`

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
`onChange={event => setN(event.target.value)}` \
a zwracany wynik umieszczany jest w drugim polu `input` zablokowanym do edycji \
`value={result}` \
obliczenia wywoływane są po naciśnięciu przycisku \
`<button onClick={() => calc_fibonacci(n)}> = </button>`

Polecenia wykorzystane do tworzenia repozytorium na  GitHubie:
1. Inicjalizacja repozytorium `git init -b main`

2. Dodanie wszystkich plików z bierzącej lokalizacji do repozytorium `git add .`

3. Dodanie informacji o commicie  `git commit -M "Fibbonacci calc simple web app"` \
![Inicjalizacja, dodanie plików i commit](https://github.com/MaWickos/FibCalc/blob/main/images/zad1_1_1.png)

4. Sprawdzenie statusu połączenia `gh auth status` \
![Sprawdzenie statusu połączenia](https://github.com/MaWickos/FibCalc/blob/main/images/zad1_1_2.png)

5. Utworzenie repozytorium  `gh repo create FibCalc --public --source . --remote=FibCalc --push`
![Utworzenie repozytorium](https://github.com/MaWickos/FibCalc/blob/main/images/zad1_1_3.png)

# Punkt (2)
Polecenie wykorzystane do zbudowania obrazu lokalnie: 
`docker build -t fibcalc:test .` \
![Zbudowanie obrazu](https://github.com/MaWickos/FibCalc/blob/main/images/zad1_2_1.png)

Uruchomienie kontenera zbudowanego w oparciu o utworzony obraz: 
`docker run -it --rm -p 3000:3000 fibcalc:test` \
![Utworzenie kontenera](https://github.com/MaWickos/FibCalc/blob/main/images/zad1_2_2.png)

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

Wersjonowanie (semver) wymagały wykorzystania `metadata-action`do którego jako parametr wejściowy podano obraz utworzony w `ghcr.io`. Zdefiniowano również odpowiednio tagi tak aby wykorzystać semantic versioning.
```
  - name: Docker meta
    id: meta
    uses: docker/metadata-action@v4
    with:
      images: |
        ghcr.io/MaWickos/FibCalc
      tags: |
        type=ref,event=branch
        type=ref,event=pr
        type=semver,pattern={{version}}
        type=semver,pattern={{major}}.{{minor}}
```

Nastepnie zgodnie z instrukcją i przykładowym kodem zamieszczonym w opisie powyższego `action` dodano tagi i etykietę do obrazu.
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
Listę dostępnych `workflow` w ramach GitHub Actions można wyświetlić poleceniem `gh workflow list` \
![Dostępne workflow](https://github.com/MaWickos/FibCalc/blob/main/images/zad1_4_1.png)

Uruchomienie danego `workflow` wykono następującym poleceniem: `gh workflow run 44216443` \
![Uruchomienie workflow](https://github.com/MaWickos/FibCalc/blob/main/images/zad1_4_2.png)

Aby wyświetlić aktualnie uruchomione `workflow` użyłem polecenia: `gh run list` \
![Aktualnie uruchomione workflow](https://github.com/MaWickos/FibCalc/blob/main/images/zad1_4_3.png)

Aby na bieżąco podglądać status wykonywanej operacji za drugim razem wykorzystałem polecenie: `gh run workflow 44216443` \
![Operacja w tle](https://github.com/MaWickos/FibCalc/blob/main/images/zad1_4_4.png)

W serwisie DockerHub utworzony został obraz przechowujący `cache` powstały przy budowaniu obrazu.
![Cache na DockerHub](https://github.com/MaWickos/FibCalc/blob/main/images/zad1_3_1.png)
![Cache na DockerHub](https://github.com/MaWickos/FibCalc/blob/main/images/zad1_3_2.png)

W trakcie procesu tworzenia obrazów widać również w logach moment exportowania cache na wskazane repozytorium na DockerHubie.
![Export cache - dockerhub](https://github.com/MaWickos/FibCalc/blob/main/images/zad1_3_3.png)

# Linki
- Repozytorium DockerHub (docker.io): `docker.io/mawickos/fibcalc:obowiazkowe-cache`
- Repozytorium GitHub (ghcr.io): `ghcr.io/MaWickos/FibCalc`
