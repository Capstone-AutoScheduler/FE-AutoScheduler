import { useState, useEffect } from "react";
import { styled } from "styled-components";
import axios from "axios";

import useGenerateStore from "../../store/GenerateStore";

import Schedule from "./Schedule";

const Result = ({ generatorId }) => {
    const {
        results, setResults, appendResult,
        numPages, targetPage, increaseTargetPage, pdfContent,
        setGeneratorLoaded, setSourceType,
    } = useGenerateStore((state) => state);

    //const frames = JSON.parse(localStorage.getItem("frames"));
    //const mapping = JSON.parse(localStorage.getItem("mapping"));

    const [frames, setFrames] = useState(null);
    const [mapping, setMapping] = useState(null);

    async function getGeneratorInfo() {
        try {
            const response = await axios.get(`http://3.35.252.162:8080/generator/${generatorId}`, {timeout: 3000});
            console.log(response.data.result);
            //console.log(response.data.result.frames);
            //console.log(response.data.result.mapping);
            setFrames(response.data.result.frames);
            setMapping(response.data.result.mapping);
            setSourceType(response.data.result.sourceType);
            setTimeout(()=>{
                setGeneratorLoaded(true);
            }, 1000);
        } catch (error) {
            console.error("Failed to get generator information", error);
        }
    }

    const GenerateSchedule = () => {
        console.log("start generating");
        setResults([]);
        //traverse content
        //find mapping on content
        //get offset
        var offsetX = 0;
        var offsetY = 0;
        var found = false;
        var startDate = mapping[0].startDate;
        pdfContent.forEach((item) => {
            if (item.str === mapping[0].string) {
                console.log("found mapping!");
                //console.log('mapping : ', mapping[0]);
                //console.log('found content : ', item);
                //index(of frame) + offset ==> actual index (of content)
                offsetX = item.x - mapping[0].x;
                offsetY = item.y - mapping[0].y;
                console.log("offsetX : ", offsetX);
                console.log("offsetY : ", offsetY);

                found = true;
            }
        });
        if (found === false) {
            console.log("target page : ", targetPage);
            console.log("failed to map");
            if (targetPage < numPages) {
                increaseTargetPage();
                console.log("increase target page");
            }
            return;
        } else {
            console.log("target page : ", targetPage);
            console.log("found map");
            console.log("start generating");
        }
        //
        //traverse frames
        //generate schedule using offset
        console.log("content : ", pdfContent);
        //console.log('frames : ', frames);
        //console.log('frame.title : ', pdfContent[frames[0].title[0].startBubbleId + offset].str);
        frames.forEach((frame) => {
            const result = { title: "", date: "", detail: "" };
            frame.title.forEach((item) => {
                var str;
                if (item.type === "drag") {
                    str = findStrInArea(item.area, offsetX, offsetY).join(" ");
                } else if (item.type === "text") {
                    str = item.text;
                }
                result.title += str;
            });
            var expression = "";
            frame.date.forEach((item) => {
                var str;
                if (item.type === "drag") {
                    str = findStrInArea(item.area, offsetX, offsetY).join(" ");
                } else if (item.type === "text") {
                    str = item.text;
                }
                expression += str;
            });
            result.date += handleDate(startDate, expression);
            frame.detail.forEach((item) => {
                var str;
                if (item.type === "drag") {
                    str = findStrInArea(item.area, offsetX, offsetY).join(" ");
                } else if (item.type === "text") {
                    str = item.text;
                }
                result.detail += str;
            });
            appendResult(result);
        });
    };

    const handleDate = (startDate, expression) => {
        const math = require("mathjs");
        const day = new Date(startDate) / 86400000;
        const result = math.evaluate(day + expression);
        const calculatedDay = new Date(result * 86400000);
        const output = calculatedDay.toISOString().split("T")[0];
        return output;
    };

    const findStrInArea = (area, offsetX, offsetY) => {
        const strs = [];
        const start = { x: area.start.x + offsetX, y: area.start.y + offsetY };
        const end = { x: area.end.x + offsetX, y: area.end.y + offsetY };

        pdfContent.forEach((item) => {
            if (
                start.x <= item.x &&
                item.x <= end.x &&
                start.y <= item.y &&
                item.y <= end.y
            ) {
                strs.push(item.str);
            }
        });

        return strs;
    };

    useEffect(() => {
        setGeneratorLoaded(false);
        getGeneratorInfo();
    }, []);

    useEffect(() => {
        if ((pdfContent !== null) && (frames !== null) && (mapping !== null)) {
            GenerateSchedule();
        }
    }, [pdfContent, frames, mapping]);

    return (
        <Container>
            {results.map((result, index) => {
                return <Schedule key={index} result={{ index: index, ...result }} />;
            })}
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  height: 100px;
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
`;

export default Result;
