import './App.css';
import React from 'react';


function ListItems(props) {
  let items = props.data;
  return (
    <ul>
      {items.map(item => (
        <li key={item.title}>{item.title} - {item.text}</li>
      ))}
    </ul>
  );
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: null,
      time: null,
    };
    this.apiUrl = "http://yt-win.westeurope.cloudapp.azure.com:8000/api/items"
    //this.apiUrl = "http://127.0.0.1:8000/api/items"
    //this.apiUrl = "http://10.0.4.42:8000/api/items"
  }

  componentDidMount() {
    fetch(this.apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.data,
            time: result.time,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    this.interval = setInterval(() => {
      fetch(this.apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.data,
            time: result.time,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )},
    15000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { error, isLoaded, items, time } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <h1>The time is: {time}</h1>
            <ListItems data={items}/>
          </header>
        </div>
      )
    };
  }
}

export default App;

