import React from 'react';

// Routing
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

// const Star = () => React.createElement('div', null, 'This is a little star')

// const App = () => {
//   return Star();
// }

// Components
import Header from './components/Header';
import Home from './components/Home';
import Movie from './components/Movie';
import NotFound from './components/NotFound';
import Login from './components/Login';

// Context
import userProvider from './context';

// Styles
import { GlobalStyle } from './GlobalStyles';

const App = () => (
    // <div className="App">
    //   <Header />
    //   {/* Start here. */}
    //   <Home />
    //   <GlobalStyle/>
    // </div>

    // <Router>
    //   <Header />
    //   <Routes>
    //     <Route path='/' element={<Home/>} />
    //     <Route path='/:movieId' element={<Movie/>} />
    //     <Route path='/*' element={<NotFound/>} />
    //   </Routes>
    //   {/* Start here. */}
    //   {/* <Home /> */}
    //   <GlobalStyle/>
    // </Router>

    <Router>
      <userProvider>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/:movieId' element={<Movie/>} />
        <Route path='/*' element={<NotFound/>} />
      </Routes>
      {/* Start here. */}
      {/* <Home /> */}
      <GlobalStyle/>
      </userProvider>
    </Router>
)


export default App;
