import { useEffect, useState } from "react"
import { addDoc, collection, onSnapshot, query, serverTimestamp, where, orderBy } from 'firebase/firestore'

import { auth, db } from "../firebase"
import React from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBIcon,
    MDBBtn,
    MDBCardFooter,
    MDBInputGroup,
  } from "mdb-react-ui-kit";
import { nanoid } from "nanoid";

export const Chat = (props) => {
    const { room } = props
    const [newMessage, setNewMessage] = useState("")
    const [messages, setMessages] = useState([])
    const messageRef = collection(db, "messages")
    
    useEffect(()=> {
        const queryMessages = query(
            messageRef, 
            where("room", "==", room),
            orderBy("createdAt")
        );
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            
            let messages = []
            snapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id})
            })
            setMessages(messages)

        })

        return () => unsubscribe()
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault()
        if (newMessage === "") return;

        await addDoc(messageRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            photoURL: auth.currentUser.photoURL,
            room: room,
            id: nanoid()
        })

        setNewMessage("")
        
    }
    
    return (
    <MDBContainer fluid className="py-5">
        <MDBRow className="d-flex justify-content-center">
            <MDBCol md="8" lg="6" xl="4">
            <MDBCard>
                <MDBCardHeader
                className="d-flex justify-content-between align-items-center p-3"
                style={{ borderTop: "4px solid #ffa900" }}
                >
                <h5 className="mb-0">Chat messages</h5>
                <div className="d-flex flex-row align-items-center">
                    <span className="badge bg-warning me-3">20</span>
                    <MDBIcon
                    fas
                    icon="minus"
                    size="xs"
                    className="me-3 text-muted"
                    />
                    <MDBIcon
                    fas
                    icon="comments"
                    size="xs"
                    className="me-3 text-muted"
                    />
                    <MDBIcon
                    fas
                    icon="times"
                    size="xs"
                    className="me-3 text-muted"
                    />
                </div>
                </MDBCardHeader>
    <div style={{position: "relative", height: "400px", overflowY:"scroll"}}>
        
        {messages.map((message) => (
            
                    <MDBCardBody key={message.id}>
                    {message.user === auth.currentUser.displayName ? (    
                    <>

                    <div className="d-flex justify-content-between">
                         <p className="small mb-1 text-muted">23 Jan 6:10 pm</p>
                        <p className="small mb-1">{message.user}</p>
                        </div>
            
                        <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                        <div>
                            <p className="small p-2 me-3 mb-3 text-white rounded-3 bg-warning">
                            {message.text}
                            </p>
                        </div>
                        <img
                            src={message.photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'}
                            alt="avatar 1"
                            className='img-fluid rounded-pill'
                            style={{ width: "45px", height: "100%" }}
                        />
                    </div>

                    </>) : (     
                    <>
                    <div className="d-flex justify-content-between">
                        <p className="small mb-1 text-muted">23 Jan 6:10 pm</p>
                        <p className="small mb-1">{message.user}</p>
                        </div>
                        <div className="d-flex flex-row justify-content-start">
                        <img
                            src={message.photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'}
                            alt="avatar 1" 
                            className='img-fluid rounded-pill'
                            style={{ width: "45px", height: "100%" }}
                        />
                        <div>
                            <p
                            className="small p-2 ms-3 mb-3 rounded-3"
                            style={{ backgroundColor: "#f5f6f7" }}
                            >
                            {message.text}
                            </p>
                        </div>
                    </div>
                    </>)}




       </MDBCardBody>
        ))}
    </div>
                
                <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
                
                <MDBInputGroup className="mb-0">
                    <input
                    className="form-control"
                    placeholder="Type message"
                    type="text"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                    />
                    <MDBBtn className="ms-3" onClick={handleSubmit}  color="warning" style={{ paddingTop: ".55rem" }}>
                    <MDBIcon fas icon="paper-plane" />
                    </MDBBtn>
                </MDBInputGroup>
                </MDBCardFooter>
            </MDBCard>
            </MDBCol>
        </MDBRow>
    </MDBContainer>

    )
}