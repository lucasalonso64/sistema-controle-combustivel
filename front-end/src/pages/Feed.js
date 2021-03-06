import React, { Component } from 'react';
import api from '../services/api';
import io from 'socket.io-client';

import './Feed.css'

import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';


class Feed extends Component {
    state = {
        feed: [],
    };
    async componentDidMount() {
        this.registerToSocket();

        const response = await api.get('posts');

        this.setState({ feed: response.data });
    }

    registerToSocket = () => {
        const socket = io('http://localhost:3333');

        // post, 
        socket.on('post', newPost => {
            this.setState({ feed: [newPost, ...this.state.feed]  })
        })
        // socket.on('like', likePost => {
        //     this.setState({
        //         feed: this.state.feed.map(post => 
        //             post._id == likePost._id ? likePost : post)

        //     })
        // })
    }

    handleLike = id => {
        api.post(`/posts/${id}/like`);
    }


    render() {
        return (
            <section id="post-list">
                {this.state.feed.map(post => (
                    <article key={post._id}>
                        <header>
                            <div className="user-info">
                                <span className="place">KM ABASTECIMENTO: {post.kmabastecimento}</span>
                                <span className="place"> KM ATUAL: {post.kmatual}</span>
                                <span className="place"> QUANTIDADE: {post.kmatual}</span>
                                <span className="place"> VALOR LITRO: {post.valorlitro}</span>
                                <span className="place"> DATA ABASTECIMENTO: {post.createdAt}</span>
                                <span className="place"> KM RODADO: {post.kmrodado} KM</span>
                            </div>                           
                        </header>                   

                        <footer>
                            <button type="submit">Atualizar </button>      
                                        
                        </footer>




                    </article>
                ))}
            </section>
        );
    }
}

export default Feed;