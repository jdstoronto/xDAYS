import { ToastAndroid } from "react-native";



formated_title =
formated_day =
formated_health =
formated_appreciations = 
formated_tasks =
formated_math =
formated_explore
= ''

const mathToString = {
    '+':'Add',
    '-':'Subtract',
    '*':'Multiply',
    '÷':'Divide'
}

const checkToString = {
    Completed:`[x]`,
    '':'[  ]',
    Future:' ~ ',
}

title = (text) => {
    return `**${text}**`
}

subTitle = (text) => {
    return `\n\t\t${text}`
}

function getFormated(){
    formated_form = ''
    formated_form += formated_title;
    formated_form += ('\n' + formated_day);
    formated_form += ('\n' + formated_health);
    formated_form += ('\n' + formated_appreciations);
    formated_form += ('\n' + formated_tasks);
    formated_form += ('\n' + formated_math);
    formated_form += ('\n' + formated_explore);
    return formated_form;
};

function formatDays(text){
    formated_day = '**Day**\n' + " - " + text;
}

function formatDate(text){
    formated_title = '**xDiary - [' + text + "]**";
}

function formatHealth(text){
    formated_health = '**Health**\n' + " - " + text;
}

function formatThanks(newArray, prevArray){
    newThanks = newArray.map(value => (
        `\n  ${checkToString[value.status]} ${value.name} - ${value.thanks}`
    )).join('');
    prevThanks = prevArray.map(value => (
        `\n  ${checkToString[value.status]} ${value.name} - ${value.thanks}`
    )).join('');
    formated_appreciations = title(`Appreciations`) + subTitle('New') + newThanks + subTitle('Previous') + prevThanks;
}

function formatTasks(newArray,prevArray,futureArray){
    newTasks = newArray.map(value => (
        `\n  ${checkToString[value.status]} ${value.task}`
    )).join('');
    prevTasks = prevArray.map(value => (
        `\n  ${checkToString[value.status]} ${value.task}`
    )).join('');
    futureTasks = futureArray.map(value => (
        `\n  ${checkToString[value.status]} ${value.task}`
    )).join('');
    formated_tasks = (title(`Tasks`) 
    + subTitle('New') + newTasks
    + subTitle('Previous') + prevTasks
    + subTitle('Future') + futureTasks
    );
}

function formatMath(obj, text){
    subtract = `\n -${mathToString['-']}: ${obj['-']}`;
    add = `\n -${mathToString['+']}: ${obj['+']}`;
    multiply = `\n -${mathToString['*']}: ${obj['*']}`;
    divide = `\n -${mathToString['÷']}: ${obj['÷']}`;

    formated_math = title('Life') + subtract + add + multiply + divide    
}

function formatExplore(obj, text){
    explore = text != '' && (
        `${subTitle(`Why`)} ${mathToString[text]}: \n${obj.why} ${subTitle(`Why Not`)} ${mathToString[text]}: \n${obj.whynot}`
    )

    formated_explore = title(`Explore Life`) + explore;
}

export {formatDays, formatDate, formatHealth, formatTasks, formatThanks, formatMath, formatExplore, getFormated};