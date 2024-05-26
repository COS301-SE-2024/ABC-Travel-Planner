import React from 'react';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';

const SplashPage = () => {
    return (
        <div style={styles.container}>
            <div style={styles.overlay}>
                <h1 style={styles.heading}>Welcome to ABC Travel Planner</h1>
                
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <form style={styles.form}>
                                <h1 style={styles.headers}>Login </h1>
                                <div className="mb-3">
                                    <label htmlFor="loginEmail" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="loginEmail" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="loginPassword" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="loginPassword" />
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div style={styles.cardsContainer}>
                    <div className="card" style={styles.card}>
                        <Image src="/images/Mountains.jpg" className="card-img-top" alt="Travel 1" width={300} height={200} />
                        <div className="card-body">
                            <h5 className="card-title">Explore the Mountains</h5>
                        </div>
                    </div>
                    <div className="card" style={styles.card}>
                        <Image src="/images/BrazilBeach.jpg" className="card-img-top" alt="Travel 2" width={300} height={200} />
                        <div className="card-body">
                            <h5 className="card-title">Discover the Beaches</h5>
                        </div>
                    </div>
                    <div className="card" style={styles.card}>
                        <Image src="/images/Forest.jpg" className="card-img-top" alt="Travel 3" width={300} height={200} />
                        <div className="card-body">
                            <h5 className="card-title">Adventure in the Forests</h5>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <form style={styles.form}>
                            <h1 style={styles.headers}>Register  </h1>
                                <div className="mb-3">
                                    <label htmlFor="registerName" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="registerName" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="registerSurname" className="form-label">Surname</label>
                                    <input type="text" className="form-control" id="registerSurname" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="registerEmail" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="registerEmail" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="registerPassword" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="registerPassword" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="registerConfirmPassword" className="form-label">Confirm Password</label>
                                    <input type="password" className="form-control" id="registerConfirmPassword" />
                                </div>
                                <button type="submit" className="btn btn-primary">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: 'url("/images/Background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: '20px', // Add padding to the top
        overflowY: 'auto',  // Enable vertical scrolling
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center',
        width: '80%',
    },
    heading: {
        color: 'white',
        fontSize: '48px',
        marginBottom: '20px',
        marginTop: '0', // Ensure margin-top is not pushing the heading out of view
    },
    form: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        margin: '20px 0',
    },
    cardsContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        margin: '20px 0',
    },
    card: {
        width: '18rem',
    },
    headers:{
        textAlign: 'center',
        marginBottom: '20px',
        
    }
};

export default SplashPage;
