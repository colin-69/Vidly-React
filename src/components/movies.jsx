import React, { Component } from "react";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
   state = {
      movies: [],
      pageSize: 4,
      currentPage: 1,
      genres: [],
      sortColumn: { path: "title", order: "asc" },
   };

   componentDidMount() {
      const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
      this.setState({ movies: getMovies(), genres });
   }

   handelDelete = (movie) => {
      const movies = this.state.movies.filter((m) => m._id !== movie._id);
      this.setState({ movies });
   };

   handelPageChange = (page) => {
      this.setState({ currentPage: page });
   };

   handelGenreSelect = (genre) => {
      this.setState({ selectedGenre: genre, currentPage: 1 });
   };

   handelSort = (sortColumn) => {
      this.setState({ sortColumn });
   };

   render() {
      const { length: count } = this.state.movies;
      const {
         pageSize,
         currentPage,
         sortColumn,
         selectedGenre,
         movies: allMovies,
      } = this.state;

      if (count === 0) return <p>There are no movies in the database</p>;
      const filtered =
         selectedGenre && selectedGenre._id
            ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
            : allMovies;

      const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

      const movies = paginate(sorted, currentPage, pageSize);

      return (
         <div className='row'>
            <div className='col-2'>
               <ListGroup
                  items={this.state.genres}
                  selectedItem={this.state.selectedGenre}
                  onSelect={this.handelGenreSelect}
               />
            </div>
            <div className='col'>
               <p>Showing {filtered.length} movies in the database</p>
               <MoviesTable
                  sortColumn={sortColumn}
                  movies={movies}
                  onDelete={this.handelDelete}
                  onSort={this.handelSort}
               />
               <Pagination
                  itemsCount={filtered.length}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={this.handelPageChange}
               />
            </div>
         </div>
      );
   }
}

export default Movies;
