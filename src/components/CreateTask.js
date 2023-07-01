import { useState } from "react";



function CreateTask(props){


    const [formState, setFormState] = useState(null);


    function handleSubmit(ev){

        ev.preventDefault();


        let task = {
            "task":{
                    
                "name" : formState.taskName,
                "description" : formState.description,
                "estimatedTimeToCompletion" : Number.parseInt(formState.estimatedHoursToCompletion * 60) + Number.parseInt(formState.estimatedMinutesToCompletion)
            }
        }

        fetch(process.env.REACT_APP_API_URL+"createTask", {
            method : 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(task)
        }).then(
            (response) =>{
                if(response.status == 200){
                    return response.json();
                }else{
                    console.log(response);
                }
            }
        );

    }


    function handleTaskNameChange(ev){
        ev.preventDefault();

        if(ev.target.value.length > 3){
            setFormState({...formState, "taskName" : ev.target.value});
        }

    }

    function handleTaskDescription(ev){

        ev.preventDefault();

        setFormState({...formState, "description" : ev.target.value});
    }

    function handleTaskHoursCompletion(ev){
        ev.preventDefault();

        setFormState({...formState, "estimatedHoursToCompletion" : ev.target.value });
    }

    function handleTaskMinutesCompletion(ev){
        ev.preventDefault();

        setFormState({...formState, "estimatedMinutesToCompletion" : ev.target.value });
    }

    return(
        <div className="create-task-form-container">
            <form onSubmit={(ev) => handleSubmit(ev)} className="create-task-form">

                <h2 className="form-title">Create Task</h2>
                
                <input minLength={3} type="text" onChange={(ev) => handleTaskNameChange(ev)} placeholder="task name" ></input>

                <textarea rows={4} type="text" onChange={(ev) => handleTaskDescription(ev)} placeholder="description" />

                <div className="etc-container">
                    
                    <input type="number" onChange={(ev) => handleTaskHoursCompletion(ev)} placeholder="Hours"></input>
                    <input type="number" onChange={(ev) => handleTaskMinutesCompletion(ev)} max={60} placeholder="Minutes"></input>
                </div>

                <button type="submit">Save Task</button>
            </form>
        </div>
    );
}

export default CreateTask;