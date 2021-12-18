import {Link, useNavigate} from "react-router-dom";
import "../../App.css";
import {Button} from "react-bootstrap";


export default function NotFound() {

    let navigate = useNavigate();

    const handleClick = (event) => {
        event.preventDefault();
        navigate("/");
    }

    return (
        <div className="App-header App error-page">
            <h1 className="error-hero">🤔</h1>
            <h2>What on earth are you up to</h2>
            <Button variant="success" onClick={handleClick}>Why don't you start again?</Button>
        </div>
    )
}
