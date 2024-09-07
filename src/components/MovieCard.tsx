import React from 'react';

interface MovieCardProps {
    movie: Movie;
    onRemove: (id: string) => void;
    onUpdate: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = (props) => {
    const { movie, onRemove, onUpdate } = props;
    return (
        <div className="flex flex-col gap-2 relative flex items-center font-montserrat w-[264px] h-[400px] bg-light-grey rounded-lg group">
            <button onClick={() => onRemove(movie._id)} className='group/delete z-10 absolute -top-4 -right-4 bg-darkest-grey rounded-full p-2 hover:bg-red-900 transition-all duration-300 opacity-0 group-hover:opacity-100'>
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.7164 2.75139L10.9989 5.46966L8.2814 2.75139C8.04342 2.51318 7.76084 2.32422 7.44983 2.19528C7.13881 2.06636 6.80544 2 6.46876 2C6.1321 2 5.79872 2.06636 5.4877 2.19528C5.17669 2.32422 4.89411 2.51318 4.65613 2.75139L3.75266 3.65724C3.5141 3.89505 3.3248 4.17763 3.19564 4.48876C3.06649 4.7999 3 5.13348 3 5.47037C3 5.80727 3.06649 6.14085 3.19564 6.45199C3.3248 6.76312 3.5141 7.0457 3.75266 7.28351L6.47019 10.0004L3.75266 12.718C3.5141 12.9557 3.3248 13.2383 3.19564 13.5494C3.06649 13.8606 3 14.1941 3 14.5311C3 14.868 3.06649 15.2015 3.19564 15.5127C3.3248 15.8238 3.5141 16.1064 3.75266 16.3442L4.65827 17.2487C4.89625 17.4868 5.17882 17.6758 5.48984 17.8048C5.80086 17.9337 6.13423 18 6.4709 18C6.80757 18 7.14094 17.9337 7.45196 17.8048C7.76298 17.6758 8.04555 17.4868 8.28353 17.2487L10.9989 14.5304L13.7164 17.2487C13.9544 17.4868 14.237 17.6758 14.548 17.8048C14.859 17.9337 15.1924 18 15.5291 18C15.8658 18 16.1991 17.9337 16.5102 17.8048C16.8211 17.6758 17.1037 17.4868 17.3417 17.2487L18.2473 16.3428C18.4859 16.105 18.6751 15.8224 18.8043 15.5112C18.9335 15.2001 19 14.8666 19 14.5297C19 14.1927 18.9335 13.8592 18.8043 13.548C18.6751 13.2369 18.4859 12.9543 18.2473 12.7165L15.5283 10.0004L18.2452 7.28137C18.4837 7.04357 18.673 6.76099 18.8022 6.44986C18.9313 6.13872 18.9979 5.80514 18.9979 5.46824C18.9979 5.13135 18.9313 4.79777 18.8022 4.48663C18.673 4.17549 18.4837 3.89292 18.2452 3.65511L17.3396 2.75139C16.859 2.27095 16.2074 2.00107 15.528 2.00107C14.8486 2.00107 14.197 2.27095 13.7164 2.75139Z" stroke="#A4A4A4" strokeWidth="1.5" strokeLinecap="round" className='group-hover/delete:stroke-red-500' strokeLinejoin="round" />
                </svg>
            </button>
            <span className="absolute -top-4 bg-white text-grey font-black px-2 py-1 rounded-full w-20 flex justify-center items-center">{movie.rating}</span>
            <img src={movie.poster} alt={movie.movieName} className="w-full h-full object-cover rounded-lg" />
            <span className="absolute h-full w-full bg-gradient-to-t from-black to-transparent rounded-lg" />
            <button onClick={() => onUpdate({ ...movie, watched: !movie.watched })} className='absolute left-0 group-hover:-left-8 scale-75 group-hover:scale-100 bottom-8 bg-darkest-grey rounded-full p-4 hover:bg-light-grey transition-all duration-300 opacity-0 group-hover:opacity-100'>
                {movie.watched ?
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M16.4226 4.75593C16.748 4.43049 16.748 3.90285 16.4226 3.57741C16.0972 3.25198 15.5695 3.25198 15.2441 3.57741L11.6933 7.12819C11.1971 6.83494 10.6182 6.66667 10 6.66667C8.15905 6.66667 6.66667 8.15905 6.66667 10C6.66667 10.6182 6.83494 11.1971 7.12818 11.6933L3.57741 15.2441C3.25197 15.5695 3.25197 16.0972 3.57741 16.4226C3.90285 16.748 4.43048 16.748 4.75592 16.4226L8.30669 12.8718C8.80292 13.1651 9.38183 13.3333 10 13.3333C11.8409 13.3333 13.3333 11.8409 13.3333 10C13.3333 9.38184 13.1651 8.80292 12.8718 8.30669L16.4226 4.75593ZM10.4317 8.38975C10.294 8.353 10.1493 8.33334 10 8.33334C9.0795 8.33334 8.33333 9.0795 8.33333 10C8.33333 10.1493 8.353 10.294 8.38975 10.4317L10.4317 8.38975ZM9.56833 11.6103L11.6102 9.56834C11.647 9.706 11.6667 9.85067 11.6667 10C11.6667 10.9205 10.9205 11.6667 10 11.6667C9.85067 11.6667 9.706 11.647 9.56833 11.6103ZM13.1376 4.01725C12.1906 3.60041 11.1396 3.33334 10 3.33334C7.62295 3.33334 5.63097 4.49552 4.1651 5.75496C2.6939 7.01897 1.67297 8.448 1.21989 9.1415C0.877549 9.66542 0.877549 10.3346 1.21989 10.8585C1.6023 11.4438 2.38922 12.5531 3.50995 13.6449L4.68855 12.4663C3.71292 11.5191 3.00953 10.5443 2.65002 10C3.07533 9.35617 3.98193 8.10965 5.25122 7.01912C6.56168 5.89321 8.17978 5 10 5C10.6432 5 11.2612 5.11154 11.8494 5.30549L13.1376 4.01725ZM10 15C9.35683 15 8.73883 14.8884 8.15069 14.6945L6.86246 15.9828C7.80946 16.3996 8.8605 16.6667 10 16.6667C12.3771 16.6667 14.3691 15.5045 15.835 14.2451C17.3062 12.981 18.3271 11.552 18.7802 10.8585C19.1225 10.3346 19.1225 9.66542 18.7802 9.1415C18.3977 8.55617 17.6108 7.44689 16.4901 6.35509L15.3115 7.53369C16.2872 8.48092 16.9906 9.45575 17.3501 10C16.9247 10.6438 16.0182 11.8903 14.7488 12.9809C13.4384 14.1068 11.8202 15 10 15Z" fill="#A4A4A4" />
                    </svg>
                    :
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.33331 17.2L9.52379 22L20 10" stroke="#ACACAC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M26.6667 10.0834L15.2378 22.0834L14.6667 21.3334" stroke="#ACACAC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                }
            </button>
            <span className='z-10 absolute right-0 group-hover:-right-8 scale-75 group-hover:scale-100 bottom-8 rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100'>
                <img src={`/images/${movie.person}.png`} alt={movie.person} />
            </span>
            <div className="flex flex-col absolute bottom-8 items-center max-w-48">
                <h3 className="text-white text-lg font-black text-center">{movie.movieName}</h3>
                <p className="text-lightest-grey text-sm">{`(${movie.year})`}</p>
            </div>
        </div>
    );
}

export const MovieCardSkeleton = () => {
    return (
        <div className="flex flex-col gap-2 relative flex items-center justify-center font-montserrat w-[264px] h-[400px] bg-darkest-grey rounded-lg group animate-pulse relative">
            <span className="absolute -top-4 bg-light-grey h-8 rounded-full w-20" />
            <div className="flex flex-col absolute bottom-8 gap-2 items-center max-w-48">
                <span className="h-4 w-48 bg-light-grey rounded-full" />
                <span className="h-4 w-14 bg-light-grey rounded-full" />
            </div>
        </div>
    );
}

export default MovieCard;