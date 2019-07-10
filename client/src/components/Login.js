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
    var spltName = randomName.data.split('-')

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
}

   var firstRandomName = capitalizeFirstLetter(spltName[0])
   var lastRandomName = capitalizeFirstLetter(spltName[1])
   var newName = `${firstRandomName} ${lastRandomName}`

    props.setMyUserName(newName)
    localStorage.setItem('myUserName', newName);
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
    <Button onClick={(e) => props.requestEmailLink(props.myEmail)}>Submit</Button>
  </Form>
)

}