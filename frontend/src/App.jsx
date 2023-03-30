import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'


//https://dog.ceo/api/breeds/image/random
function App() {

  const [dogImage, setDogImage] = useState('')

  async function generateMonster() {
    console.log("hello from line 14")
    const response = await axios.get('https://dog.ceo/api/breeds/image/random')
    console.log("hello from line 16")
    setDogImage(response.data.message)
    console.log("hello from line 18")
    // axios.get('https://dog.ceo/api/breeds/image/random')
    //   .then(function(response) {
    //     setDogImage(response.data.message);
    //   })

  }

  return (
    <div>
      <div>
        Hello, click to generate a monster
      </div>
      <button onClick={generateMonster}>
        Generate
      </button>
      {dogImage ? <img src={dogImage} /> : null}

    </div>
  )
  // const [dogImage, setDogImage] = useState('')

  // function getDogImageAsPromise() {
  //   console.log("hello from line 13")
  //   axios.get("https://dog.ceo/api/breeds/image/random")
  //     .then(function(response) {
  //       console.log("hello from line 16")
  //       setDogImage(response.data.message)
  //     })
  //   console.log("hello from line 19")
  // }

  // // async function getDogImageAsAsyncAwait() {
  // //   const response = await axios.get("https://dog.ceo/api/breeds/image/random")
  // //   setDogImage(response.data.message);
  // // }


  // return (
  //   <div>
  //     <div>
  //       Hello from my dog picture app
  //     </div>
  //     <button onClick={getDogImageAsPromise}>
  //       Click here to get a dog image
  //     </button>
  //     {dogImage && <img src={dogImage} />}
  //   </div>
  // )
}

export default App
