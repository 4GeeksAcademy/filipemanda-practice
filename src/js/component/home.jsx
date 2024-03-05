import React, { useState, useEffect } from "react";


//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [tasks, setTasks] = useState([]);    // changing task varibale with the settasks setvairable
	const [userInput, setUserInput] = useState("");  // saving a new userinput variable with the setUserinput setter.
	const [bool, setBool] = useState(true);


	useEffect(() => {
		fetch("https://playground.4geeks.com/apis/fake/todos/user/Fil")
			.then((resp) => resp.json())
			.then((data) => setTasks(data));
	}, []);


	// not sure whats goign on from here until line 24
	const handleClick = () => {
		let newArray = [...tasks, { label: userInput, done: false }];
		setTasks(newArray);
		//this fetch is responbile for putting the new object from the api into my todolist
		fetch("https://playground.4geeks.com/apis/fake/todos/user/Fil", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newArray),
		});
		setUserInput(""); // this is basically resetting the input to an empty string everytime the button is clicked 
	};

	const mark = (idx) => {
		// setBool (!bool)
		tasks[idx].done = !tasks[idx].done
		fetch("https://playground.4geeks.com/apis/fake/todos/user/Fil", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(tasks),
			
		});
		setBool (!bool)

	}





	return (
		<div className="App">
			<h1 className="d-flex">My Tasks</h1>
			<div>
				<input
					type="text"
					onChange={(e) => setUserInput(e.target.value)} //eventlistner that alowws the text to be changed by the user 
					placeholder="Add a task"
					value={userInput}
				/>
			</div>
			<button
				// eve listner that triggers handleclick everytime the button is clicked 
				onClick={() => {
					handleClick();
				}}
			>
				Add
			</button>

			<ul>  {/*not sure whats going on here  */}
				{tasks.length > 1 ? tasks.map((task, index) => (
					<li key={index}>{task.label} <input onChange={(e) => { mark(index) }} type="checkbox" checked={tasks[index].done == true ? true : false} />
					</li>
				)) : null}
			</ul>
		</div>
	);
}

export default Home;
