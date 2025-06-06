import { getCharacter } from '../../helper'
import './Files.css'

function Files({files}) {
  return (
      <div className='files'>
      {files.map(file=><span key={file}>{getCharacter(file)}</span>)}
    </div>
  )
}

export default Files