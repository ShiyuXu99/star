import React, {Component} from 'react';
import {Card} from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import axios from 'axios';
import {Redirect} from "react-router-dom";
import "../css/signIn.css"
import SignInBtn from "../image/SignInBtn.gif"

window.user = "";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            password: null,
            userInformation:[],
            redirect:false
        }
    }


    handleSubmit = (event) => {
        event.preventDefault();

        axios.get('https://tochenbackend.herokuapp.com/user')
            .then(res => {
                // this.setState({
                //     userInformation: res.data
                // })
                let count = 0;
                for(let i = 0; i< res.data.length; i++){
                    if(this.state.user === res.data[i].username){
                        console.log(this.state.username);
                        if(this.state.password === res.data[i].password){
                            this.setState({redirect: true});
                            localStorage.setItem('user', this.state.user);
                        }
                        else{
                            alert("密码不对哦");
                        }
                        count = 1;
                    }
                }
                if(count === 0){
                    alert("用户不存在哦！");
                }
            })
            .catch((error) => {
                console.log("There's an error");
            })
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state.user)
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: '/home',
                state: { user: this.state.user }
            }} />;
        }
        return (
            <div className="background">
                <Card style={{ width: '30rem' ,padding:"30px"}}>
                    <h2 className="logIn">登陆</h2>
                    <Form >
                        <Form.Group style={{textAlign: 'left'}}>
                            <Form.Label >用户名</Form.Label>
                            <Form.Control type="text" name="user" onChange={this.handleInputChange} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" style={{textAlign: 'left'}}>
                            <Form.Label>密码</Form.Label>
                            <Form.Control type="password" name="password" onChange={this.handleInputChange}/>
                        </Form.Group>
                        <img src={SignInBtn}
                             alt = "plane"
                             className="SignInBtn"
                             onClick={this.handleSubmit} width="100px"/>

                    </Form>
                </Card>
            </div>
        );
    }
}

export default SignIn;