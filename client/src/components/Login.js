import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios'



export default function Login(props) {

function handleChange() {
 props.setMyEmail(document.getElementById('email').value);
 props.setMyUserName(document.getElementById('uname').value);
}
async function makeRandomName() {

    const randomNamePromise = axios('/api/randomName/')
    const randomName = await randomNamePromise
    props.setMyUserName(randomName.data)
    localStorage.setItem('myUserName', randomName.data);
}


var actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url: 'https://ancient-falls-93393.herokuapp.com/',
  // This must be true.
  handleCodeInApp: true,

};

function sendLink() {
      props.setLoginVisible(false)
props.app.auth().sendSignInLinkToEmail(props.myEmail, actionCodeSettings)
  .then(function() {

    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    localStorage.setItem('emailForSignIn', props.myEmail);
  })
  .catch(function(error) {
    // Some error occurred, you can inspect the code: error.code
  });
  }
  return(
  <Form>
    <Form.Field>
      <label>Email Address</label>
      <input type='email' id='email' onChange={()=>handleChange()} placeholder='name@email.com' />
    </Form.Field>
    <Form.Field>
      <label>User Name</label>
      <input type='text' id='uname' value={props.myUserName ? props.myUserName : "Anonymous"} onChange={()=>handleChange()} placeholder='Any Name' />
    </Form.Field>
    <Form.Field>
    </Form.Field>
    <Button onClick={(e) => makeRandomName()}>Random</Button>
    <Button onClick={(e) => sendLink()}>Submit</Button>
  </Form>
)

}