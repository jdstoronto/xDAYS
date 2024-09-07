import { ToastAndroid } from "react-native";



formated_title =
formated_day =
formated_health =
formated_appreciations = 
formated_tasks =
formated_math =
formated_explore
= ''


function getFormated(){
    formated_form = ''
    formated_form += formated_title;
    formated_form += ('\n' + formated_day);
    formated_form += ('\n' + formated_health);
    formated_form += ('\n' + formated_appreciations);
    formated_form += ('\n' + formated_tasks);
    formated_form += ('\n' + formated_math);
    formated_form += ('\n' + formated_explore);
    console.log('completed');
    console.log(formated_form);
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

function formatThanks(array){
    title = '**Appreciations**'
    thanks = array.map(value => (
        `\n  ${value.status == 'Completed' ?'[x]':'[ ]'} ${value.name} - ${value.thanks}`
    )).join('');
    formated_appreciations = title + thanks;
}

function formatTasks(array){
    title = '**Appreciations**'
    tasks = array.map(value => (
        `\n  ${value.status == 'Completed' ?'[x]':'[ ]'} ${value.thanks}`
    )).join('');
    formated_tasks = title + tasks;
}

function formatMath(obj, text){
    title = '**Life**';
    subtract = `\n -Subtract: ${obj['-']}`;
    add = `\n -Add: ${obj['+']}`;
    multiply = `\n -Multiply: ${obj['*']}`;
    divide = `\n -Divide: ${obj['÷']}`;

    formated_math = title + subtract + add + multiply + divide    
}

function formatExplore(obj, text){
    title = '**Explore Life**';
    explore = text != '' && ('Why and Why Not')
    

    formated_explore = title;
}

export {formatDays, formatDate, formatHealth, formatTasks, formatThanks, formatMath, formatExplore, getFormated};