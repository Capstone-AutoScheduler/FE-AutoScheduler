const Arrow = ({ index, end, start }) => {
    const defaultArrowWidth = '4';
    const expandArrowWidth = '10';
    
    return (
        <path
        key={index}
        d={`M ${start.x + start.width} ${start.y + start.height / 2} L ${end.x} ${end.y + end.height / 2}`}
        strokeWidth={defaultArrowWidth}
        stroke='black'
        onMouseEnter={(e) => { e.target.style.strokeWidth = expandArrowWidth; }}
        onMouseLeave={(e) => { e.target.style.strokeWidth = defaultArrowWidth; }}
        />
    );
}

export default Arrow;