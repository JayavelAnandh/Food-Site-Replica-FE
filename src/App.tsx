import { useState } from 'react'
import './App.css'
import CustomizationModal from './components/CustomizationModal'
import { sampleProduct } from './helpers/menuData'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     { <CustomizationModal open={true} onClose={()=>{console.log("Closed")}} product={sampleProduct}/>}
    </>
  )
}

export default App
