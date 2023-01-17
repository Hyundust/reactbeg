import { useState } from "react";
import ErrorBoundary from "../errorBoundary/boundary";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";



const Comics=()=>{

    const [selectedChar,setChar]  = useState(null)

    const onCharSelected=(id)=>{
       setChar(id);
    }


    return(

            <>
            <ErrorBoundary>
                <AppBanner />
            </ErrorBoundary>
            <ErrorBoundary>
                <ComicsList />
            </ErrorBoundary>
            
            </>
    )

    }
export default Comics;