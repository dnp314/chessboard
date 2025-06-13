import './Popup.css'
import { useAppContext } from '../../contexts/Context'
import PromotionBox from './PromotionBox/PromotionBox'
import { Status } from '../../constant'
import { closePopup } from '../../reducer/actions/popup'

const Popup = () =>{

  const {appState,dispatch} = useAppContext()

  if(appState.status == Status.ongoing)
    return null
  
  const onClosePopup = () =>{
    dispatch(closePopup())
  }

  return <div className="popup">
    <PromotionBox onClosePopup={onClosePopup}/>
  </div>
}

export default Popup
