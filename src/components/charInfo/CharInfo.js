import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import { useState, useEffect } from 'react';
import useMarvelService from '../services/MarvelService';
import Spinner from '../Loading/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import Skeleton from "../skeleton/Skeleton"
import PropTypes from 'prop-types';

const CharInfo=(props)=>{
    const [char,setChar] = useState(null);
    

    

    const {loading,error,clearError,getCharacter} =  useMarvelService();

    useEffect(()=>{
        updateChar();
    },[props.charId])

    const updateChar=()=>{
        clearError();

        const {charId} = props;
        if(!charId){
            return; 
        }

        getCharacter(charId).then(onCharLoaded)


        
        


    }
    
    const onCharLoaded=(char)=>{
        setChar(char);
        };

    


    

    
        

    const skeleton =char  || loading  ||  error ? null:<Skeleton/>
    const errorMessage = error?<ErrorMessage/>:null;
    const    spinner = loading?<Spinner/>:null;
    const content = !(loading||error|| !char)?<View char={char}/>:null;

        return(
                <div className="char__info">
                    {skeleton}
                    {errorMessage}
                    {spinner}
                    {content}
                </div>
                )

 }
const View = ({char})=>{
    const {homepage,name,description,thumbnail,comics,wiki} = char;
    let styleThumbnail = {objectFit : 'cover'} ;
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            styleThumbnail = {objectFit : 'contain'};
        }

    return (
        <><div className="char__basics">
            <img src={thumbnail} style={styleThumbnail} alt="abyss" />
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">Homepage</div> 
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div><div className="char__descr">
                {description}
            </div><div className="char__comics">Comics:</div><ul className="char__comics-list"> 
                
                {comics.length > 0 ? null:'There is no comics for this hero.'}
                {comics.map((item,i) => {
                    if (i>9) return;
                    return(
                         <li key = {i} className="char__comics-item">
                                     {item.name}
                        </li>
                    )}  
                    )}
            </ul>
            </>
        
    )

}


CharInfo.propTypes = {
    CharInfo:PropTypes.string

}  
export default CharInfo;