import { useRef, useState } from 'react'
import { Auth } from './components/Auth'
import Cookies from "universal-cookie"
import { Chat } from './components/Chat'
import { signOut } from 'firebase/auth'
import { auth } from './firebase'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
const cookies = new Cookies()

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room, setRoom] = useState("")


  const roomRef = useRef(null)

  if (!isAuth) {
  return (
    <div className="App">
      <Auth setIsAuth={setIsAuth}/>
    </div>
  )      
}
const logOut = async () => {
  await signOut(auth)
  cookies.remove("auth-token")
  setIsAuth(false)
  setRoom(null)
};
return <div>{room ? (
    <Chat room={room}/>
) : (
    <MDBContainer fluid>

    <MDBRow className='d-flex justify-content-center align-items-center h-100'>
      <MDBCol col='12'>

        <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
          <MDBCardBody className='p-5 w-100 d-flex flex-column'>

            <h2 className="fw-bold mb-2 text-center">Enter Room Name</h2>
            

            <MDBInput 
            ref={roomRef}
            wrapperClass='mb-4 w-100' 
            id='formControlLg' 
            type='text' 
            size="lg"/>

            <MDBBtn 
            onClick={() => setRoom(roomRef.current.value)}
            size='lg'>
              Enter Chat
            </MDBBtn>
            <MDBBtn 
            onClick={logOut}
            size='lg'>
              Logout
            </MDBBtn>

          </MDBCardBody>
        </MDBCard>

      </MDBCol>
    </MDBRow>

  </MDBContainer>

)}
</div>
}

export default App
