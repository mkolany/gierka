function start(){
    create_random_code();
    header=document.getElementById("top_header");
}
var clipboard_color_number=null;
var active_row=1;
var secret_code=new Array(4);
var input_code=new Array(4);
var is_solved=false;
var header;


function create_random_code(){
    for(var i=0;i<4;i++)
        secret_code[i]=Math.floor(Math.random()*7)+1;
        console.log(secret_code);
}

function reset(){
    create_random_code();
    var all_button_cells=document.getElementsByClassName("color_button");
    for(var i=0;i<all_button_cells.length;i++)
        all_button_cells[i].className="color_button not_filled";
    var all_answer_cells=document.getElementsByClassName("answer_cell");
    for(var i=0;i<all_answer_cells.length;i++)
        all_answer_cells[i].className="answer_cell";
    var solution_buttons=document.getElementsByClassName("solution_button");
        for(var i=0;i<solution_buttons.length;i++){
            solution_buttons[i].innerHTML="?";
            solution_buttons[i].className="solution_button not_filled";
        }
    is_solved=false;
    active_row=1;
    header.innerHTML="Let's go !";
}

function reveal_top(){
    var solution_buttons=document.getElementsByClassName("solution_button");
        for(var i=0;i<4;i++){
            solution_buttons[i].innerHTML="";
            solution_buttons[i].classList.add("color"+secret_code[i]);
            solution_buttons[i].classList.remove("not_filled");
        }
}

function reveal_action(){
    reveal_top();
    if(!is_solved)
        header.innerHTML="I'm sorry...";
    else
        alert("You can see it!");
    is_solved=true;
}

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
    //console.log(number);
    clipboard_color_number=number;
    var choice_buttons=document.getElementsByClassName("choice_button");
    for(var i=0;i<choice_buttons.length;i++)
        choice_buttons[i].classList.remove("active");
    choice_buttons[number-1].classList.add("active");
}

function place_color(cell, row_number){
    if(clipboard_color_number!=null && row_number==active_row && !is_solved)
        cell.className="color_button color"+clipboard_color_number;
        cell.setAttribute("data-color-number",clipboard_color_number);
}

function check_row(){
    var checked_cells= document.querySelectorAll("tr[data-row='"+active_row+"'] > td.color_button");
    var len=checked_cells.length;
    if(is_solved){
        alert("The game is over");
        return;
    }
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
       alert("Not all boxes are filled");
    }
}


function verify_code(){
    
    //Klonowanie secret_code
    var secret_code_copy=new Array(4);
    for(var i=0;i<secret_code.length;i++)
        secret_code_copy[i]=secret_code[i];
    
    var number_of_correct_place=0;
    for (var i=0;i<4;i++)
        if(secret_code_copy[i]==input_code[i]){
            number_of_correct_place++;
            secret_code_copy[i]=0;
            input_code[i]=-1;
        }
    var number_of_correct_color=0;
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(input_code[i]==secret_code_copy[j]){
                number_of_correct_color++;
                secret_code_copy[j]=0;
                break;
            }
        }
    }
    var answer_cells=document.querySelector("tr[data-row='"+active_row+"'] table.answer_table > tbody tr").children;
    for(var i=0;i<number_of_correct_place;i++)
        answer_cells[i].className="answer_cell correct_place";
    for(var i=number_of_correct_place;i<number_of_correct_color+number_of_correct_place;i++)
        answer_cells[i].classList="answer_cell correct_color";
    for(var i=number_of_correct_color+number_of_correct_place;i<answer_cells.length;i++)
        answer_cells[i].classList="answer_cell incorrect";
    
    if(number_of_correct_place==4){
        is_solved=true;
        reveal_top();
        header.innerHTML="Congratulations !";
        
    }
    else if(active_row==7)
        reveal_action();
    
    
    
    return [number_of_correct_place,number_of_correct_color];
}
       
       
       