export const getCharacter = file => String.fromCharCode(file+96)

export const createPosition = () =>{
  const position = new Array(8).fill('').map(x=>new Array(8).fill(''))
  
  for(let i=0;i<8;i++){
    position[1][i]='wP'
    position[6][i]='bP'
  }
  
  position[0][0] = "wR";
  position[0][1] = "wN";
  position[0][2] = "wB";
  position[0][3] = "wQ";
  position[0][4] = "wK";
  position[0][5] = "wB";
  position[0][6] = "wN";
  position[0][7] = "wR";

  position[7][0] = "bR";
  position[7][1] = "bN";
  position[7][2] = "bB";
  position[7][3] = "bQ";
  position[7][4] = "bK";
  position[7][5] = "bB";
  position[7][6] = "bN";
  position[7][7] = "bR";

  //position for testing stalemate, insufficient material conditions
  // position[7][4]='wK'
  // position[7][7]='bK'
  // position[6][1]='bR'
  // position[6][2]='wB'
  

  

  return position
} 

export const copyPosition = position =>{
  const newPosition = new Array(8).fill('').map(x => new Array(8).fill(''))

  for(let rank=0; rank<8; rank++){
    for(let file=0; file<8; file++){
      newPosition[rank][file] = position[rank][file]
    }
  }
  return newPosition
}

export const areSameColorTiles = (coords1, coords2) => 
  (coords1.x + coords1.y)%2 === (coords2.x + coords2.y)%2



export const findPieceCoords = (position,type) =>{
  let results = []
  position.forEach((rank,i)=>{
    rank.forEach((pos,j)=>{
      if (pos === type)
        results.push({x:i, y:j})
    })
  })
}

export const getNewMoveNotation = ({piece,rank,file,x,y,position,promotesTo,}) => {
  let note = ""

  rank = Number(rank)
  file = Number(file)
  if (piece[1] === "K" && Math.abs(file - y) === 2) {
    if (file < y) return "O-O"
    else return "O-O-O"
  }

  if (piece[1] !== "P") {
    note += piece[1]
    if (position[x][y]) {
      note += "x"
    }
  } else if (rank !== x && file !== y) {
    note += getCharacter(file + 1) + "x"
  }

  note += getCharacter(y + 1) + (x + 1)

  if (promotesTo) note += "=" + promotesTo

  return note
}