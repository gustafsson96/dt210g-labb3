# Laboration 3, DT210G

Lösningen för denna laboration består av en blogg-applikation som har skapats med React, Vite och TypeScript. En användare kan via de publika vyerna läsa ut bloggposter via ett API skapat särkskilt för denna laboration och visa en enskild bloggpost. Det finns även ett formulär för att logga in. En inloggad användare (admin) autentiseras med JSON Web token och kan utföra handlingar med full CRUD-funktionalitet via skyddade routes. Routing har implementerats med React Router. 

## Funktionalitet
Applikationen består av både publika och skyddade vyer. Om en användare försöker nå en skyddad vy utan att vara autentiserad omdirigeras den till inloggningsformuläret.Lyckad inloggning returnerar en JWT som lagras i localStorage och används för att autentisera skyddade anrop. 

### Publik funktionalitet
* Visa bloggposter hämtade från APIet i en lista med en del av innehållet.
* Visa en enskild bloggpost med allt innehåll presenterat. 
* Navigering mellan bloggsida och inloggninsformulär via en huvudmeny. 
* Inloggningsformulär för en administratör. 

### Skyddad funktionalitet
* Läsa ut alla bloggposter i en lista med knappar för att uppdatera och radera. 
* Skapa en ny bloggpost. 
* Uppdatera en befintlig bloggpost. 
* Radera en bloggpost. 
* Logga ut via en knapp i huvudmenyn (visas enbart när användaren är inloggad).

## Använda tekniker
* **React** - För att skapa användargränssnitt med komponentbaserad struktur. 
* **Vite** - Utvecklingsserver. 
* **TypeScript** - Programmeringsspråk för statisk typning. 
* **React Router** - För routing mellan publika och skyddade vyer. 
* **JSON Web Token (JWT)** - För autentisering av admin vid inloggning. 
* **CSS** - För både komponentspecifik och global styling. 
* **REST API** - Ett särskilt backend API har skapats för att hämta och hantera bloggposter med full CRUD-funktionalitet. Det innehåller även autentiserings-routes. 

## Skapade sidkomponenter
* HomePage - Läser ut lista med inlägg från en separat PostList-komponent. 
* PostPage - Visar en enskild post. 
* LoginPage - Inloggningsformulär. 
* AdminPage - Administratörsvy (skyddad). 
* AdminCreatePost - Formulär för att skapa en ny post (skyddad). 
* AdminEditPost - Förifyllt formulär för att uppdatera en befintlig post (skyddad). 

## Övriga komponenter
* Navbar - Huvudmeny. 
* Footer - Sidfot. 
* PostItem - Struktur för en enskild post i listan. 
* PostList - Listan med alla poster för den publika vyn. 


