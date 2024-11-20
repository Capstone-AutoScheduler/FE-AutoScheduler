import useStore from '../../../store/Store';

const Area = ({ area }) => {
    const { selected, setSelectedArea } = useStore(state => state);

    const defaultStroke = 'green';
    const selectedStroke = 'red';

    const handleMouseDown = (event) => {
        //console.log('click area');
        setSelectedArea(area);
        event.stopPropagation();
    }

    const handleMouseUp = (event) => {
        console.log(selected);
        event.stopPropagation();
    }

    return (
        <rect
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}

            x={area.start.x}
            y={area.start.y}
            width={area.end.x-area.start.x + 'px'}
            height={ area.end.y-area.start.y + 'px'}
            fill={'transparent'}
            stroke={(selected.area === area) ? selectedStroke : defaultStroke}
            strokeWidth={'5'}
        ></rect>
    );
}

export default Area;