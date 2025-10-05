import './App.css'
import CustomizationModal from './components/CustomizationModal'
import { sampleProduct } from './helpers/menuData'

function App() {

  return (
    <>
     { <CustomizationModal open={true} onClose={()=>{console.log("Closed")}} product={sampleProduct}/>}
    </>
  )
}

export default App
