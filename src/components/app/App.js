import AppHeader from "../appHeader/AppHeader";
import { lazy,Suspense } from "react";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Spinner from "../Loading/spinner";

const Page404 = lazy(()=>import("../pages/404"));
const MainPage = lazy(()=>import("../pages/MainPage"));
const Comics = lazy(()=>import("../pages/Comics"));
const SingleComicPage = lazy(()=>import("../pages/singleComic"))


const App =()=>{
    
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback = {<Spinner/>}>
                        <Routes>
                            <Route path = "/" element = {<MainPage/>}/>
                            <Route path = 'comics' element ={<Comics/>}/>   
                            <Route path = 'comics/:comicId' element ={<SingleComicPage/>}/>  
                            <Route path = '*' element = {<Page404/>}/>
                        </Routes>
                    </Suspense>
                
                
                </main>
            </div>
        </Router>
    )
}

export default App;