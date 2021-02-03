import React, {useState} from 'react';
import {Link } from 'react-router-dom';
import './Join.css';


const Join=()=>{
    const [name,setName]=useState(''); // name and its setter inside od setstate initialize with the  value the var is going to have 
    const [room,setRoom]=useState('');
    return (
    
        <div className=" Box d-flex  justify-content-center position-absolute w-100 h-100 align-items-center ">
            <div className="card">
                <h1 className="Text text-center card-header">
                    Scribbl
                </h1>
                <div className="form-group1 w-50"><input placeholder="Name" type="text" className="form-control"  onChange={(event)=> setName(event.target.value)} /></div>
                <div className="form-group w-50"><input placeholder="Room" type="text" className="form-control"  onChange={(event)=> setRoom(event.target.value)}/></div>
                <Link  onClick={event => (!name || !room )? event.preventDefault():null} to={'/room?name='+name+'&room='+room}>
                    <div className="text-center">
                 <button className="btn btn-dark mt-50 Btn" type="submit">Sign in </button>
                 </div>
                </Link>
            </div>
        </div>
        
    )
}
export default Join;