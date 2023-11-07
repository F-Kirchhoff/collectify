import "./App.css";
import { data } from "./db";

function App() {
  return (
    <main>
      <h1>Collectify</h1>;
      <ul>
        {data.map((album) => (
          <li>{album.title}</li>
        ))}
      </ul>
    </main>
  );
}

export default App;
