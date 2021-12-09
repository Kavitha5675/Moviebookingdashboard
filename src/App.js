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
        list.map((movie, i) => {
            console.log(movieId)
            if (movieId === movie["_id"]) {
                movie["booked-tickets"] = movie["booked-tickets"] + bookedTickets
                console.log("hello")
                data = {
                    "name": movie.name,
                    "_id": movie["_id"],
                    "total-tickets": movie["total-tickets"],
                    "booked-tickets": movie["booked-tickets"]
                };
                console.log(data)
                fetch(`https://crudcrud.com/api/837441b5dda94ff690c89c49696b0dc7/movies/${movieId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    body: JSON.stringify(data)
                })
                    .then(async response => {
                        const data = await response.json()
                        if (!response.ok) {
                            const error = (data && data.message) || response.status;
                            return Promise.reject(error)
                        }
                        setMovieId(data._id);
                    }).catch(error => {
                    setErrorMessage(error);
                    console.log("There is an error", error)
                })
            }
        })

    };
    // https://crudcrud.com/api/837441b5dda94ff690c89c49696b0dc7/movies
    return (
        <div className={"wrapper"}>
            <div style={{marginLeft: "20px"}}>
                <h3>
                    Booking dashboard
                </h3>
            </div>
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
