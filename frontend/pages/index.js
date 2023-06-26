import Head from 'next/head'
import clientPromise from '../lib/mongodb'

export default function Home() {
    return (
      <div>
        <h1>Registration</h1>
        <form action="/api/register" method="post">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
   
        <label htmlFor="password">Password</label>
        <input type="text" id="password" name="password" required />
   
        <button type="submit">Register</button>
        </form>

        <h1>Login</h1>
        <form action="/api/login" method="post">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required />
   
        <label htmlFor="password">Password</label>
        <input type="text" id="password" name="password" required />
   
        <button type="submit">Login</button>
        </form>
      </div>
    );
  }
