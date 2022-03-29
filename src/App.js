import { PureComponent } from 'react';
import Header from './components/Header';
import './App.css';

class App extends PureComponent {
  render() {
    return (
      <div>
        <Header />
        <div>One of a kind</div>

      </div>
    );
  }
}

export default App;
