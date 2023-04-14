import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(error => console.log('Error fetching data: ', error))
  }, [])
  const handleAddUser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const newUserlist = [...user, data]
        setUser(newUserlist)
      })
      .catch(err => console.error(err))
    console.log(user)
    event.target.reset();

  }

  return (
    <div className="App">
      <form onSubmit={handleAddUser}>
        <input type='text' name="name"></input>
        <br />
        <input type='email' name="email"></input>
        <br />
        <button type='submit'>add User</button>
      </form>
      <h1><p>Number of User: </p>{user.length}</h1>
      <div>
        {
          user.map(usr =>
            <p key={usr.id}>
              User name:{usr.name}<br />
              User Email: {usr.email}
            </p>
          )
        }
      </div>
    </div>
  );
}

export default App;
