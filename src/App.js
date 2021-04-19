import "./App.css";
import Movies from "./components/movies";
import NavBar from "./components/NavBar";
import { Route, Redirect, Switch } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import Register from "./components/common/registerForm";

function App() {
   return (
      <>
         <NavBar />
         <main className='container'>
            <Switch>
               <Route path='/login' component={LoginForm} />
               <Route path='/register' component={Register} />
               <Route path='/movies/:id' component={MovieForm} />
               <Route path='/movies' component={Movies}></Route>
               <Route path='/customers' component={Customers} />
               <Route path='/rentals' component={Rentals} />
               <Route path='/not-found' component={NotFound} />
               <Redirect from='/' exact to='/movies' />
               <Redirect to='not-found' />
            </Switch>
         </main>
      </>
   );
}

export default App;
