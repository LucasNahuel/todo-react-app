import { useState } from 'react';

function SignIn(props){


    const [formState, setFormState] = useState(null);



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
        <div className="create-task-form-container">

            <form onSubmit={(ev) => handleSubmit(ev)} className="create-task-form">

                <h2 className="form-title">Sign in</h2>

                <input minLength={3} maxLength={256} type='text' placeholder='username' onChange={(ev) => handleUsernameChange(ev)}></input>

                <input type='password' minLength={7} maxLength={256} placeholder='password' onChange={(ev) => handlePasswordChange(ev)}></input>

                <input type='password' minLength={7} maxLength={256} placeholder='password confirmation' onChange={(ev) => handlePasswordConfirmation(ev)}></input>
            
                <button type="submit">Register</button>
            </form>

        </div>
    );


}


export default SignIn;