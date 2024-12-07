import { useEffect } from 'react';
import { styled } from 'styled-components';

import useGenerateStore from '../../store/GenerateStore';

import Schedule from './Schedule';

const Result = () => {
    const { results, setResults, appendResult, 
            numPages, targetPage, increaseTargetPage, pdfContent, } = useGenerateStore(state=>state);
    
    const frames = JSON.parse(localStorage.getItem('frames'));
    const mapping = JSON.parse(localStorage.getItem('mapping'));

    const GenerateSchedule = () => {
        console.log('start generating');
        setResults([]);
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
        frames.forEach((frame)=>{
            const result = {title: '', date: '', detail: ''};
            frame.title.forEach((item) => {
                result.title += findStrInArea(item.area, offsetX, offsetY).join(' ');       
            })
            frame.date.forEach((item) => {
                result.date += findStrInArea(item.area, offsetX, offsetY).join(' ');
            })
            frame.detail.forEach((item) => {
                result.detail += findStrInArea(item.area, offsetX, offsetY).join(' ');
            })
            appendResult(result);
        });
    }

    const findStrInArea = (area, offsetX, offsetY) => {
        const strs = [];
        const start = {x: area.start.x + offsetX, y: area.start.y + offsetY};
        const end = {x: area.end.x + offsetX, y: area.end.y + offsetY};

        pdfContent.forEach((item) => {
            if (((start.x <= item.x)&&(item.x<=end.x)) && ((start.y <= item.y)&&(item.y <= end.y))) {
                strs.push(item.str);
            }
        })

        return strs;
    }

    useEffect(() => {
        if(pdfContent) { GenerateSchedule(); }
    }, [pdfContent]);

    return (
        <Container>
            { results.map((result, index) => { return <Schedule key={index} result={{index: index, ...result}} /> }) }
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    height: 100px;
    overflow-x: auto;
    overflow-y: hidden;
    width: 100%;
`

export default Result;