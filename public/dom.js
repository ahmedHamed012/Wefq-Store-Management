$(document).ready(function(){
let userinpt = document.createElement("input");
userinpt.setAttribute('type','hidden');
userinpt.setAttribute('name','name');
document.getElementById("myform").appendChild(userinpt);
    $("#myform").submit(function(){
        let len = document.getElementsByClassName('inpt').length;
const arr = new Array();
const admins = [
{
    "Name" : "أحمد حامد على",
    "Email" : "ahmedcina60@wefaq.org",
    "Username" : "ahmed_255",
    "Age":23,
    "Password" : "ah0120615",
    "Job-title" : "System Admin"
},
{
    "Name" : "أحمد عاصم منير",
    "Email" : "ahmedassem@wefaq.org",
    "Username":"assem_26",
    "Age":23,
    "Password" : "assem25%",
    "Job-title" : "System Admin"
},
{
    "Name" : "محمد خالد محمود",
    "Email" : "shnbo@wefaq.org",
    "Username":"Mo.Khaled14",
    "Age":23,
    "Password" : "shnbo2025",
    "Job-title" : "System Admin"
}
];
for (let i = 0; i < len; i++) {
     arr[i] = document.getElementsByClassName('inpt')[i].value;
}
for (let j = 0; j < len; j++) {
    if(arr[j] === '')
    {
    document.getElementsByClassName('error')[0].style.display = 'block';
    document.getElementsByClassName('err-p')[0].innerHTML = 'هناك خطأ ما ! برجاء ملئ البيانات المطلوبة ..';
    return false;
    }
    }
    for (let r = 0; r < admins.length; r++) {
        if(arr[0] === admins[r]["Email"])
        {
        if(arr[1] !== admins[r]["Password"]){
        document.getElementsByClassName('error')[0].style.display = 'block';
        document.getElementsByClassName('err-p')[0].innerHTML = 'البيانات التى أدخلتها غير صحيحة ..';
        return false;
        }
        userinpt.setAttribute('value',`${admins[r]["Name"]}`);
      }}
    } )
});