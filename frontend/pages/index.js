import Head from 'next/head'
import Layout from '../layout/layout'
import Link from 'next/link'
import styles from '../styles/Form.module.css'
import Image from 'next/image'
import { useState } from 'react';
import {SiGmail} from "react-icons/si"
import {BsShieldLockFill} from "react-icons/bs";
import { signIn } from "next-auth/react"

export default function Login(){
    const [show, setShow] = useState(false)

    // async function handleGoogleSignin(){
    //     signIn('google', { callbackUrl : "http://localhost:3000"})
    // }

    return (
        <Layout>

        <Head>
            <title>Login</title>
        </Head>
        
        <section className='w-3/4 mx-auto flex flex-col gap-5'>
            <div className="title">
                <h1 className='text-gray-800 text-3xl font-bold py-4'>Sign In</h1>
            </div>

            {/* form */}
            <form className='flex flex-col gap-3'>
                <div className={styles.input_group}>
                    <input 
                    type="email"
                    name='email'
                    placeholder='Email'
                    className={styles.input_text}
                    color='#b91c1c'
                    />
                    <span className='icon flex items-center px-4'>
                        <SiGmail size={20} />
                    </span>
                </div>
                <div className={styles.input_group}>
                    <input 
                    type={`${show ? "text" : "password"}`}
                    name='password'
                    placeholder='Password'
                    className={styles.input_text}
                    />
                     <span className='icon flex items-center px-4' onClick={() => setShow(!show)}>
                        <BsShieldLockFill size={20} />
                    </span>
                </div>

                {/* login buttons */}
                <div className={styles.button}>
                    <button type='submit'>
                        Sign In
                    </button>
                </div>
                <div className="input-button">
                {/* onClick={handleGoogleSignin} */}
                    <button type='submit' className={styles.button_custom} >
                    <Image src={'/assets/google_logo.svg'} width="20" height="20"></Image>Sign In with Google
                    </button>
                </div>
                <div className="input-button">
                    <button type='submit' className={styles.button_custom}>
                        <Image src={'/assets/github_logo.svg'} width="20" height="20"></Image>Sign In with GitHub
                    </button>
                </div>
            </form>

            {/* bottom */}
            <p className='text-center text-gray-400 '>
                Don't have an account? <Link href={'/register'} legacyBehavior><a className='text-blue-700'>Sign Up</a></Link>
            </p>
        </section>

        </Layout>
    )
}