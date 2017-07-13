// ----------------------------
// import dependencies
// ----------------------------
import React, { Component } from 'react';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';

// ----------------------------
// Static Bars
// ----------------------------
import Header from './layout/Header';
// import Footer from './layout/Footer';

class Main extends Component {
	    constructor(props) {
        super(props);
    }

    // imageChoice() {
    //     if (    )
    // }

    generateImage () {
        return this.props.data.map( (board) => {
            return (
               <div className="full-board col-sm-3" key={board.boardTitle}>
                    <div className="board item card">
                        <a className="title-name">
                            <figure className="board-img img-boxart">
                                <img className="img-art" src={board.img} alt={board.contentDescription} title={board.contentDescription}/>
                            </figure>
                            <div className="board-body-text"> 
                                <h3 className="board-title">{board.boardTitle}</h3>
                                <p className="board-info">{board.category}</p>
                                <br />
                                <a href={board.contentUrl} className="board-username left">{board.username}</a>

                            </div>
                        </a>
                    </div>
                </div>                 
            )
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        { /* This is what actually generates the images */ }
                        { this.generateImage() }
                    </div>
                </div>
            </div>
        );
    }
};

export default Main;