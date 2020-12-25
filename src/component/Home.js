import React, {Component} from 'react';
import { Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import words from "../image/picture.png"
import letter from "../image/letter.gif"
import dreamMachine from "../image/dreamMachine.PNG"
import dreamBtn from "../image/magicBtn.gif"
import SignInBtn from "../image/SignInBtn.gif"
import notes from "../image/notes.PNG"
import {Grid, Row, Col} from 'react-flexbox-grid';
import "../css/HomePage.css"
import axios from 'axios';
import moment from 'moment';


class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            image: true,
            imageSrc: dreamMachine,
            showPopBtn: false,
            modalShow: false,
            posts: [],
            postShown: {},
            user:'',
            moment:''
        }
    }


    buttonClicked = () => {
        // console.log(this.state.moment);
        const tempMoment = localStorage.getItem('moment');
        console.log(tempMoment);

        let minus = moment().diff(tempMoment, 'minute')
        if(minus >= 1440 || tempMoment === null){
            let now = moment().format("llll");
            localStorage.setItem('moment', now);
            this.setState({moment: now});
            if (this.state.image === true && this.state.showPopBtn === false) {
                this.setState({
                    imageSrc: dreamBtn,
                    image: false
                });
                this.setState(() => {
                    setTimeout(() => {
                        this.setState({showPopBtn: true});
                    }, 5700);
                });
            }
            else if( this.state.showPopBtn === true) {
                this.setState({
                    imageSrc: dreamBtn,
                    image: false
                });
            }
        }
        else{
            alert("还没有到可以看的时间哦")
        }



    }

    deletePost(id) {
        console.log("here for delete")
        axios.delete('https://tochenbackend.herokuapp.com/posts/' + id)
            .then(res => console.log(res.data));
    }

    componentDidMount() {
        const user = localStorage.getItem('user');
        this.setState({ user: user });
    }


    handleModal = () => {
        // const user = window.user;
        this.setState({
            modalShow: !this.state.modalShow,
        });
        console.log(this.state.user);
        axios.get('https://tochenbackend.herokuapp.com/posts/'+ this.state.user)
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({posts: response.data})
                    const lala = this.state.posts;
                    let num = Math.floor(Math.random() * Math.floor(lala.length));
                    let temp = lala[num];
                    this.setState({postShown: temp})

                } else {
                    let temp = {title: '已经看完啦', description: "以后再一起创造新的故事吧"};
                    this.setState({postShown: temp});
                }
            })
            .catch((error) => {
                console.log("There's an error");
            })
    }

    closeModal = () => {
        this.setState({
            modalShow: !this.state.modalShow,
            showPopBtn: false,
            imageSrc: dreamMachine,
            image: true
        });
        if (this.state.postShown.title !== "已经看完啦") {
            this.deletePost(this.state.postShown._id);
        }
    }


    render() {
        const {showPopBtn} = this.state;

        return (
            <Grid fluid className="homeBody">
                <Row >

                    <Col xs={1} className="firstCol">
                        <Link to={{
                            pathname: '/CreateNote',
                        }}>
                            <img src={letter} alt="letter" className="letter"/>
                        </Link>
                        <Link to={{
                            pathname: '/star',
                        }}>
                            <img src={SignInBtn} alt="button" className="plane"/>
                        </Link>
                    </Col>

                    <Col xs={5}>
                        <img
                            src={words}
                            alt="Logo"
                            className="midImage"
                        />
                    </Col>
                    <Col xs={1}>
                        {showPopBtn &&
                        <img src={notes} alt="letter" className="note" onClick={this.handleModal}/>
                        }
                    </Col>

                    <Col xs={1}>
                        <img
                            id="app"
                            src={this.state.imageSrc}
                            alt="Logo"
                            className="dreamMachine"
                            onClick={this.buttonClicked}
                        />
                    </Col>
                </Row>

                <Modal
                    show={this.state.modalShow}
                    onHide={this.closeModal}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className="my-modal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.postShown.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <text>{this.state.postShown.description}</text>
                    </Modal.Body>
                </Modal>
            </Grid>
        );
    }
}

export default Home;