import React, {useState, useEffect} from 'react';
import {Link } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Room.css';
let socket;
const Room=()=>{
    const [name, setName] = useState(''); // name and its setter inside od setstate initialize with the  value the var is going to have 
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);

        //used for disconnect effects (hook)
    }, [ENDPOINT, location.seach]);


        return (
        <div className="Box d-flex   position-absolute w-100 h-100 ">
            <div className="jointContainerIN">
                <h1 className="heading">
                    Hello {name} , wanna play ? 
                </h1>
            <div className="Users">
                
            </div>
            <Link  onClick={event => (!name || !room )? event.preventDefault():null} to={'/chat?name='+name+'&room='+room}>
                 <button className="playButton mt-20" type="submit">Play </button>
                </Link>
                 
             </div>
        </div>
    )
}
export default Room;    