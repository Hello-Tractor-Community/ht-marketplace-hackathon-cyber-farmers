"use client";

import { DateTime} from "luxon";


// full date sorting function
export function reverseSorter(a:any,b:any){
    // arrival date if the propert being used for sorting here
    let newA = a.ArrivalDate.split(".");
    let newB = b.ArrivalDate.split(".");
    
    let dateSorter = function(arr:Array<string>){
        let total = 0    
        let dateA = arr[0].split("/").map(numberMap)
        if(dateA[0]){
            total += dateA[0]
        }
        if(dateA[1]){
            total += dateA[1] * 31
        }
        if(dateA[2]){
            total += dateA[2] * 365
        }
        return total
    }
    let timeSorter = function(arr:Array<string>){
        let total = 0
        let timeA = arr[1].split(":").map(numberMap);
        if(timeA[0]){
            total += timeA[0] * 60 * 60 
        }
        if(timeA[1]){
            total += timeA[1] * 60
        }
        if(timeA[2]){
            total += timeA[2] 
        }
        return total
    }
    // to sort it ascending change the two diffs to work with A - B 
    // here it's in descending order
    let dateDiff = dateSorter(newB) - dateSorter(newA)
    let timeDiff = timeSorter(newB) - timeSorter(newA)
    if(dateDiff == 0){
        // meaning the days are equal.
        // so return the difference in time.
        return timeDiff
    }
        // meaning that dates have a difference and don't get into the time differences.
    else{
        return dateDiff
    }    
}

export function orderDateSorter(a:any,b:any){
    // arrival date if the propert being used for sorting here
    let newA = a.OrderDate.split(".");
    let newB = b.OrderDate.split(".");
    
    let dateSorter = function(arr:Array<string>){
        let total = 0    
        let dateA = arr[0].split("/").map(numberMap)
        if(dateA[0]){
            total += dateA[0]
        }
        if(dateA[1]){
            total += dateA[1] * 31
        }
        if(dateA[2]){
            total += dateA[2] * 365
        }
        return total
    }
    let timeSorter = function(arr:Array<string>){
        let total = 0
        let timeA = arr[1].split(":").map(numberMap);
        if(timeA[0]){
            total += timeA[0] * 60 * 60 
        }
        if(timeA[1]){
            total += timeA[1] * 60
        }
        if(timeA[2]){
            total += timeA[2] 
        }
        return total
    }
    // to sort it ascending change the two diffs to work with A - B 
    // here it's in descending order
    let dateDiff = dateSorter(newB) - dateSorter(newA)
    let timeDiff = timeSorter(newB) - timeSorter(newA)
    if(dateDiff == 0){
        // meaning the days are equal.
        // so return the difference in time.
        return timeDiff
    }
        // meaning that dates have a difference and don't get into the time differences.
    else{
        return dateDiff
    }    
}



function numberMap(value:any,index:any, array:any) {
    return Number(value)
}

//category sort function
export function CategorySorter(a:any,b:any){
    let newA = a.Category.toLowerCase();
    let newB = b.Category.toLowerCase();

    if(newA < newB){
        return -1
    }
    if(newA > newB){
        return 1
    }
    return 0      
}


//price sort function
export function priceSorter(a:any,b:any){
    let newA = Number(a.SellingPrice);
    let newB = Number(b.SellingPrice);
    
    return newB-newA    

}

// time updating function
export function rawNow(){
    let rawTime = Date.now()
    //since I started using typescript I've had to use the constructor directly
    let hour = () => {let hour = DateTime.fromMillis(rawTime).hour;if( hour < 10 ){ return "0"+hour}else{return hour}}
    let minute = () =>  {let minute = DateTime.fromMillis(rawTime).minute;if( minute < 10 ){ return "0"+minute}else{return minute}}
    let second = () =>  {let second = DateTime.fromMillis(rawTime).second;if( second < 10 ){ return "0"+second}else{return second}}
    let fullDate =  `${hour()}:${minute()}:${second()}`                 
    let time = fullDate.trim() 
    //set the dispatch to point to the time from here. 
    return time
}

//a utility for the frontend for setting days
export function daySetter(day:number){
    switch (day) {
        case 1 : 
            return "monday"
            break
        case 2 : 
            return "Tuesday"
            break
        case 3 : 
            return "wednesday"
            break
        case 4 : 
            return "Thursday"
            break
        case 5 : 
            return "friday"
            break
        case 6 : 
            return "saturday"
            break
        case  7: 
            return "sunday"
            break

    }    
}


export function timeSetter(){
    let rawTime = Date.now()
    let date = DateTime.fromMillis(rawTime).day
    let month = DateTime.fromMillis(rawTime).month
    let year = DateTime.fromMillis(rawTime).year
    let hour = () => {let hour = DateTime.fromMillis(rawTime).hour;if( hour < 10 ){ return "0"+hour}else{return hour}}
    let minute = () =>  {let minute = DateTime.fromMillis(rawTime).minute;if( minute < 10 ){ return "0"+minute}else{return minute}}
    let second = () =>  {let second = DateTime.fromMillis(rawTime).second;if( second < 10 ){ return "0"+second}else{return second}}
    let fullDate =  `${date}/${month}/${year}.${hour()}:${minute()}:${second()}`                 
    let time = fullDate.trim() 

    return time
}

//month filter
export function monthSetter(month:number):string{
    let finalstring = "January"
    switch (month) {
        case 1 : 
            finalstring = "January"
            return "January"
        case 2 : 
            finalstring = "February"
            return "February"
        case 3 : 
            finalstring = "March"
            return "March"
        case 4 : 
            finalstring = "April"
            return "April"
        case 5 : 
            finalstring = "May"
            return "May"
        case 6 : 
            finalstring = "June"
            return "June"
        case  7: 
            finalstring = "July"
            return "July"
        case  8: 
            finalstring = "August"
            return "August"
        case  9: 
            finalstring = "September"
            return "September"
        case  10: 
            finalstring = "October"
            return "October"
        case  11: 
            finalstring = "November"
            return "November"
        case  7: 
            finalstring = "December"
            return "December"
    } 
    //I've just added this for just in case
    return finalstring 
}



//function for listing the list of years available
export function yearLister(arr:Array<any>,datePropertyName:string){
    let yearsFound = [...new Map(
        arr.map(function(value,index){
            //compare the dates with one provided
            let valueYear = value[datePropertyName].split(".")[0].split("/")[2]
            let valueMonth =  value[datePropertyName].split(".")[0].split("/")[1]
            return [valueYear,valueMonth]
        })     
    ).keys()] 
    
    return yearsFound
}

//function for listing the list of months available for each year
export function monthLister(year:number,arr:Array<any>,datePropertyName:string):Array<string>{
    let fullDatesFound = arr.map(function(value,index){
        //compare the dates with one provided
        let valueYear = value[datePropertyName].split(".")[0].split("/")[2]
        let valueMonth =  value[datePropertyName].split(".")[0].split("/")[1]
        
        if(valueYear == year){
            return value[datePropertyName]
        }

    })

    //an array of the month numbers with no repetition
    let monthsFound = [...new Map(
        fullDatesFound.map(function(value,index){
            //compare the dates with one provided
            let valueMonth =  value[datePropertyName].split(".")[0].split("/")[1]
            return [valueMonth,valueMonth]
        })     
    ).keys()]

    let wordMonthsFound = monthsFound.map(function(value,index){
        return monthSetter(value)
    })
    
    return wordMonthsFound
}


//function for listing the no of days available for each month
export function daysLister(year:number,month:number,arr:Array<any>,datePropertyName:string):Array<number>{
    //filtering the particular month days
    let datesFiltered = arr.filter(function(value,index){
        //compare the dates with one provided
        let valueYear = value[datePropertyName].split(".")[0].split("/")[2] 
        let valueMonth = value[datePropertyName].split(".")[0].split("/")[1]
        return valueYear == year &&  valueMonth == month
    }) 
    let days = datesFiltered.map(function(fullDate,index){
        let day = fullDate.split(".")[0].split("/")[0] 
        return day
    })
    
    return days
}

// the week will be calculated based on monday to sunday basis so for that I'll see how to create a filter for that.






// category filter
export function filterArr(arr:Array<any>,key:any):Array<any>{
    let newArr = arr.filter(function(value,index,array){
        if(key == "all"){
            return true
        }
        else{
            return value.Category == key
        }
    })
    return newArr    
}

// search function for the item names
export function itemSearch(arr:Array<any>,searchString:string){
    let newArr = arr.filter(function(value,index,array){
        return value.ItemName.toUpperCase().indexOf(searchString.toUpperCase()) != -1
    })
    return newArr    
}

// search for a particular property
// should return an object from which one will choose what property he/she wants by himself from the property.
export function propertyFilter(arr:Array<any>,definingProperties:{ItemName:string,Type:string}){
    let newArr = arr.filter(function(value,index,array){
        return (value.ItemName.toLowerCase() == definingProperties.ItemName && value.Type.toLowerCase() == definingProperties.Type) 
    })
    return newArr[0]     
}

export function salesFilter(arr:Array<any>,definingProperties:{ItemName:string,Type:string}){
    let newArr = arr.filter(function(value,index,array){
        return (value.ItemName.toLowerCase() == definingProperties.ItemName && value.Type.toLowerCase() == definingProperties.Type) 
    })
    return {filteredSales:newArr[0],index:arr.indexOf(newArr[0])}     
}

