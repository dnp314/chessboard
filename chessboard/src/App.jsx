import React, { useReducer } from 'react'
import './App.css'
import Board from './components/Board'
import AppContext from './contexts/Context'
import { reducer } from './reducer/reducer'
import { initGameState } from './constant'

export default function App() {
  
  const [appState, dispatch] = useReducer(reducer,initGameState)
  
  const providerState = {
    appState,
    dispatch
  }   
  return (
    <AppContext.Provider value={providerState}>
    <div className='App'>
      <Board/>
    </div>
    </AppContext.Provider>
  )
}
