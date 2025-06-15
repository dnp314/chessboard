import './Pieces.css'
import Piece from './Piece'
import { useState, useRef } from 'react'
import arbiter from '../../arbiter/arbiter'
import { createPosition, copyPosition } from '../../helper'
import { useAppContext } from '../../contexts/Context'
import { clearCandidates, makeNewMove } from '../../reducer/actions/move'
import { openPromotion } from '../../reducer/actions/popup'
import { getCastlingDirections } from '../../arbiter/getMoves'
import { detectStalemate, updateCastling, detectInsufficientMaterial } from '../../reducer/actions/game'

function Pieces() {
  
  const ref = useRef()

  const {appState,dispatch} = useAppContext()

  const currentPosition = appState.position[appState.position.length-1]

  const calculateCoords = e => {
    const {width,left,top} = ref.current.getBoundingClientRect()
    const size =  width/8
    const y = Math.floor((e.clientX - left)/size)
    const x = 7 - Math.floor((e.clientY - top)/size)
    return {x,y}
  }

  const openPromotionBox = ({rank,file,x,y}) =>
    dispatch(openPromotion({
      rank:Number(rank),
      file:Number(file),
      x,
      y
    })
  )

  const updateCastlingState = ({piece,rank,file}) =>{
    const direction = getCastlingDirections({
      castleDirection:appState.castleDirection,
      piece,rank,file
    })

    if(direction){
      dispatch(updateCastling(direction))
    }
    
  }


  const move = e => {

    const {x,y} = calculateCoords(e)
    const [piece,rank,file] = e.dataTransfer.getData('text').split(',')
    
    if (appState.candidateMoves?.find(m=>m[0]===x && m[1]===y)){
      
      const opponent = piece.startsWith('w')?'b':'w'
      const castleDirection = appState.castleDirection[`${piece.startsWith('b')?'w':'b'}`]

      if(piece==='wP' && x===7 || piece==='bP' && x ===0){
        openPromotionBox({rank,file,x,y})
        return 
      }

      if(piece.endsWith('R') || piece.endsWith('K')){
        updateCastlingState({piece,rank,file})
      }
      
      const newPosition = arbiter.performMove({
        position: currentPosition,
        piece,rank,file,
        x,y
      })
      dispatch(makeNewMove({newPosition}))
    
      if(arbiter.insufficientMaterial(newPosition)){
        dispatch(detectInsufficientMaterial())
      }
      else if(arbiter.isStalemate(newPosition,opponent,castleDirection))
        dispatch(detectStalemate())
    
    
    }
      
    dispatch(clearCandidates())

  }


  const onDrop = e =>{  

    e.preventDefault()

    move(e)

  }

  const onDragOver = e => e.preventDefault()

  return <div 
  ref = {ref}
  onDrop={onDrop}
  onDragOver={onDragOver} 
  className="pieces">
    {
      currentPosition.map((r,rank)=>
        r.map((f,file)=>
          currentPosition[rank][file]
          ? <Piece
             key={rank+'-'+file}
             rank={rank}
             file={file}
             piece={currentPosition[rank][file]}
            />
          : null
    ))}
  </div>

}

export default Pieces