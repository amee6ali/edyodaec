const url="https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products"


const checkFilters = () =>{
    var filters = $(".filter-checkbox>input:checkbox:checked")
    var checkedFilters=[]
    for(var i=0;i<filters.length;i++){
        checkedFilters.push(filters[i].value)
    }
    return checkedFilters
}
var checkedFilters = checkFilters()
$(document).ready(() => {
    $.get(url,(response)=>{
        response.map(item => handleRowCreation(checkedFilters,item))
        displayCount()
        $(".filter-checkbox > input").change((e)=>{
            $(".row").remove()
            checkedFilters = [...checkFilters()]
            response.map(item => handleRowCreation(checkedFilters,item))
            displayCount()
        })
    })
})
const createRow = data =>{
    var row  = $("<tr>").addClass("row")
    var td1 =$("<td>").addClass("cell-secondary")
    td1.html(data.id)
    var td2 = $("<td>").addClass("cell-primary")
    td2.html(data.medicineName)
    var td3 = $("<td>").addClass("cell-secondary")
    td3.html(data.medicineBrand)
    var td4 = $("<td>").addClass("cell-primary")
    var dateArr = data.expiryDate.split("-")
    td4.html(dateArr[0]+" "+dateArr[1]+", "+dateArr[2])
    var td5 = $("<td>").addClass("cell-secondary")
    td5.html("$"+data.unitPrice)
    var td6 = $("<td>").addClass("cell-secondary")
    td6.html(data.stock)
    row.append(td1,td2,td3,td4,td5,td6)
    return row
}
const displayCount =() => $('#count').html($('.row').length)



const handleRowCreation=(filterArr,data)=>{
    if(checkedFilters.length==2){
       
            $("#order-table").append(createRow(data))
            return 0
    }
    else if(checkedFilters.length==1){
        if(filterArr.includes("Expired")){
                !checkLowStock(data) && $("#order-table").append(createRow(data))
                return 0;
            }
            
    else if(checkedFilters.length==1){
        if(filterArr.includes("Low Stock")){
                !checkExpiry(data) && $("#order-table").append(createRow(data))
                return 0
            }
        }
    else{
        if(!checkExpiry(data) && !checkLowStock(data)){
            $("#order-table").append(createRow(data))
        }
       }
            
    }
}
const checkExpiry = (data) =>{
    var exp = new Date(data.expiryDate)
    exp = exp.getTime()
    var currentDate = new Date()
    currentDate = currentDate.getTime()
    exp < currentDate ? true : false

}
function checkLowStock(data){
    if(data.stock<100){
        return true
    }
    else{
        return false
    }
}