import React from 'react'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { nanoid } from "nanoid"

import HomePage from './page/HomePage'
import SettingsPage from './page/SettingsPage';
import PlayersPage from './page/PlayersPage';
import QuizzPage from './page/QuizzPage';
import QuestionPage from './page/QuestionPage';
import ScoresPage from './page/ScoresPage';
import EndPage from './page/EndPage';
import AvatarsPage from './page/AvatarsPage';

import { Game, newGame, loadGames, storeGames } from './data/Game';

import './App.css';

function App() {

  //
  // global state 
  //

  const [ games, setGames ] = React.useState( loadGames() )

  function addGame( game: Game ) {
      console.log( `[add] game ${game.id}` )
      setGames( prev => {
        const newGames = [ game, ...prev ]
        storeGames( newGames )
        return newGames      
      } )
  }

  function deleteGame( game: Game ) {
      console.log( `[delete] game ${game.id}` )
      setGames( prev => {
        const newGames = prev.filter( g => g.id !== game.id ) 
        storeGames( newGames )
        return newGames      
      } )
  }

  function updateGame( game: Game ) {
    console.log( `[update] game ${game.id} - nbQuestion ${game.settings.nbQuestion}` )
    setGames( prev => {
      const newGames = [ game, ...prev.filter( other => other.id != game.id ) ]
      storeGames( newGames )
      return newGames      
    } )
  }

  console.log( '[render] app' )

  return (
    <div className="app app-amnezic">

      <Router>
        <Routes>
          <Route path="/" element={<HomePage games={games} addGame={addGame} deleteGame={deleteGame}/>} />
          <Route path="/game/:gameId/settings" element={<SettingsPage games={games} updateGame={updateGame} />} />        
          <Route path="/game/:gameId/players" element={<PlayersPage games={games} updateGame={updateGame} />} />
          <Route path="/game/:gameId/quizz" element={<QuizzPage games={games} updateGame={updateGame} />} />
          <Route path="/game/:gameId/quizz/:question" element={<QuestionPage games={games} updateGame={updateGame} />} />
          <Route path="/game/:gameId/scores" element={<ScoresPage games={games} updateGame={updateGame} />} />
          <Route path="/game/:gameId/end" element={<EndPage games={games} updateGame={updateGame} />} />
          <Route path="/avatars" element={<AvatarsPage />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
