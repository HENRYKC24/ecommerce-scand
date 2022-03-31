import { PureComponent } from 'react';
import Header from './components/Header';
// import Category from './pages/Category';
// import Detail from './pages/Details';
import Cart from './pages/Cart';
import './App.css';

class App extends PureComponent {
  render() {
    return (
      <div>
        <Header />
        <Cart />

      </div>
    );
  }
}

export default App;
