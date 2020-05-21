import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../Movies/MovieList';

const initalMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateMovieForm = ({ movieList, setMovieList }) => {
    const { push } = useHistory();
    const [movie, setMovie] = useState(initalMovie);
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                console.log(res);
                setMovie(res.data)
            })
            .catch(err => console.log(err))
    }, [id]);

    const onInputChange = e => {
        e.persist();
        const name = e.target.name;
        const value = e.target.value;

        setMovie({
            ...movie,
            [name]: value
        });
    };

    const onSubmit = e => {
        e.preventDefault();

        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                console.log(res);

                // movieList.map(movie => {
                //     if (movie.id === id) {
                //         set
                //     }
                // })
                setMovieList([...movieList, res.data]);
                push('/');
            })
            .catch(err => console.log(err))

        // const updatedMovie = {
        //     id: ,
        //     name: this.state.formValues.name,
        //     age: this.state.formValues.age,
        //     email: this.state.formValues.email
        // }

        // this.postFriend(newFriend);
        // this.setState({
        //     formValues: initalFormValues
        // })
    };

    return (
        <form className='form'>
            <h1>Update Movie Form</h1>

            {/* TEXT INPUTS */}
            <label>Title:&nbsp;&nbsp;&nbsp;
                <input
                    value={movie.title}
                    onChange={onInputChange}
                    name='title'
                    type='text'
                >
                </input>
            </label>
            <label>Director:&nbsp;&nbsp;&nbsp;
                <input
                    value={movie.director}
                    onChange={onInputChange}
                    name='director'
                    type='text'
                >
                </input>
            </label>
            <label>Metascore:&nbsp;&nbsp;&nbsp;
                <input
                    value={movie.metascore}
                    onChange={onInputChange}
                    name='metascore'
                    type='number'
                >
                </input>
            </label>
            <label>Stars:&nbsp;&nbsp;&nbsp;
                <input
                    value={movie.stars}
                    onChange={onInputChange}
                    name='stars'
                    type='text'
                >
                </input>
            </label>
            <button onClick={onSubmit}>SUBMIT</button>
        </form>
    );
};

export default UpdateMovieForm;