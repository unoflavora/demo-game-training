const fs = require('fs');
const dirPath = './src/assets/jsons';
const filter = '.csv';
const path = require('path');
var csvToJson = require('convert-csv-to-json');
const {
    dirname
} = require('path');
var filesList = [];

const convert = () => {
    getFileList(dirPath, filter);
    filesList.forEach(element => {
        element = element.replace(/\\/g, "/");
        let dirName = "./" + element.substr(0, element.lastIndexOf('/')) + "/";
        let fileName = element.replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.');
        let json = csvToJson.getJsonFromCsv(dirName + fileName + ".csv");
        let data = JSON.stringify(json);
        if (fileName === 'Map_Missions_Content') {
            fs.readFile('./' + element, 'utf8', function (err, data) {
                var output = {};
                var bslOutput = {}

                var contentMissions = {};
                var contentBSL = [];
                output['Id'] = 'dshima-course';
                output['Projects'] = [0];
                output['Title'] = 'adira-finance'
                bslOutput['Id'] = 'dshima course';
                bslOutput['Projects'] = [0];
                bslOutput['Title'] = 'adira finance'
                var contentMission;
                var bslContent = {};
                var bslCount = 0;
                var bslMaterial = []
                var bslURL = {};

                var lineContent;

                var textContentArray = data.split(/\r?\n/);

                var number;
                var cluster;
                var topicID;
                var topic;
                var topics;
                var topicContent;

                var category;
                var categories;
                var content;

                var material;

                var missionName;

                var fileJson; // 17
                var theme; // 18
                var faceDirection; // 19
                var xTile; // 20
                var yTile; // 21

                var categoryContent;

                var missionRange = {
                    typeStart: 6,
                    delta: 5,
                    targetStart: 10
                }

                var missions;
                var missionID;

                var typeMission;
                var typeMissions;

                var mainMissions;
                var bonusMissions;

                var missionName;
                var bslLink;

                var mission;
                var target;

                var regEx;

                if (textContentArray[1][0] == ",") {
                    regEx = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;
                } else if (textContentArray[1][0] == ";") {
                    regEx = /;(?=(?:(?:[^"]*"){2})*[^"]*$)/;
                }
                for (let i = 3; i < textContentArray.length; i++) {
                    if (textContentArray[i] == "") {
                        continue;
                    }

                    lineContent = textContentArray[i].split(regEx);

                    number = lineContent[0];
                    cluster = lineContent[1].replace(/\"/g, '');
                    topic = lineContent[2].replace(/\"/g, '');
                    topicID = lineContent[43];
                    category = lineContent[3].replace(/\"/g, '');
                    material = lineContent[4];

                    //console.log(lineContent);

                    fileJson = lineContent[36];
                    theme = lineContent[37];
                    faceDirection = lineContent[38];
                    xTile = lineContent[39];
                    yTile = lineContent[40];

                    // missions

                    mainMissions = [];
                    bonusMissions = [];

                    missionName = lineContent[4];
                    missionID = lineContent[5];
                    bslLink = lineContent[44];
                    bslId = lineContent[45];
                    if (bslLink) {
                        let bslDetail = {};
                        bslDetail['Id'] = bslId;
                        bslDetail['Title'] = bslLink;
                        bslDetail['Type'] = 'read';
                        bslDetail['Position'] = '0';
                        bslCount = bslCount + 1;
                        bslMaterial.push(bslDetail);
                    }

                    // mission
                    for (let i = 0; i < 3; i++) {
                        mission = lineContent[missionRange.typeStart + missionRange.delta * i];
                        target = lineContent[missionRange.targetStart + missionRange.delta * i];

                        if (mission != "" && mission != "-" && target != "" && target != "-") {
                            mainMissions.push({
                                mission: mission,
                                target: parseInt(target)
                            });
                        }
                    }

                    // bonus
                    for (let i = 3; i < 6; i++) {
                        mission = lineContent[missionRange.typeStart + missionRange.delta * i];
                        target = lineContent[missionRange.targetStart + missionRange.delta * i];

                        if (mission != "" && mission != "-" && target != "" && target != "-") {
                            bonusMissions.push({
                                mission: mission,
                                target: parseInt(target)
                            });
                        }

                    }

                    //

                    if (number != "") {
                        topics = [];
                        contentMission = {};
                        // contentMissions.push(contentMission);

                        contentMission["Title"] = cluster;
                        contentMission["Content"] = topics;
                    }

                    if (topic != "") {
                        categories = [];
                        topicContent = {};

                        topicContent["Title"] = topic;
                        topicContent["Id"] = topicID;
                        topicContent["Position"] = '0';

                        topics.push(topicContent);
                    }

                    categoryContent = {};

                    if (category != "") {
                        missions = [];

                        categories.push(missions);
                        // categoryContent["missions"] = missions;

                        // categoryContent["category"] = category;

                        // categoryContent["is_unlocked"] = true;

                    }

                    mission = {};
                    mission["Id"] = missionID;
                    mission["Title"] = missionName;
                    mission["Type"] = 'game'
                    mission["Position"] = '0'

                    
                    topicContent["Content"] = missions;
                    // mission["bsl_content"] = bslLink;

                    // typeMission = {};
                    // typeMission["main_missions"] = mainMissions;
                    // typeMission["bonus_missions"] = bonusMissions;

                    // mission["mission_types"] = typeMission;

                    missions.push(mission);
                }
                // bslMaterial.push(bslURL);
                var bslContent3 = {}
                bslContent3['Title'] = "Elder Learning Material"
                bslContent3['Id'] = 'BSL1'
                bslContent3['Position'] = "0"
                bslContent3['Content'] = bslMaterial;
                var bslContent2 = [];
                bslContent2.push(bslContent3);
                bslContent['Title'] = "dshima_bsl_content";
                bslContent['Content'] = bslContent2;
                // contentBSL.push(bslContent);
                
                output["Data"] = contentMission;
                bslOutput["Data"] = bslContent;
                // return output["content_missions"];
                let finalObject = JSON.stringify(output);
                let finalObject2 = JSON.stringify(bslOutput);

                fs.writeFile('./src/assets/jsons/' + fileName + '.json', finalObject, (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("Dah ke save gan.");
                });
                fs.writeFile('./src/assets/jsons/' + 'BSLContent' + '.json', finalObject2, (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("Dah ke save gan.");
                });
            });

        }
    });
}

function getFileList(startPath, filter) {

    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }
    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            getFileList(filename, filter);
        } else if (filename.indexOf(filter) >= 0) {
            filesList.push(filename);
        };
    };
    return filesList;
};

module.exports = {
    convert
}