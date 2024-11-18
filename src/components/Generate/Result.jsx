import { useEffect } from 'react';
import { styled } from 'styled-components';

import useGenerateStore from '../../store/GenerateStore';

const Result = () => {
    const { pdfContent } = useGenerateStore(state=>state);
    
    const frames = JSON.parse(localStorage.getItem('frames'));
    const mapping = JSON.parse(localStorage.getItem('mapping'));

    const GenerateSchedule = () => {
        console.log('start generating');
        //traverse content
        //find mapping on content
        //get offset
        var offset = 0;
        const target = mapping[0].string;
        pdfContent.forEach((item, index) => {
            //console.log(item.str);
            if(item.str === target) {
                //console.log('found mapping!');
                console.log('mapping index : ', mapping[0].bubbleId);
                console.log('content index : ', index);
                //index(of frame) + offset ==> actual index (of content)
                offset = index - mapping[0].bubbleId;
                console.log('offset : ', offset);
            }
        });
        //
        //traverse frames
        //generate schedule using offset
        
        console.log('content : ', pdfContent);
        //console.log('frames : ', frames);
        //console.log('frame.title : ', pdfContent[frames[0].title[0].startBubbleId + offset].str);
        frames.forEach((frame)=>{
            console.log('title');
            frame.title.forEach((item) => {
                console.log(pdfContent[item.startBubbleId + offset].str);
            })
            console.log('date');
            frame.date.forEach((item) => {
                console.log(pdfContent[item.startBubbleId + offset].str);
            })
            console.log('detail');
            frame.detail.forEach((item) => {
                console.log(pdfContent[item.startBubbleId + offset].str);
            })
        });
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