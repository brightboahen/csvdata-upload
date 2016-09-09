import React from 'react';
import { render } from 'react-dom';
import Hub from './views/hub';
import Dashboard from './views/dashboard';
import If from './helpers/if';
import './app.css';
import firebase from 'firebase';
import Floater from './helpers/floater';

/**
 * @name App
 * @constructor
 * Core of the application - instantiates firebase for database access and controls the main views (dashboard and hub)
 * We use firebase as the suitable data store to store data in this app because of the simplicity and security features
 * such as user authentication.
 * The assumption here is that since the application is internally facing - firebase can serve static files as well as
 * provide 5GB of database storage for free. The application could be used remotely, securely even as a prototype
 * *******
 * I chose firebase for this test purely because if for whatever reason node is not install on your local machine you
 * can view the source and see it in action on firebase
 * */

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {authUser: null, openModal:false, surveyData : [], filterEngaged : false};
        this.dataBag = '';
        this.filterBag = [];
    }
    componentWillMount(){
        const self = this;
        //Initialise firebase
        firebase.initializeApp({
            apiKey: "AIzaSyB83aTbxOttt5RwdXFR7ek5N-mDgLYEArE",
            authDomain: "lostmyname-d7fcd.firebaseapp.com",
            databaseURL: "https://lostmyname-d7fcd.firebaseio.com",
            storageBucket: "lostmyname-d7fcd.appspot.com"
        });
        firebase.auth().onAuthStateChanged( user => {
            if(user){
                self.setState({authUser : user});
                self.retrieveAllData();
            }
        });
    }
    loginButtonClicked(){
        const   self        =   this,
            emailInput  =   self.refs.loginId.value,
            pwordInput  =   self.refs.loginPwd.value;
        firebase.auth().signInWithEmailAndPassword(emailInput, pwordInput)
            .then(() => {
                self.setState({openModal : false});
                self.retrieveAllData();
            })
            .catch( (msg) => {
                console.error(msg)
            });
    }
    adminLoginButtonClicked(){
        const self = this;
        self.setState({openModal : true});
    }
    adminLogoutButtonClicked(){
        const self = this;
        firebase.auth().signOut()
            .then(() => {
                self.setState({authUser : null});
            });
    }
    /**
     * @name {storeDataToFirebase} accepts an array of data, iterates the data then pushes to firebase
     * @param {Array} data - processed CSV data submitted by user
     * */
    storeDataToFirebase(data){
        const dbReference = firebase.database().ref('/survey');
        data.forEach( item => {
            dbReference.push(item);
        });
    }
    /**
     * @name {retrieveAllData}
     * */
    retrieveAllData(){
        const   self        = this,
                tmpArray    = [],
                dbReference = firebase.database().ref('/survey');
        dbReference.once('value')
            .then((snapshot) => {
                snapshot.forEach( data => {
                    tmpArray.push(data.val());
                });
                self.dataBag = tmpArray;
                self.setState({surveyData:tmpArray});
            });
    }

    toggleFilters(){
        const self = this;
        let currentState = self.state.filterEngaged;
        self.setState({filterEngaged: !currentState});
    }

    filterFirebaseWithQuery(query){
        const   self        =   this,
                tmpArray    =   [],
                dbRef       =   firebase.database().ref('/survey');
        if(query.value.length >= 1){
            dbRef.orderByChild(query.key).equalTo(query.value).once('value', (data) => {
                data.forEach( (obj) => {
                    tmpArray.push(obj.val());
                    self.filterBag.push(obj.val());
                });
                //If we find no results lets put the old data bag into the application
                self.setState({surveyData: self.filterBag});
                if(tmpArray.length <= 0){
                    self.filterBag = [];
                }

            });
        }else{
            self.setState({surveyData:self.dataBag});
        }

    }

    render(){
        let self = this;
        return (
            <div>
                {/* Page Header Controls*/}
                <div className="toolbar">
                    <If condition={self.state.authUser !== null}>
                        <span className="button" onClick={self.adminLogoutButtonClicked.bind(self)}>
                            <span>Admin Logout</span>
                            <span className="logout"/>
                        </span>
                    </If>
                    <If condition={self.state.authUser === null}>
                        <span className="button" onClick={self.adminLoginButtonClicked.bind(self)}>
                            <span>Admin Login</span>
                            <span className="login"/>
                        </span>
                    </If>
                </div>
                <div ref="logModal" className={self.state.openModal === true ? "loginModal show ": "loginModal hide"}>
                    <div className="loginContainer">
                        <label htmlFor="loginId">Login Id</label>
                        <input ref="loginId" id="loginId" className="input-control" type="email"/>
                        <label htmlFor="pword">Password</label>
                        <input ref="loginPwd" className="input-control" type="password" id="pword"/>
                        <button className="login-button" onClick={self.loginButtonClicked.bind(self)}>Login</button>
                    </div>
                </div>
                {/*End of header controls*/}
                <If condition={self.state.authUser === null}>
                    <Hub/>
                </If>
                <If condition={self.state.authUser !== null}>
                    <div>
                        <Dashboard queryBack={self.filterFirebaseWithQuery.bind(this)} filter={self.state.filterEngaged} data={self.state.surveyData}/>
                        <Floater callBackFunc={self.storeDataToFirebase} filterCallBack={self.toggleFilters.bind(this)}/>
                    </div>
                </If>
            </div>
        )
    }
}

export default App;