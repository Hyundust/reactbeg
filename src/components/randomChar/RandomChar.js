import { Component} from "react";
import './randomChar.scss';
import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../services/MarvelService'
import Spinner from "../Loading/spinner";
import ErrorMessage from "../errorMessage/errorMessage";

class RandomChar extends Component{
    
    state = {
        char:{},
        loading: true,
        error: false
    }
    MarvelService = new MarvelService();

    componentDidMount(){
        this.updateMarvelChar();
       // this.timerId = setInterval(this.updateMarvelChar, 3000);
    }
    componentWillUnmount(){

        clearInterval(this.timerId);
    }
    onCharLoaded=(char)=>{
        this.setState({
            char,
            loading:false
        });


    }


    onError = (char)=>{
        this.setState({
            error:true,
            loading:false
        })
    }
    updateMarvelChar =  () => {
            const id = Math.floor(Math.random()*(1011400-1011000)+1011000);
            this.MarvelService.getCharacter(id).then(this.onCharLoaded).catch(this.onError);

    }
    render(){
        const {char,loading,error,} = this.state;
        const errorMessage = error?<ErrorMessage/>:null;
        const spinner = loading?<Spinner/>:null;
        const content = !(loading||error)?<View char={char}/>:null;
        

        
        return(
            
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}

                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.updateMarvelChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        );
    }
}

const View = ({char}) => {
        const {thumbnail,name,description,homepage,wiki} = char;
        let styleThumbnail = {objectFit : 'cover'} ;
        if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            styleThumbnail = {objectFit : 'contain'};
        }

        

        return (    
            <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img" style={styleThumbnail}/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {description}
                        </p>
                        <div className="randomchar__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">Homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Comics</div>
                            </a>
                        </div>
                    </div>
                </div>
        )

}
export default RandomChar;