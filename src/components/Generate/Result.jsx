import { useEffect } from 'react';
import { styled } from 'styled-components';

import useGenerateStore from '../../store/GenerateStore';

const Result = () => {
    const { numPages, targetPage, increaseTargetPage, pdfContent } = useGenerateStore(state=>state);
    
    const frames = JSON.parse(localStorage.getItem('frames'));
    const mapping = JSON.parse(localStorage.getItem('mapping'));

    const GenerateSchedule = () => {
        console.log('start generating');
        //traverse content
        //find mapping on content
        //get offset
        var offsetX = 0;
        var offsetY = 0;
        var found = false;
        pdfContent.forEach((item) => {
            if(item.str === mapping[0].string) {
                console.log('found mapping!');
                //console.log('mapping : ', mapping[0]);
                //console.log('found content : ', item);
                //index(of frame) + offset ==> actual index (of content)
                offsetX = item.x - mapping[0].x;
                offsetY = item.y - mapping[0].y;
                console.log('offsetX : ', offsetX);
                console.log('offsetY : ', offsetY);
                
                found = true;
            }
        });
        if (found === false) {
            console.log('target page : ', targetPage);
            console.log('failed to map');
            if(targetPage < numPages) {
                increaseTargetPage();
                console.log('increase target page');
            }
            return; 
        } else {
            console.log('target page : ', targetPage);
            console.log('found map');
            console.log('start generating');
        }
        //
        //traverse frames
        //generate schedule using offset
        console.log('content : ', pdfContent);
        //console.log('frames : ', frames);
        //console.log('frame.title : ', pdfContent[frames[0].title[0].startBubbleId + offset].str);
        frames.forEach((frame, index)=>{
            console.log('### FRAME ' + index + '###');
            console.log('title');
            frame.title.forEach((item) => {
                console.log(findItemInArea(item.area, offsetX, offsetY));
            })
            console.log('date');
            frame.date.forEach((item) => {
                console.log(findItemInArea(item.area, offsetX, offsetY));
            })
            console.log('detail');
            frame.detail.forEach((item) => {
                console.log(findItemInArea(item.area, offsetX, offsetY));
            })
        });
    }

    const findItemInArea = (area, offsetX, offsetY) => {
        const items = [];
        const start = {x: area.start.x + offsetX, y: area.start.y + offsetY};
        const end = {x: area.end.x + offsetX, y: area.end.y + offsetY};

        //console.log('area start', start);
        //console.log('area end', end);
        pdfContent.forEach((item) => {
            if (((start.x <= item.x)&&(item.x<=end.x)) && ((start.y <= item.y)&&(item.y <= end.y))) {
                //console.log('inside', item.str);
                items.push(item.str);
            }
        })

        return items;
    }

    useEffect(() => {
        if(pdfContent) { GenerateSchedule(); }
    }, [pdfContent]);

    return (
        <Container>
            {JSON.stringify(pdfContent)}
        </Container>
    );
};

const Container = styled.div`
`

export default Result;