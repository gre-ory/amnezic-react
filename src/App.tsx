import React from 'react'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import HomePage from './page/HomePage'
import SettingsPage from './page/SettingsPage'
import PlayersPage from './page/PlayersPage'
import StartPage from './page/StartPage'
import QuestionPage from './page/QuestionPage'
import ScoresPage from './page/ScoresPage'
import EndPage from './page/EndPage'
import AvatarsPage from './page/AvatarsPage'

import { Game, GameUpdater, newGame, loadGames, storeGames, clearGames } from './data/Game'

import './App.css';
import PlayingCardsPage from './page/PlayingCardsPage';

function App() {

  //
  // global state 
  //

  const [ games, setGames ] = React.useState( loadGames() )

  function addGame( game: Game ) {
      console.log( `[add-game] ${game.id}` )
      setGames( prev => {
        const newGames = [ game, ...prev ]
        storeGames( newGames )
        return newGames      
      } )
  }

  function deleteGame( game: Game ) {
      console.log( `[delete-game] ${game.id}` )
      setGames( prev => {
        const newGames = prev.filter( g => g.id !== game.id ) 
        storeGames( newGames )
        return newGames      
      } )
  }

  function deleteGames() {
      console.log( `[delete-games]` )
      setGames( prev => {
        clearGames()
        return []      
      } )
  }

  function updateGame( gameId: string, update: GameUpdater ) {
    console.log( `[update-game] ${gameId}` )
    setGames( prev => {
      const newGames = prev.map( game => game.id === gameId ? update( game ) : game )
      storeGames( newGames )
      return newGames      
    } )
  }

  // GREG console.log( '[render] app' )

  return (
    <div className="app app-amnezic">

      <Router>
        <Routes>
          <Route path="/" element={<HomePage games={games} addGame={addGame} deleteGame={deleteGame} deleteGames={deleteGames}/>} />
          <Route path="/game/:gameId/settings" element={<SettingsPage games={games} updateGame={updateGame} />} />        
          <Route path="/game/:gameId/players" element={<PlayersPage games={games} updateGame={updateGame} />} />
          <Route path="/game/:gameId/start" element={<StartPage games={games} updateGame={updateGame} />} />
          <Route path="/game/:gameId/question/:questionId" element={<QuestionPage games={games} updateGame={updateGame} />} />
          <Route path="/game/:gameId/scores" element={<ScoresPage games={games} updateGame={updateGame} />} />
          <Route path="/game/:gameId/end" element={<EndPage games={games} updateGame={updateGame} addGame={addGame} />} />
          <Route path="/avatars" element={<AvatarsPage />} />
          <Route path="/cards" element={<PlayingCardsPage />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
