


import '../App.css';
import { useAppContext } from '../Context/context';
import {useNavigate} from 'react-router-dom';

function Favourite(){

    const navigate=useNavigate();

      const {favourite,addToFav,removeToFav}=useAppContext();
    
        const check=(id)=>{
            const boolean=favourite.some((book)=>book.id===id);
            return boolean;
        }

    return(
        <>
       <div className='favourite-list'>
       {favourite.length>0 ?favourite.map((book,index)=>(
            <div key={book.id} className='book'>
                <div><h3>{book.title}</h3></div>
                <div><img className='img' src={book.image_url} alt='#'/></div>
                <div><button onClick={()=>navigate(`/books/${book.id}`)}>View Details</button></div>
                {check(book.id)?(<div><button onClick={()=>removeToFav(book.id)}>Remove from Favourite</button></div>):(
                <div><button onClick={()=>addToFav(book)}>Add from Favourite</button></div>
                
            
           ) }
                
            </div>
           )):<h1>Don't Have Any Favourite Book Yet!</h1>}
       </div>
        </>
    )
}
export default Favourite;