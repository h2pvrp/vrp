# Application for presenting VRP solutions

> ### Goal
> - Creating an application for visualizing a Vehicle Routing Problem solutions
>
> ### Requirements
> - Wrapping existing algorithms in a form of a web service
> - GUI for entering the data
> - Taking into account real distances between points

- Statystyki z przebiegów
- mechanizm logowania sie userów
- historie operacji userów
- konto admina, ktory raportuje skąd logują się userzy
- dynamicznie wczytywane na frontend postępy (niekonieczanie wszystkie rzeczy) (np. websockety)
- workery komunikują się po HTTP (API restowe albo podobne)
- na backendzie coś co ma statyczne typy
- może typescript na frontendzie

## Wymagania na 16.12.19

- Dokładne wymagania funkcjonalne
- Zgrubny projekt techniczny
- Wstępna implementacja (więcej niż prosty kontroler CRUDowy)

## Linki

- [Slajdy](http://www.mini.pw.edu.pl/~okulewiczm/downloads/html/HTML_6_Projects.pdf)
- https://coral.ise.lehigh.edu/larry/software/vrp-solver/
- https://developers.google.com/optimization

## Stack

- Backend: C# ASP.NET Core 3.1
- SPA Frontend: React, Redux, Redux Saga (zmienić z redux-thunk)

# Opis systemu

Aplikacja pozwala użytkownikom porównywać wyniki rozwiązania problemu VRP (Vehicle Routing Problem), pochodzące z różnych źródeł. Użytkownik za pomocą interfejsu użytkownika tworzy instancje problemu wprowadzając potrzebne dane, dane te są przesyłane do backendu za pomocą mechanizmu WebSocket. Na backendzie problem jest zapisywany w bazie danych i rozsyłany za pomocą protokołu HTTP do poszczególych workerów, które odsyłają rozwiązanie. Rozwiązanie jest zapisywane w bazie danych a następnie odysłane i wyświetlane użytkownikowi.  

# Wymagania funkcjonalne

### 1. Użytkownik chce dodać nowy punkt na mapie

Aby dodać nowy punkt na mapie, użytkownik najpierw klika przycisk dodawania punktów (niebieskie kółko z plusikiem), zmieniając jego stan na „włączony”. Gdy przycisk ten jest aktywny, każde kliknięcie na mapie spowoduje dodanie nowego punktu, będącego częścią wyznaczanych tras

### 2. Użytkownik chce wybrać jeden z dodanych punktów

Użytkownik może wybrać jeden z dodanych punktów na dwa sposoby. Pierwszym z nich jest kliknięcie na znacznik punktu na mapie, gdy przycisk dodawania nowych punktów jest w stanie „wyłączonym”. Drugim sposobem jest kliknięcie na selektor punktu w liście wszystkich punktów.Wybranie punktu powoduje zmianę koloru znacznika danego punktu na mapie, podświetlenie opisu punktu na liście wszystkich punktów oraz aktywowanie formularza edycji punktu.

### 3. Użytkownik chce edytować punkt na mapie

Gdy użytkownik wybierze jeden z punktów (prze mapę lub listę punktów), odblokowuje się przed nim możliwość edycji danych tego punktu przez formularz edycji. Zmiany wprowadzone w parametrach punktu użytkownik musi potwierdzić kliknięciem przycisku „edycji”. Użytkownik ma też możliwość usunięcia danego punktu przez kliknięcie przycisku „usunięcia”

### 4.Użytkownik uruchamia wyznaczenie tras

Aby wyznaczyć trasy przejazdów, użytkownik musi wprowadzić co najmniej jeden punkt przesyłki oraz bazę dostaw. Gdy warunki te są spełnione, przycisk wyznaczania trasy zostaje aktywowany i użytkownik może go kliknąć. Kliknięcie tego guzika odblokuje sekcjępodsumowania, gdzie użytkownik będzie mógł przejrzeć porównanie różnych algorytmów wyznaczania tras dla danego zbioru punktów.

### 5.Użytkownik chce wybrać, które sposoby routowania pokazać na mapie

Użytkownik ma możliwość, by zaznaczyć w tabeli podsumowania, które trasy (trasy z których algorytmów), mają być wyświetlone na mapie. By to zrobić, musi kliknąć w pole wyboru w odpowiedniej kolumnie (ostatnia kolumna tabeli „wyświetlanie”). Jeśli pole jest zaznaczone, trasa zostanie przedstawiona na mapie, jeśli nie, trasa z danego algorytmu wyświetlona nie będzie.

### 6.Użytkownik chce się zalogować

Aby użytkownik mógł się zalogować, musi się najpierw zarejestrować na witrynie. Jeśli jest zarejestrowany, to by się zalogować, wystarczy, by przeszedł do strony logowania i podał tam swój login oraz hasło.

### 7. Użytkownik chce się zarejestrować

W celu rejestracji, użytkownik musi przejść do strony rejestracji.
Wypełnia tam krótki formularz (adres mailowy, nazwa użytkownika, hasło, potwierdzenie hasła, lokalizacja)
oraz klika przycisk „zarejestruj”.

### 8. Użytkownik chce przejrzeć historię wyszukiwać tras

Aby użytkownik mógł przejrzeć historię swoich wyszukiwać musi się wpierw zalogować.
Zalogowany użytkownik ma możliwość przejścia do zakładki „historia”, gdzie znajdują się wypisane
wcześniejsze wyszukiwania (zawierają datę i krótkie podsumowanie, jak liczba punktów na mapie,
lokalizacja bazy).

### 9. Użytkownik chce przywrócić poprzednie wyszukiwanie

Zalogowany użytkownik mamożliwość przywrócenia wcześniejszego wyszukiwania. Gdy znajduje się w
zakładce „historia”, może kliknąć przycisk „Przywróć” we wskazanym wpisie z historii. Spowoduje to
przeniesienie do strony głównej i wypełnienie mapy trasowania danymi ze wskazanego zapytania.

### 10. Administrator chce zobaczyć podsumowanie użytkowników

W celu obejrzenia podsumowania użytkowników korzystających z portalu, administrator musi się wpierw
zalogować, by zweryfikować jego uprawnienia. Po wykonaniu tej czynności, administrator może przejść
na stronę panelu administratora, w której ma możliwość przejrzeć dane lokalizacji użyć witryny. Dane
te przedstawione są zarówno w formie tabelarycznej, jak i zaznaczone są na mapie. W zależności od
stopnia przybliżenia mapy, dane logować przeliczane są dla różnej ziarnistości. Dla przykładu, gdy
przybliżenie mapy wskazuje całą mapę, widać liczbę logować z różnych kontynentów.

## Wymagania techniczne

### Składowanie danych

Dane użytkowników są zapisywane w bazie danych (Najlepiej Postgres).

### Workery

Dla każdej implementacji rozwiązania problemu VRP jest oddzielny worker, który czeka na request ze
strony serwera, a następnie rozwiązuje problem na podstawie otrzymanych danych. Backend czeka na
odpowiedzi od workerów i asynchronicznie wysyła do klienta rozwiązania za pomocą WebSocket.

### Serwer

API przyjmujące dane od klientów i komunikujące się z workerami za pomocą protokołu HTTP i
uaktualniające dane użytkowników w bazie. Zbierane są dane o lokalizacji użytkowników.

# Architektura

![arch.png](./arch.png)

## Backend

Aplikacja webowa ASP.NET Core 3.1 komunikująca się z aplikacją frontendową za pomocą mechanizmu WebSocket. Aplikacja wysyła żądania rozwiązania problemu do poszczególych workerów za pomocą protokołu HTTP, przy pomocy klasy "WorkerService". Aplikacja łączy się z bazą danych Postgres przy pomocy framework'a Entity Framework. Kontekst danych znajduje się w klasie "WebApiContext".

## Baza danych

Dane są składowane w bazie danych Postgres z rozszerzeniem Postgis umożliwiającym zapisywanie danych geograficznych. Baza danych składa się z następujących tabel:

* Cases - zawierającą problemy VRP wprowadzone przez użytkowników
* Results - zawierającej wyniki określonych problemów
* Workers - zawierającej znane instancje workerów rozwiązujących problem VPR

# Instrukcja użytkownika

Użytkownik może zalogować się do aplikacji za pomocą zakładki "Login". Zalogowany użytkownik może wyświetlać historię wprowadzonych przez siebie problemów i ich rozwiązań.

Aby stworzyć instancję problemu należy nanieść na mapie punkty będące przystankami w problemie VRP. Punkty dodawane są poprzez kliknięcie na mapę, dodane punkty wyświetlane są na mapie w postaci znaczników w kolorze niebieskim i w postaci listy po prawej stronie panelu użytkownika. Z poziomu listy możliwa jest edycja lub usunięcie wybranego punktu.

Za pomocą przycisku "Select depo" użytkownik może wybrać bazę w problemie VRP. Po kliknięciu na mapę baza wyświetlana jest w postaci białego znacznika.

Wysłanie kompletnego problemu realizowane jest przez wciśnięcie przycisku "Send".

Rozwiązania problemu wyświetlane są poniżej mapy.


# Wnioski

Implementacja workerów w języku python ułatwiła nam pracę ze względu na to, że nie jest to język silnie typowany. Programowanie współbierzne przysporzyło nam dużo problemów.
