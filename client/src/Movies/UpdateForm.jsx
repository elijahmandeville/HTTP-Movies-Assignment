import React, { useState, useEffect } from "react";
import CustomForm from "../CustomForm";
import axios from "axios";

function UpdateForm(props) {
  const submit = e => {
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(res.data);
        // props.updateMovies([]);
        // props.history.push("/");
        props.getMovies();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const { handleChange, handleSubmit, values } = CustomForm(submit);

  const [movie, setMovie] = useState(values);

  useEffect(() => {
    const movieToUpdate = props.movies.find(movie => {
      return `${movie.id}` === props.match.params.id;
    });
    if (movieToUpdate) {
      setMovie(movieToUpdate);
    }
  }, [props.movies, props.match.params.id]);

  const handleChanges = e => {
    e.persist();
    handleChange(e);
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={movie.title}
          placeholder="Title"
          onChange={handleChanges}
        />
        <input
          type="number"
          name="metascore"
          value={movie.metascore}
          placeholder="Metascore"
          onChange={handleChanges}
        />
        <input
          type="text"
          name="stars"
          value={movie.stars}
          placeholder="Stars"
          onChange={handleChanges}
        />
        <input
          type="text"
          name="director"
          value={movie.director}
          placeholder="Director"
          onChange={handleChanges}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UpdateForm;
