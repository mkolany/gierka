function start(){
    
}
var clipboard_color_number;
var active_row=1;
var secret_code=[1,2,3,3];
var input_code=new Array(4);

/*function get_color_from_number(number){
    var color_string;
    switch(number){
        case 1:
        color_string="rgb(255,0,0)";
        break;
        case 2:
        color_string="rgb(0,255,0)";
        break;
        case 3:
        color_string="rgb(0,0,255)";
        break;
        case 4:
        color_string="rgb(0,0,0)";
        break;
        case 5:
        color_string="rgb(255,255,0)";
        break;
        case 6:
        color_string="rgb(255,0,255)";
        break;
        case 7:
        color_string="rgb(255,0,255)";
        break;
            
    }
    return color_string;
}*/


function choose_color(number){
    clipboard_color_number=number;
}

function place_color(cell, row_number){
    if(clipboard_color_number!=null && row_number==active_row)
        cell.className="color_button color"+clipboard_color_number;
        cell.setAttribute("data-color-number",clipboard_color_number);
}

function check_row(){
    var checked_cells= document.querySelectorAll("tr[data-row='"+active_row+"'] > td.color_button");
    var len=checked_cells.length;
    var test_filled=true;
    for(var i=0;i<len;i++)
        if(checked_cells[i].classList.contains("not_filled"))
            test_filled=false;
    if(test_filled){
        for (var i=0;i<len; i++)
            input_code[i]=checked_cells[i].getAttribute("data-color-number");
        //alert(input_code);
        verify_code();
        active_row++;
    }
    else{
       alert("Not filled");
    }
}


function verify_code(){
    var number_of_correct_place=0;
    for (var i=0;i<4;i++)
        if(secret_code[i]==input_code[i]){
            number_of_correct_place++;
            input_code[i]=0;
        }
    var number_of_correct_color=0;
    for(var i=0;i<4;i++){
        for(var j=0;j<input_code.length;j++){
            if(secret_code[i]==input_code[j]){
                number_of_correct_color++;
                input_code[j]=0;
                break;
            }
        }
    }
    var answer_cells=document.querySelector("tr[data-row='"+active_row+"'] table.answer_table > tbody tr").children;
    for(var i=0;i<number_of_correct_place;i++)
        answer_cells[i].className="answer_cell correct_place";
    for(var i=number_of_correct_place;i<number_of_correct_color+number_of_correct_place;i++)
        answer_cells[i].classList="answer_cell correct_color"
    for(var i=number_of_correct_color+number_of_correct_place;i<answer_cells.length;i++)
        answer_cells[i].classList="answer_cell incorrect";
    
    
    
    return [number_of_correct_place,number_of_correct_color];
}
       
       
       