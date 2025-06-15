import { useAppContext }from '../../../contexts/Context'
import { takeBack } from '../../../reducer/actions/move'

const TakeBack = () => {
  
  const {dispatch} = useAppContext()

  return <div >
    <button style={{marginLeft:'20px'}} onClick={()=>dispatch(takeBack())}>Take Back</button>
  </div>

}

export default TakeBack