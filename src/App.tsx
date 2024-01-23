import React from 'react'

import { HashRouter, Route, Routes, Navigate } from "react-router-dom"
import { IconButton } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import HomePage from './page/HomePage'
import SettingsPage from './page/SettingsPage'
import PlayersPage from './page/PlayersPage'
import StartPage from './page/StartPage'
import QuestionPage from './page/QuestionPage'
import ScoresPage from './page/ScoresPage'
import AvatarsPage from './page/AvatarsPage'
import AdminThemesPage from './page/AdminThemesPage'
import AdminThemePage from './page/AdminThemePage'
import PlayingCardsPage from './page/PlayingCardsPage'

import { UserSession } from './data/UserSession'
import { LoginRequest } from './data/LoginRequest'
import { Game, GameUpdater, loadGames, storeGames, clearGames, GameId } from './data/Game'
import { onUserEvent } from './data/Util'
import { QuestionId, QuestionUpdater } from './data/Question'

import { Login } from './client/Login'
import { Logout } from './client/Logout'

import LoginModal from './component/LoginModal'

import './App.css';

import { loadingButtonClasses } from '@mui/lab'

function App() {

  //
  // global state 
  //

  const [ games, setGames ] = React.useState( loadGames() )
  const [ session, setSession ] = React.useState<UserSession>()

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

  const [ loginModal, setLoginModal ] = React.useState( false )
  const openLoginModal = () => {
      setLoginModal(true)
  }
  const closeLoginModal = () => {
      setLoginModal(false)
  }
  const onLogin = (session: UserSession) => {
    setSession(session)
  }
  const logout = onUserEvent(() => {
    if ( session ) {
      Logout(session)
        .then((success) => {
          if ( success ) {
            setSession(undefined)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  })

  // GREG console.log( '[render] app' )
  // <Route path="*" element={<>page not found</>} />

  return (
    <div className="app app-amnezic">

      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage games={games} addGame={addGame} updateGame={updateGame} deleteGames={deleteGames}/>}/>
          <Route path="/game/:gameId/settings" element={<SettingsPage games={games} updateGame={updateGame} />} />
          <Route path="/game/:gameId/players" element={<PlayersPage games={games} updateGame={updateGame} />} />
          <Route path="/game/:gameId/start" element={<StartPage games={games} updateGame={updateGame} />} />
          <Route path="/game/:gameId/question/:questionNumber" element={<QuestionPage games={games} updateGame={updateGame} updateQuestion={updateQuestion}/>} />
          <Route path="/game/:gameId/scores" element={<ScoresPage games={games} updateGame={updateGame} addGame={addGame} />} />
          <Route path="/avatars" element={<AvatarsPage />} />
          <Route path="/cards" element={<PlayingCardsPage />} />
          <Route path="/admin/theme" element={<AdminThemesPage session={session} />} />
          <Route path="/admin/theme/:themeId" element={<AdminThemePage session={session} />} />
          <Route path="*" element={<Navigate to="/" replace />}/>
        </Routes>
      </HashRouter>

      {session && <>
        <IconButton aria-label="Logout" onClick={logout}>
          <LogoutIcon />
        </IconButton>
      </>}

      {!session && <>
        <IconButton aria-label="Login" onClick={openLoginModal}>
          <LoginIcon />
        </IconButton>
        <LoginModal
          open={loginModal}
          closeModal={closeLoginModal}
          onLogin={onLogin}
        />
      </>}

    </div>
  );
}

export default App;
