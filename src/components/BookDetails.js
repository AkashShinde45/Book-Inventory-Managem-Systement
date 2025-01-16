import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppContext } from "../Context/context";

function BookDetails() {
    const { id } = useParams();
    const { books } = useAppContext();  
    const [book, setBook] = useState(null);
    
    useEffect(() => {
        
        const localBook = books.find((b) => b.id.toString() === id);
        
        if (localBook) {
            setBook(localBook);
        } else {
           
            fetch(`https://example-data.draftbit.com/books/${id}`)
                .then((res) => res.json())
                .then((data) => setBook(data))
                .catch((err) => console.log(err));
        }
    }, [id, books]);

    if (!book) return <h2>Loading...</h2>;

    return (
        <div className="item-details page">
            <img className="detail-img" src={book.image_url } alt="Book Cover" />
            <h2><b>Title : </b>{book.title || "Unknown Title"}</h2>
            <h3><b>Author : </b>{book.authors || book.author || "Unknown Author"}</h3>
            <h4><b>Genres : </b>{book.genres || "N/A"}</h4>
            <h4><b>Ratings : </b>{book.rating || book.average_rating || "N/A"}</h4>
            <p className="specs"><b>Description :  </b>{book.description || "No description available."}</p>
        </div>
    );
}

export default BookDetails;
