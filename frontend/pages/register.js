import Head from 'next/head'
import Layout from '../layout/layout'
import Link from 'next/link'
import styles from '../styles/Form.module.css';
import Image from 'next/image'
import { HiUser } from "react-icons/hi";
import {SiGmail} from "react-icons/si"
import {BsShieldLockFill} from "react-icons/bs";
import { useState } from 'react';

export default function Register(){

    const [show, setShow] = useState({ password: false, cpassword: false })

    return (
        <Layout>


        <Head>
            <title>Register</title>
        </Head>

        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                <h1 className='text-gray-800 text-4xl font-bold py-4'>Sign Up</h1>
               
            </div>

            {/* form */}
            <form className='flex flex-col gap-5'>
                <div className={styles.input_group}>
                    <input 
                    type="text"
                    name='Username'
                    placeholder='Username'
                    className={styles.input_text}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiUser size={20} />
                    </span>
                </div>
                <div className={styles.input_group}>
                    <input 
                    type="email"
                    name='email'
                    placeholder='Email'
                    className={styles.input_text}
                    />
                    <span className='icon flex items-center px-4'>
                        <SiGmail size={20} />
                    </span>
                </div>
                <div className={styles.input_group}>
                    <input 
                    type={`${show.password ? "text" : "password"}`}
                    name='password'
                    placeholder='Password'
                    className={styles.input_text}
                    />
                     <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, password: !show.password})}>
                        <BsShieldLockFill size={20} />
                    </span>
                </div>

                {/* <div className={styles.input_group}>
                    <input 
                    typnpme={`${show.cpassword ? "text" : "password"}`}
                    name='cpassword'
                    placeholder='Confirm Password'
                    className={styles.input_text}
                    />
                     <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, cpassword: !show.cpassword})}>
                        <BsShieldLockFill size={20} />
                    </span>
                </div> */}

                {/* login buttons */}
                <div className="input-button">
                    <button type='submit' className={styles.button}>
                        Sign Up
                    </button>
                </div>
            </form>

            {/* bottom */}
            <p className='text-center text-gray-400 '>
                Have an account? <Link href={'/'} legacyBehavior><a className='text-blue-700'>Sign In</a></Link>
            </p>
        </section>
        </Layout>
    )
}