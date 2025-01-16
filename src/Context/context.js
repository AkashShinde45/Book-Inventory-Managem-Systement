import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
};

const AppContextProvider = ({ children }) => {
    const [books, setBooks] = useState([]);  
    const [favourite, setFavourites] = useState([]); 

    useEffect(() => {
        fetch("https://example-data.draftbit.com/books?_limit=10")
            .then((res) => res.json())
            .then((data) => setBooks(data))
            .catch((err) => console.log(err));
    }, []);

   
    const addBook = (book) => {
        setBooks((prevBooks) => [{ ...book, id: Date.now() },...prevBooks ]);
    };

   
    const addToFav = (book) => {
        setFavourites((prevFav) => [...prevFav, book]);
    };

    const removeToFav = (id) => {
        setFavourites((prevFav) => prevFav.filter((book) => book.id !== id));
    };
    const updateBook = (updatedBook) => {
        setBooks((prevBooks) =>
            prevBooks.map((book) =>
                book.id === updatedBook.id ? updatedBook : book
            )
        );
    };

    const remove=(index)=>{
       setBooks(books.filter((item,index2)=>index2!=index));
    }

    return (
        <AppContext.Provider value={{ books,remove, addBook,favourite, addToFav,updateBook, removeToFav }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
