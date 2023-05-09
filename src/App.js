/* eslint-disable no-unused-expressions */
// import logo from './logo.svg';
import './App.css';
import { DataStore } from '@aws-amplify/datastore';
import { User } from './models';

function App() {
  const createUser = async () => {
    const post = {
      name: window.prompt('Name'),
      email: window.prompt('Email'),
      address: window.prompt('Address'),
      // createdAt: Date.toISO(),
      // updatedAt: Date.toISO(),
    }
   const createUser =  await DataStore.save(
      new User(post)
  );
  console.log('Create a new user:>> ', createUser);
  }

  const updateUser = async () => {
    const user=await queryUsers();
   const updateUser = await DataStore.save(User.copyOf(
    user, item => {
     item.email=window.prompt('Enter email');
  }));
  console.log('Updated User:>> ', updateUser);
  }

  const queryUsers = async () => {
    const userId=window.prompt('Enter the email');
    const models = await DataStore.query(User);
    const user=models.find(x=>x.email===userId);
    console.log("User: ",user);
    return user;
  }

  const deleteUser = async () => {
    const modelToDelete = await DataStore.query(User, window.prompt('Enter the Id'));
    const deletedUser = await DataStore.delete(modelToDelete);
    console.log('Delete User :>> ', deletedUser);
  }

  return (
    <div className="App">
        <h1>Hello World!</h1>
      <button onClick={createUser}>Create User</button><br></br>
      <button onClick={updateUser}>Update User</button><br></br>
      <button onClick={queryUsers}>Query User</button><br></br>
      <button onClick={deleteUser}>Delete User</button><br></br>
    </div>
  );
}

export default App;
