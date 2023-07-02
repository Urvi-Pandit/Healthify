
import styles from '../styles/Layout.module.css';


export default function Layout( { children }){
    return (
        <div className="flex h-screen bg-teal-600">
            <div className="m-auto bg-slate-50 rounded-md w-3/5 h-5/8 grid lg:grid-cols-2">
                <div className={styles.imgStyle}>
                    <div className={styles.cartoonImg}></div>
                </div>
                <div className="right flex flex-col justify-evenly">
                    <div className="text-center py-10">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}