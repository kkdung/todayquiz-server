/*
Excel 리소스에서 오늘 퀴즈 Sheet를 선택해 필요한 데이터를 만들어 반환하는 DTO모듈
*/

const e = require('express');
const XLSX = require('xlsx');
const moment = require('../config/moment');

let today_cell = {}//insert 

try {
    const today = moment().format('D');
    const yearMonth = moment().format('YYYYMM');

    // today quiz
    const today_sheets = XLSX.readFile(`./rsc/today/${yearMonth}_revoicequizlist.xlsx`,
        { dateNF: 'yyyy-mm-dd', cellDates: true, encoding: 'utf8' }
    );
    const today_sheet1 = XLSX.utils.sheet_to_row_object_array(
        today_sheets.Sheets['Sheet1'],
        { raw: false }
    )

    // find cell    
    for (var i = 0; i < today_sheet1.length; i++) {
        if (today_sheet1[i].DATE == today) {
            today_cell = today_sheet1[i];
            break;//insert
        }
    }

} catch (e) {
    e.resultCode = process.env.SERVER_CHECK
    throw e;
}

module.exports = class todayQuiz{
    constructor() {
        
        if(today_cell["OPENMENT"]===undefined) { 
            today_cell["OPENMENT"]=""
        }

        if(today_cell["SOUND_COMMENT"]===undefined) {
            today_cell["SOUND_COMMENT"]="" 
        }

        this.opement = today_cell["OPENMENT"]
        this.opement = today_cell["OPENMENT"]
        this.sound = today_cell["SOUND"]
        this.question = today_cell["QUESTION"]
        this.choice1 = today_cell["CHOICE1"]
        this.choice2 = today_cell["CHOICE2"]
        this.choice3 = today_cell["CHOICE3"]
        this.choice4 = today_cell["CHOICE4"]
        this.correct = today_cell["CORRECT"]
        this.commentary = today_cell["COMMENTARY"]
    }

}


    

        
            
            