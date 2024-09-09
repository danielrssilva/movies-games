const Star = ({ className }: { className?: string }) => {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path className={className} d="M8 2L9.35713 5.44102C9.4824 5.75866 9.545 5.91748 9.64093 6.0514C9.72593 6.17011 9.82987 6.27404 9.9486 6.35906C10.0825 6.45497 10.2413 6.51761 10.559 6.64288L14 8L10.559 9.35713C10.2413 9.4824 10.0825 9.545 9.9486 9.64093C9.82987 9.72593 9.72593 9.82987 9.64093 9.9486C9.545 10.0825 9.4824 10.2413 9.35713 10.559L8 14L6.64288 10.559C6.51761 10.2413 6.45497 10.0825 6.35906 9.9486C6.27404 9.82987 6.17011 9.72593 6.0514 9.64093C5.91748 9.545 5.75866 9.4824 5.44102 9.35713L2 8L5.44102 6.64288C5.75866 6.51761 5.91748 6.45497 6.0514 6.35906C6.17011 6.27404 6.27404 6.17011 6.35906 6.0514C6.45497 5.91748 6.51761 5.75866 6.64288 5.44102L8 2Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}

export default Star;