import styled from 'styled-components';

import useStore from '../../store/Store';

import Area from './Overlay/Area';

const Overlay = () => {
    const { selected, isDragging, mouseX, mouseY, areaStart, areas } = useStore(state => state);

    return (
        <>
            <SVG>
                {
                    (isDragging)
                    ?
                    <rect
                        x={areaStart.x}
                        y={areaStart.y}
                        width={(mouseX-areaStart.x > 0) ? mouseX-areaStart.x + 'px' : '1px' }
                        height={(mouseY-areaStart.y > 0) ? mouseY-areaStart.y + 'px' : '1px' }
                        fill={'transparent'}
                        stroke={'black'}
                        strokeWidth={'5'}
                    ></rect>                
                    :
                    <></>
                }
                {
                    areas.map((area, index) => {
                        return (
                            <Area key={index} area={area}></Area>
                        );
                    })
                }
                {
                    (selected.area != null)
                    ?
                    <>
                    <path 
                        d={`M ${selected.area.start.x} ${selected.area.start.y} L ${mouseX} ${mouseY}`}
                        strokeWidth={3}
                        stroke='black'
                    />
                    <rect
                        x={mouseX}
                        y={mouseY}
                        width={selected.area.end.x-selected.area.start.x + 'px'}
                        height={selected.area.end.y-selected.area.start.y + 'px'}
                        fill={'transparent'}
                        stroke={'black'}
                        strokeWidth={'5'}
                    ></rect>     
                    </>

                    :
                    <></>
                }
            </SVG>
        </>
    )
}

const SVG = styled.svg`
    background-color : transparent;
    width : 100%;
    height : 100%;
`

export default Overlay;