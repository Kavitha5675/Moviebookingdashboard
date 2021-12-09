import './App.css';
import React, {useEffect, useState} from "react";
import {getList} from "./services/list";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import './MovieBooking/styles.css'

function App() {
    const [list, setList] = useState([]);
    const [movieId, setMovieId] = useState('')
    const [bookedTickets, setBookedTickets] = useState('')
    const [error, setErrorMessage] = useState('')

    useEffect(() => {
        getList()
            .then(movies => {
                console.log(movies)
                setList(movies)
            })
    }, [])

    const handleSubmit = () => {
        let data;
        console.log(list)
        console.log(movieId)
        // eslint-disable-next-line array-callback-return
        list.map((movie) => {
            console.log(movieId)
            if (movieId === movie["_id"]) {
                movie["booked-tickets"] = parseInt(movie["booked-tickets"],10) + parseInt(bookedTickets,10)
                console.log("hello")
                data = {
                    "name": movie.name,
                    "_id": movie["_id"],
                    "total-tickets": movie["total-tickets"],
                    "booked-tickets": movie["booked-tickets"]
                }
                const requestOptions={
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Access-Control-Allow-Origin': 'https://crudcrud.com/api/e1f51c4b46bc46a08b2b729cce24b885/movies',
                        'Access-Control-Allow-Headers':'Content-Type',
                        'Access-Control-Allow-Methods': 'GET, POST, PUT'
                    },
                    body: JSON.stringify(data)
                }
                fetch(`https://crudcrud.com/api/e1f51c4b46bc46a08b2b729cce24b885/movies/${movieId}`,requestOptions)
                    .then(async response => {
                        const responseData = await response.json()
                        if (!response.ok) {
                            const error = (responseData && responseData.message) || response.status;
                            return Promise.reject(error)
                        }
                        setList(data)
                    }).catch(error => {
                    setErrorMessage(error);
                    console.log("There is an error", error)
                })
            }
        })

    };
    // https://crudcrud.com/api/837441b5dda94ff690c89c49696b0dc7/movies
    return (
        <div  style={{marginLeft: "20px"}}>

                <h3>
                    Booking dashboard
                </h3>

            <div>
                <label style={{marginLeft: "30px"}}>
                    <p>movie Id</p>
                </label>
                <input type="text" onChange={event => setMovieId(event.target.value)} value={movieId}/>
                <label style={{marginLeft: "30px"}}>
                    <p>total number of tickets to be booked</p>
                </label>
                <input type="text" onChange={event => setBookedTickets(event.target.value)} value={bookedTickets}/>
                <button style={{marginLeft: "20px"}} onClick={handleSubmit}>BOOK</button>
                <TableContainer style={{width: "100", height: "100", margin: "10px"}}>
                    <Table aria-label="simple table" id="table">
                        <TableHead>
                            <TableRow>
                                <TableCell id="name" align="center">Movie Name</TableCell>
                                <TableCell id="id" align="center">ID</TableCell>
                                <TableCell id="total-tickets" align="center">Total tickets</TableCell>
                                <TableCell id="booked-tickets" align="center">Booked</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {list.map((movies, i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell align="center">{movies.name}</TableCell>
                                        <TableCell align="center">{movies["_id"]}</TableCell>
                                        <TableCell
                                            align="center">{movies["total-tickets"]}</TableCell>
                                        <TableCell
                                            align="center">{movies["booked-tickets"]}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>

                </TableContainer>
            </div>
        </div>
    );
}

export default App;
