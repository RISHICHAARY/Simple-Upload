import {useState , useEffect } from 'react';
import { ref , uploadBytes , getDownloadURL , listAll } from 'firebase/storage';
import { storage } from './firebase';
//import { v4 } from 'uuid';

import './Login.css';

function Upload(){

	const [Unique , setUnique] = useState("");
	const [File , setFile] = useState(null);
	const [Fileurls , setFileurls] = useState([]);

	const fileref = ref(storage, "Files/");

	const upload = () => {
		if (File == null) return;
		const Fileref = ref(storage , `Files/${File.name + Unique}`);
		uploadBytes(Fileref , File).then((Filedata) => {
			getDownloadURL(Filedata.ref).then((url) => {
				alert("File Uploaded");
				setFileurls((prev) =>[...prev,{url:url,name:Filedata.ref.name}]
		)});
		});
	};

	useEffect(() => {
		setFileurls([]);
		listAll(fileref).then((response) => {
		  response.items.forEach((item) => {
			getDownloadURL(item).then((url) => {
			  setFileurls((prev) => [...prev,{url:url,name:item.name} ]);
			});
		  });
		});
	  }, []);

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
			<div className='bas'>
			<p className='files-label1'>YOUR FILES</p>
			{
				Fileurls.map((url) => {
				return (
					<div className='row m-1 base'>
						<p className='col-6 files-label float-end'>{url.name.substring(0,url.name.length-4)}</p>
						<a href={url.url} target="blank" className='col-6 files float-start w-25'> OPEN </a><br></br>
					</div> 
				);
			})}
			</div>
		</div>
		);

}

export default Upload
