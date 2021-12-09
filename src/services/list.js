export function getList() {
    return fetch('https://crudcrud.com/api/837441b5dda94ff690c89c49696b0dc7/movies')
        .then(data => data.json())
}

// export function setMovie(movieId) {
//     list.map((movie)=> {
//         if(movieId===list["_id"]){
//             movie["booked-tickets"] = movie["booked-tickets"] + bookedTickets
//             console.log("hello")
//             let data = {
//                 "Movie Name": movie["name"],
//                 "ID": movie["_id"],
//                 "Total tickets": movie["total-tickets"],
//                 "Booked": movie["booked-tickets"]
//             }
//             return fetch(`https://crudcrud.com/api/524c31d999b54dd1b2cc04da23992d4f/movies/${movieId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ data })
//             })
//                 .then(data => {
//                     data.json()
//                     console.log(data)})
//         }
//     })
// }