import {useState} from 'react';
import { ref , uploadBytes} from 'firebase/storage';
import { storage } from './firebase';
//import { v4 } from 'uuid';

import './Login.css';

function Upload(){

	const [Unique , setUnique] = useState(null);
	const [File , setFile] = useState(null);

	const upload = () => {
		if (File == null) return;
		const Fileref = ref(storage , `Files/${File.name + Unique}`);
		uploadBytes(Fileref , File).then(() => {
			alert("File Uploaded");
		});
	};

	return(
		<div className='container-fluid p-0'>
		<div className='w-100 head-container'>
			<div>
				<p className='header'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
				<p className='header-text'>UPLOAD!!!</p>
			</div>
		</div>
		<div className='container-2'>
			<input type="text" placeholder="Your Unique Thing..." className='input-attributes'
				onChange={(e) => {setUnique(e.target.value)}}></input>
			<input type="file" placeholder="Any Thing..." className='input-attributes'
				onChange={(e) => {setFile(e.target.files[0])}}></input>
			<br></br>
			<button className='general-button final-button' onClick={upload}>UPLOAD</button>
		</div>
		</div>
		);

}

export default Upload