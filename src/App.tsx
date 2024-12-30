// import { useEffect } from 'react';
import { Game } from './components/Game/Game';

function App() {
  // useEffect(() => {
  //   // const game = new Game();

  //   return () => {
  //     document.body.removeChild(game.getCanvas());
  //   };
  // }, []);

  return (
    <div id="game-container">
      <Game />
    </div>
  );
}

export default App;
