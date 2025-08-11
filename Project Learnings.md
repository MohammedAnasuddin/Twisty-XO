# Learnings form my Project: Twisty - XO

## Changing the Git Folder

If you already initialized git-repo then new project folder was created then do the following:

```bash
project/
├── .git/            ← You want to move this
├── my-app/          ← Your real project is here
```

Open `project` folder in VS code and run the below commands

```bash
move .git my-app
cd my-app
git status
```

When runnig project creation commands add a ` .`  (space and period) to avoid creating a new folder and getting al files in this folder.

`npm create vite@latest .`  also to skip prompts use: 

`npm create vite@latest . -- --template react`

> Create a Github repo then do the above using the period to solve the problem
> 
> Make sure to cross check folderspath
> 
> ![](C:\Users\ADMIN\AppData\Roaming\marktext\images\2025-08-05-15-24-59-image.png)
> 
> also on runnig vite command it will ask for eplacment of old file s don't do i since those are `.git` folder choose the option 
> 
> `Ignore files and Continue`

## 

## Knowing the Files

## 📁 `src/` (Source Folder)

All your **actual app code** lives here.

| File/Folder | Role                                                 |
| ----------- | ---------------------------------------------------- |
| `App.jsx`   | Main app component – root of your component tree.    |
| `main.jsx`  | Entry point – renders `<App />` into `index.html`.   |
| `index.css` | Global styles – Tailwind layers and resets go here.  |
| `App.css`   | Optional – Component-level styles used in `App.jsx`. |
| `assets/`   | Store static files like images, icons, etc.          |

---

## 📁 Root Files (Outside `src/`)

| File                | Role                                                                  |
| ------------------- | --------------------------------------------------------------------- |
| `.gitignore`        | Tells Git what files/folders **not to track** (e.g., `node_modules`). |
| `eslint.config.js`  | Configuration for **ESLint** – linter for JS/React code quality.      |
| `index.html`        | HTML shell – React injects into the `<div id="root">` here.           |
| `package.json`      | Project config – dependencies, scripts, name, version, etc.           |
| `package-lock.json` | Auto-generated – locks the exact versions of installed packages.      |
| `vite.config.js`    | Vite-specific config – used for aliases, plugins, etc.                |
| `README.md`         | Markdown doc – explain your project for others (or for GitHub).       |

---

## ✅ Most Important Flow

```
index.html
   ↓
main.jsx : JS file linked to root html and renders <App/> via React
   ↓
App.jsx : renders UI, imports App.css (if used)
   ↓
index.css : applies global Tailwind styles
```

---

## Passing Event Handlers while mapping

Create the Event Handlers in Parent and pass it to the child as `prop` then use this prop as respective event handler in the child's top most element (div)

```jsx
parent{
    hadleClickParent(){}

return(
    <Child onClickP={()=>{handleClikcP()}} />
)
} 
```

```jsx
//Child
const {onClickP} = props
return(

    <div onClick={()=>{onClickP()}}>

</div>
)
```

# Changing Array State

If the stat evalue is an `Array` :

> You can't modify the existinf Array element and call setSate it wont update the stae or performs re-render

Rather create a shallow copy and then set state 

```js
const new_array = [...prev_array]
setState(new_array)

//const new_array = prev_array X DOnt do it snce
// both will share the same refference. 
```

## Testing Modules setup

The essential modules are:

- `jest`: The core testing framework that provides the test runner and assertion library.
- `@testing-library/react`: Provides utilities for testing React components in a way that encourages testing user-centric behavior rather than implementation details.
- `@testing-library/jest-dom`: Offers custom Jest matchers for asserting the state of the DOM, such as `toBeInTheDocument` or `toHaveTextContent`.
- `jest-environment-jsdom`: Provides a JSDOM environment for Jest, simulating a browser environment in Node.js, which is crucial for testing React components that interact with the DOM.
- `babel-jest`: Integrates Babel with Jest, allowing Jest to understand and transpile modern JavaScript features and JSX syntax used in React components.
- `@babel/preset-env`: A Babel preset that compiles modern JavaScript features down to a compatible version for the target environment.
- `@babel/preset-react`: A Babel preset that handles JSX transformation for React.
- `identity-obj-proxy`: Used to mock CSS module imports during testing, preventing errors when Jest encounters them.
- `ts-jest` (if using TypeScript): A Jest preprocessor that allows Jest to run tests written in TypeScript.
- `@types/jest` (if using TypeScript): Provides TypeScript type definitions for Jest.

Just run

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom babel-jest @babel/preset-env @babel/preset-react identity-obj-proxy
```

## Working with Context:

Alright, let’s go **slow** and explain the “why” at every step so you *understand* what’s happening — not just copy-paste.  
We’re building a **Game Setup Context** so any component in the app can read and modify shared game data.

---

## **Step 1 — `createContext`**

**Why:**  
`createContext()` creates a special object React can use to pass data **deep** in the component tree without prop drilling.  
It’s like saying:

> “I’m going to create a **channel** named GameContext. Anyone connected to this channel can read/write the data.”

```js
import { createContext } from "react";
export const GameContext = createContext(null);
```

- `null` here is the **default value** if no provider wraps your component.

- We export it so any child can use `useContext(GameContext)` to connect.

---

## **Step 2 — The Provider**

**Why:**  
A `Context` by itself has no data. The **Provider** is the *data source* — it decides **what data** goes into the channel.  
We make our own `GameProvider` so:

1. We can put all game setup logic in one place.

2. We don’t clutter `main.jsx` with state and update functions.

```js
export function GameProvider({ children }) {
  return (
    <GameContext.Provider value={null}>
      {children}
    </GameContext.Provider>
  );
}
```

Right now, `value={null}` — we’ll replace it with actual game state.

**`{ children }` is the placeholder**

- It means whatever you wrap(Child Components) with `<GameProvider>` will be injected there.

- Without `{ children }`, the components inside `<GameProvider>...</GameProvider>` would never render.

---

## **Step 3 — Adding State**

**Why:**  
Our game setup needs to be **dynamic** (change mode, difficulty, players, etc.).  
React’s `useState` keeps this data and triggers re-renders when it changes.

```js
import { useState } from "react";

const [gameSetup, setGameSetup] = useState({
  mode: "single-player",
  difficulty: "easy",
  players: []
});
```

- We start with defaults for our game.

- If `setGameSetup` is called, React updates the UI wherever `gameSetup` is used.

- Always initialize this state with default values to avoid:
  
  - - Components may break if they expect a property that doesn’t exist yet.
    
    - You need more null/undefined checks everywhere.

---

## **Step 4 — Update Function**

**Why:**  
We don’t want child components directly calling `setGameSetup` with full objects (too error-prone).  
Instead, we give them **helper functions** that know how to safely update state.

```js
const updateGameSetup = (key, value) => {
  setGameSetup(prev => ({ ...prev, [key]: value }));
};
```

- This **merges** the old state with a new property (`mode`, `difficulty`, etc.).

- Using `(prev) => ...` ensures we always work on the latest state.

---

## **Step 5 — Put State + Functions in `value`**

**Why:**  
Whatever we pass to `value={...}` will be available to *all* components inside the provider. the vales are wrapped in object since `value` props only takes a single value.

```js
<GameContext.Provider value={{ gameSetup, updateGameSetup }}>
  {children}
</GameContext.Provider>
```

- Now children can `useContext(GameContext)` and get both the data (`gameSetup`) and the updater (`updateGameSetup`).

---

## **Step 6 — Wrap the App**

**Why:**  
The Provider must wrap **all components** that need access to this data.  
Putting it at the root means *every component in the app* can connect to it.

```js
import { GameProvider } from "./GameContext";

<GameProvider>
  <App />
</GameProvider>
```

Without wrapping, `useContext(GameContext)` will just return the default (`null` here).

**Rule of thumb**:

- If it’s **global state** → wrap at root. 
  
  ```jsx
  <GameProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GameProvider>
  ```

- If it’s **feature-specific state** → wrap at the feature’s parent or route.
  
  ```jsx
    <Route
            path="/game/*"
            element={
              <GameProvider>
                <LobbyPage />
              </GameProvider>
            }
          />
        </Routes>
  ```

---

## **Step 7 — Consuming Context**

**Why:**  
Child components use `useContext(GameContext)` to **read** and **update** the shared state.

```js
import { useContext } from "react";
import { GameContext } from "./GameContext";

function GameSettings() {
  const { gameSetup, updateGameSetup } = useContext(GameContext);

  return (
    <>
      <p>Mode: {gameSetup.mode}</p>
      <button onClick={() => updateGameSetup("mode", "multiplayer")}>
        Switch Mode
      </button>
    </>
  );
}
```

- `gameSetup` → the current values.

- `updateGameSetup` → the way to change them.

---

## **Step 8 — Why not just use state in App?**

We *could* keep all this in `App` and pass props, but:

- If `GameSettings` is **3 levels deep**, we’d have to pass props through every level (prop drilling).

- Context solves that: any component can directly access the data without middlemen.

> So Every time you call functions which triggers re-render make sure they are called on a condition to avoid infinite re - renders. 

## Using Immutabilty -> Immmer

The problem with `setState` is repaces the whole state value with the new value.
Assume the state is a JSON/Array,  So what if we needed to just change a portion of State_Value  (Single Property or just an element) 
so we need to clone the state_value and then pass the updated value to `setState` 

What if there there is atool which would handle cloning and make sure the stae is not just replaced  only by the updated portion. The tool is `Immmer`.

> #### Working of Immer
> 
> The basic idea is that with Immer you will apply all your changes to a temporary *draft*, which is a proxy of the *currentState*. Once all your mutations are completed, Immer will produce the *nextState* based on the mutations to the draft state.
> 
> #### Implemention
> 
> With Immer, this process is more straightforward. We can leverage the `produce` function, which takes as first argument the state we want to start from, and as second argument we pass a function, called the *recipe*, that is passed a `draft` to which we can apply straightforward mutations. Those mutations are recorded and used to produce the next state once the recipe is done. `produce` will take care of all the necessary copying, and protect against future accidental modifications as well by freezing the data.
> 
> > `Note `
> > 
> > The recipe function itself normally doesn't return anything. However, it is possible to return in case you want to replace the `draft` object in its entirety with another object
> 
>  to update the state after Immer has applied the mutations to the state 
> 
> ```jsx
> setState ((prev) => {
>     //Return value from here would be nextState hence use prodce here
>   produce(prev, (deaft)=> {
>     //changes to State
> } )
> }
> ```
> 
> To simplify this proceess Immer also provides it own hook `useImmer`
> 
> install `npm i use-immer`
> 
> ```jsx
> import {useImmer} from 'use-immer' 
> 
> // Create states with useImmer ratehr than useState
> const [state, setState] = useImmer(default_value)
> 
> 
> // TO update state , just use receipe function inside the setState
> 
> 
> setState((draft) => {
>     // changes to state
> } )
> ```



### Logging and MOnitoring
- Logging each and every operation which a user performs.
- This provides an assurance to the user that systems understands him/her well
- It's very unpredictable how and where(device) our website fails.
- How would you know someone from somewhere facing issues while using your site?
- - Hence we need to Monitor the user operations and solve the issues they face.
- Logging helps in building security features and provide respective alerts to dev about the security issue
- Track every user actions -> this lets us know where errors occurred 
- ### Capture
- 1. USer Interactions with site
- 2. Performance Metrics
- 3. Resource Errors
- 4. HEatmap research (Eg: on which parts of the site people click the most)

- ### Montitor
- 1. Alerting
-  ### Fix
- 1. Prioritization
- 2. Debugging
- 3. Mitigation    
- 
- > Never mess with the user data and never blindly put things on the log.
- 
- Logs Helps in providing base data for Analytics , upon analysis we could enhance project. 
- Hence gets the data required to talk inmeetings.
- logs helps to get the quantifiable metrics if you don't have real - users
- Discussing these steps will surely impress the hiring manager.
-   