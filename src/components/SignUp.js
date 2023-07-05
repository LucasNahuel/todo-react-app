import { useState } from 'react';
import ErrorNotification from './ErrorNotification';

function SignUp(props){


    const [formState, setFormState] = useState(null);

    const [notification, setNotification] = useState(null);


    function handleSubmit(ev){
        ev.preventDefault();

        console.log(formState);

        let userToSave = {
            "user" : {

                "username" : formState.username,
                "password" : formState.password 
            }
        }

        fetch(process.env.REACT_APP_API_URL+"registerUser",{
            method : 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(userToSave)
        }).then(
            (response) =>{
                console.log(response);
            }
        )
    }

    function handleUsernameChange(ev){
        ev.preventDefault();

        setFormState({ ...formState, username : ev.target.value });


        //should check if the username is taken

        fetch(process.env.REACT_APP_API_URL+"usernameExists?username="+ev.target.value, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(
            (response) =>{
                if(response.ok){
                    return response.json();
                }
            }
        ).then(
            (data) => {
                if(data.value == true){
                    ev.target.setCustomValidity("The username is already taken");
                }else{
                    ev.target.setCustomValidity("");
                }
            }
        );
    }

    function handlePasswordChange(ev){

        ev.preventDefault();

        if(formState && formState.passwordConfirmation){
            if(ev.target.value != formState.passwordConfirmation){
                ev.target.setCustomValidity("Passwords doesn't match");
               
                console.log(ev.target.value+" != "+formState.passwordConfirmation);
            }else{
                ev.target.setCustomValidity("");
            }


        }

        ev.target.reportValidity();

        setFormState({...formState, password : ev.target.value});
    }


    function handlePasswordConfirmation(ev){
        ev.preventDefault();

        if(formState && formState.password){
            if(ev.target.value != formState.password){

                console.log(ev.target.value+" != "+formState.password);

                ev.target.setCustomValidity("Passwords doesn't match");

                
            }else{
                ev.target.setCustomValidity("");
            }
        }

        ev.target.reportValidity();

        setFormState({...formState, passwordConfirmation : ev.target.value});

    }

    return(
        <div className="form-container">

            <form onSubmit={(ev) => handleSubmit(ev)} className="form">

                <h2 className="form-title">Sign up</h2>

                <input minLength={3} maxLength={256} type='text' placeholder='username' onChange={(ev) => handleUsernameChange(ev)}></input>

                <input type='password' minLength={7} maxLength={256} placeholder='password' onChange={(ev) => handlePasswordChange(ev)}></input>

                <input type='password' minLength={7} maxLength={256} placeholder='password confirmation' onChange={(ev) => handlePasswordConfirmation(ev)}></input>
            
                <button type="submit">Register</button>
            </form>

            {notification}

        </div>
    );


}


export default SignUp;