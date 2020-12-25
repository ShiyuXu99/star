import React, {Component} from 'react';
import { Card} from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import "../css/createNote.css"
import axios from 'axios';
import planet from "../image/letterPlanet.gif"
import {Redirect} from "react-router-dom";

class CreateNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteTitle: null,
            noteContent: null,
            receiver:null,
            redirect:false,
        }
    }

    handleSubmit = (event) => {
        if(this.state.noteTitle === null || this.state.noteContent === null ||this.state.noteContent === null){
            alert("你有地方没有写完哦～")
        }
        else{
            this.handleMoveFoward();
        }

    }

    handleMoveFoward =()=>{
        axios.post('https://tochenbackend.herokuapp.com/posts/add', {
            title: this.state.noteTitle,
            description: this.state.noteContent,
            user: this.state.receiver,

        })
            .then(function (response) {
                console.log(response);
            })
            .catch((error )=>{
                console.log("There's an error");
            })
        setTimeout(() => {
            this.setState({redirect: true});
        }, 1000);
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: '/home',
            }} />;
        }
        return (
            <div className="noteBackground">
                <Card style={{width: '50rem', padding: '50px 50px 10px 50px'}} >
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group style={{textAlign: 'left'}}>
                            <Form.Label>标题</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                onChange={this.handleInputChange}
                                name="noteTitle"/>
                        </Form.Group>
                        <Form.Group  style={{textAlign: 'left'}}>
                            <Form.Label>收信人</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                onChange={this.handleInputChange}
                                name="receiver"
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1" style={{textAlign: 'left'}}>
                            <Form.Label>内容</Form.Label>
                            <Form.Control
                                required
                                as="textarea"
                                rows={17}
                                onChange={this.handleInputChange}
                                name="noteContent"
                            />

                        </Form.Group>
                        <img src = {planet} type="submit" alt = "planet" onClick={this.handleSubmit} className="planet"/>
                    </Form>
                </Card>

            </div>
        );
    }
}

export default CreateNote;