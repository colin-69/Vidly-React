import React, { Component } from "react";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox";

class Movies extends Component {
   state = {
      movies: [],
      pageSize: 4,
      currentPage: 1,
      genres: [],
      selectedGenre: null,
      searchQuery: "",
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
      this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
   };

   handelSort = (sortColumn) => {
      this.setState({ sortColumn });
   };

   handelSearch = (query) => {
      this.setState({
         searchQuery: query,
         selectedGenre: null,
         currentPage: 1,
      });
   };

   getPageData = () => {
      const {
         pageSize,
         currentPage,
         sortColumn,
         searchQuery,
         selectedGenre,
         movies: allMovies,
      } = this.state;

      let filtered = allMovies;
      if (searchQuery)
         filtered = allMovies.filter((m) =>
            m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
         );
      else if (selectedGenre && selectedGenre._id)
         filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

      const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

      const movies = paginate(sorted, currentPage, pageSize);

      return { totalCount: filtered.length, data: movies };
   };

   render() {
      const { length: count } = this.state.movies;
      const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

      if (count === 0) return <p>There are no movies in the database</p>;

      const { totalCount, data: movies } = this.getPageData();

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
               <Link to='/movies/new' className='btn btn-primary m-2'>
                  New Movie
               </Link>
               <p>Showing {totalCount} movies in the database</p>
               <SearchBox value={searchQuery} onChange={this.handelSearch} />
               <MoviesTable
                  sortColumn={sortColumn}
                  movies={movies}
                  onDelete={this.handelDelete}
                  onSort={this.handelSort}
               />
               <Pagination
                  itemsCount={totalCount}
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
