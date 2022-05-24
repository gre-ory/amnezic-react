import React from 'react'

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import HomePage from './page/HomePage'
import SettingsPage from './page/SettingsPage'
import PlayersPage from './page/PlayersPage'
import StartPage from './page/StartPage'
import QuestionPage from './page/QuestionPage'
import ScoresPage from './page/ScoresPage'
import AvatarsPage from './page/AvatarsPage'

import { Game, GameUpdater, loadGames, storeGames, clearGames, GameId } from './data/Game'

import './App.css';
import PlayingCardsPage from './page/PlayingCardsPage';
import { QuestionId, QuestionUpdater } from './data/Question'

function App() {

  //
  // global state 
  //

  const [ games, setGames ] = React.useState( loadGames() )

  function addGame( game: Game ) {
      console.log( `[add-game] ${game.id}` )
      setGames( prev => {
        const newGames = [ game, ...prev ]
        return storeGames( newGames )
      } )
  }

  function deleteGame( game: Game ) {
      console.log( `[delete-game] ${game.id}` )
      setGames( prev => {
        const newGames = prev.filter( g => g.id !== game.id ) 
        return storeGames( newGames )
      } )
  }

  function deleteGames( gameIds: GameId[] ) {
      console.log( `[delete-games]` )
      setGames( prev => {
        for ( const gameId of gameIds ) {
          console.log( `[todo] ${gameId}` )
        }
        for ( const game of prev ) {
          console.log( `[before] ${game.id}` )
        }
        const newGames = prev.filter( game => gameIds.indexOf( game.id ) === -1 )
        for ( const game of newGames ) {
          console.log( `[after] ${game.id}` )
        }
        return storeGames( newGames )
      } )
  }

  function updateGame( gameId: GameId, update: GameUpdater ) {
    console.log( `[update-game] ${gameId}` )
    setGames( prev => {
      const newGames = prev.map( game => game.id === gameId ? update( game ) : game )
      return storeGames( newGames )
    } )
  }

  function updateQuestion( gameId: GameId, questionId: QuestionId, update: QuestionUpdater ) {
    console.log( `[update-question] ${gameId} - ${questionId}` )
    setGames( prev => {
      const newGames = prev.map( game => {
        if ( game.id != gameId ) {
          return game
        }
        game.questions = game.questions.map( question => question.id === questionId ? update( question ) : question )
        return game        
      } )
      return storeGames( newGames )
    } )
  }

  // GREG console.log( '[render] app' )

  return (
    <div className="app app-amnezic">

      <Router>
        <Routes>
          <Route path="/" element={<HomePage games={games} addGame={addGame} updateGame={updateGame} deleteGames={deleteGames}/>} />
          <Route path="/game/:gameId/settings" element={<SettingsPage games={games} updateGame={updateGame} />} />        
          <Route path="/game/:gameId/players" element={<PlayersPage games={games} updateGame={updateGame} />} />
          <Route path="/game/:gameId/start" element={<StartPage games={games} updateGame={updateGame} />} />
          <Route path="/game/:gameId/question/:questionNumber" element={<QuestionPage games={games} updateGame={updateGame} updateQuestion={updateQuestion}/>} />
          <Route path="/game/:gameId/scores" element={<ScoresPage games={games} updateGame={updateGame} addGame={addGame} />} />
          <Route path="/avatars" element={<AvatarsPage />} />
          <Route path="/cards" element={<PlayingCardsPage />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
