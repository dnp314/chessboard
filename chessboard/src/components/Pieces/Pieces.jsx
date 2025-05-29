import './Pieces.css'
import Piece from './Piece'
function Pieces() {
  
  const position = new Array(8).fill('').map(x=>new Array(8).fill(''))
  
  for(let i=0;i<8;i++){
    position[1][i]='wP'
    position[6][i]='bP'
  }
  
  position[0][0] = 'wR';
  position[0][1] = 'wN';
  position[0][2] = 'wB';
  position[0][3] = 'wQ';
  position[0][4] = 'wK';
  position[0][5] = 'wB';
  position[0][6] = 'wN';
  position[0][7] = 'wR';

  position[7][0] = 'bR';
  position[7][1] = 'bN';
  position[7][2] = 'bB';
  position[7][3] = 'bQ';
  position[7][4] = 'bK';
  position[7][5] = 'bB';
  position[7][6] = 'bN';
  position[7][7] = 'bR';


  console.log(position)

  return <div className="pieces">
    {
      position.map((r,rank)=>
        r.map((f,file)=>
          position[rank][file]
          ? <Piece
             key={rank+'-'+file}
             rank={rank}
             file={file}
             piece={position[rank][file]}
            />
          : null
    ))}
  </div>

}

export default Pieces