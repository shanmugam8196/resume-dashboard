import axios from "axios";
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';

export default function Header(){

    let userid = localStorage.getItem('userid');
    let [username,setUsername] = useState('');

    useEffect(()=>{
        fetch('http://localhost:3000/View_par_user/'+userid)
        .then(response=>response.json())
        .then(json=>setUsername(json.status))
    },[]);

    return(
        <>
        <div className="col-lg-3">
            <label>Resume</label>
        </div>
        <div className="col-lg-6">&nbsp;</div>
        <div className="col-lg-3">
            <label>{username}</label>
            <Link to="/Signreg">
                <button type="button" className="btn btn-danger">Logout</button>
            </Link>
        </div>
        </>
    )
}