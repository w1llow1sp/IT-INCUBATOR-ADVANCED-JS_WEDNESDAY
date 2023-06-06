import React, { useState } from 'react';
import API from './API';
import './lesson_3';

type serachResultType = {

    Title: string
    Year: string
    imdbID: string
    Type: 'movie'| 'series'| 'episode'
    Poster: string

}


const Lesson3 = () => {
    const [searchName, setSearchName] = useState('');
    const [serachResult, setSerachResult] = useState<Array<serachResultType>>([]);
    const [searchNameByType, setSearchNameByType] = useState('');
    const [serachResultByType, setSerachResultByType] = useState('');


    const searchFilm = () => {
        API.searchFilmsByTitle(searchName)
            .then((data) => {
                setSerachResult(data.Search);
                console.log(data.Search)
            })
    };

    const searchByType = (e: React.MouseEvent<HTMLButtonElement>) => {
        const type: string = e.currentTarget.dataset.t ? e.currentTarget.dataset.t : '';
        API.searchFilmsByType(searchNameByType, type)
            .then((data)=>{
                setSerachResultByType(data.Search)
                console.log(data.Search)
            })
    }

    return (
        <div>
            <h1>Promises</h1>
            <div>
                <h3><p>Search by name:</p></h3>
                <input type="text" value={searchName} onChange={(e) => setSearchName(e.currentTarget.value)}/>
                <button onClick={searchFilm}>Search</button>
                <div className={'search_container'}>
                    {Array.isArray(serachResult) && serachResult.map((el) =>
                        (

                            <div key={el.imdbID} className={'search_card'}>
                                <h3 className={'search_header'}>Title: {el.Title}</h3>
                                <p className={'search_year'}>Year : {el.Year}</p>
                                <p className={'search_type'}>Type: {el.Type}</p>
                                <img src={el.Poster} className={'search_img'}/>
                            </div>

                        ))}
                </div>
            </div>

            <div>
                <h3><p>Search by type:</p></h3>
                <input type="text" value={searchNameByType} onChange={(e) => setSearchNameByType(e.currentTarget.value)}/>
                <button onClick={searchByType} data-t='movie'>Movie</button>
                <button onClick={searchByType} data-t='series'>Series</button>
                <div>
                    {Array.isArray(serachResultByType) && serachResultByType.map((el) =>
                        (

                            <div key={el.imdbID} className={'search_card'}>
                                <h3 className={'search_header'}>Title: {el.Title}</h3>
                                <p className={'search_year'}>Year : {el.Year}</p>
                                <p className={'search_type'}>Type: {el.Type}</p>
                                <img src={el.Poster} className={'search_img'}/>
                            </div>

                        ))}
                    {/*{serachResultByType}*/}
                </div>
            </div>
        </div>
    );
}
export default Lesson3;