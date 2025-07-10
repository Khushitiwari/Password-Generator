import { useState , useCallback , useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberUsed , setNumberused] = useState(false)
  const [characters , setCharacters] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook : used for taking reference of anything
   const passwordRef = useRef(null)

  const paswrdGenerator = useCallback( () =>{
     let pass = ""
     let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

     if(numberUsed){ // if numbers are allowed used it also
       str += "0123456789"
     }
     if(characters){ // if characters are allowed used it also
      str += "!@#^&$"
     }

     for (let i = 1; i <= length; i++) {

      
      let char = Math.floor(Math.random() * str.length + 1) //generating random char till the length

      pass += str.charAt(char) //concatenating the values
      
     }


     setPassword(pass)

  } , [numberUsed , length, characters ,setPassword]) // if pswrd will be added instead of setpswrd in dependencies it will run infinitely 
  

  const copyPswrdToClipboard = useCallback(()=>{ // use callback is used for optimisation & memorize , it's optional here 

   passwordRef.current?.select() // to show that current value of pswrd is selected 
   // passwordRef.current?.setSelectionRange(0,20) // to set the range of selected value
   window.navigator.clipboard.writeText(password) // copying the pswrd text to clipboard

    
  }, [password])

  useEffect(() =>{ // if anything is changes in dependency or if page is reloaded run it again 
    paswrdGenerator()
  }, [length, numberUsed,characters, paswrdGenerator]) 

  return (
    <>
      <div className="w-full max-w-xl mx-auto shadow-lg  rounded-lg  px-7 my-8 py-8 text-white-500  bg-gray-800">
        <h1 className="text-white-500 text-3xl text-center mb-10 mt-5 ">Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mt-4 bg-white text-orange-900 mb-10'>
        <input 
        type='text' 
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef} // reference 
        ></input>
        <button 
        onClick={copyPswrdToClipboard}
        className='outline-gray text-white  bg-blue-700 px-3 py-0.5 shrink-0 hover:bg-black'> Copy</button>
        </div>

        <div className='flex text-sm gap-x-5'>

          <div className='flex items-center gap-x-1'>
            <input 
            type='range'
            min={6}
            max={30}
            value={length}
            className='cursor-pointer'
            onChange={(e) =>{setLength(e.target.value)}}
            ></input>

            <label>Length:{length}</label>
          </div>

           <div className='flex items-center gap-x-1'>
            <input 
            type='checkbox'
            defaultChecked ={numberUsed}
            id="numberInput"

            onChange={() =>{
              setNumberused((prev) => !prev);
            }}
            ></input>

            <label htmlFor='numberInput'>Numbers</label>
          </div>


          <div className='flex items-center gap-x-1'>
            <input 
            type='checkbox'
            defaultChecked ={characters}
            id="characterInput"

            onChange={() =>{
              setCharacters((prev) => !prev); // to change the value if checked make it unchecked and vice-versa
            }}
             > </input>

            <label htmlFor='chararcterInput'>Characters</label>
          </div>


          
        </div>
      </div>
    </>
  )

 }

export default App
