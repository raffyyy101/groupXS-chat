import { async } from "@firebase/util"
import {auth, provider} from '../firebase'
import { signInWithPopup } from "firebase/auth"
import Cookies from "universal-cookie"
import Logo from "../assets/groupxs-logo.png"
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


export const Auth = (props) => {
    const {setIsAuth} = props;

    const signInWithGoogle = async() => {
        try {
        const result =await signInWithPopup(auth, provider)
        cookies.set("auth-token", result.user.refreshToken)
        setIsAuth(true)
        } catch(err) {
            console.error(err);
        }
    }

    return (
    <MDBContainer fluid>

    <MDBRow className='d-flex justify-content-center align-items-center h-100'>
      <MDBCol col='12'>

        <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
          <MDBCardBody className='p-5 w-100 d-flex flex-column'>

            <img src={Logo}/>
            <p className="text-white-50 mb-3">Please enter your login and password!</p>


            <MDBBtn 
            onClick={signInWithGoogle}
            className="mb-2 w-100" 
            size="lg" 
            style={{backgroundColor: '#dd4b39'}}>
              <MDBIcon fab icon="google" className="mx-2"/>
              Sign in with google
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>

      </MDBCol>
    </MDBRow>

  </MDBContainer>
    )
}
