formated_form = ''

formated_day = ''
formated_title = ''


function getFormated(){
    formated_form += formated_title;
    formated_form += ('\n' + formated_day);
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

export {formatDays, formatDate, getFormated};