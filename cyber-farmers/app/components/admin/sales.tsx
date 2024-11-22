"use client";

import { useEffect, useState } from "react"
import { Alert, EmptyAlert, EmptySection, Success } from "./notifications"

import {FaDownload,FaFilter,FaSearch, FaStar,FaExclamationCircle} from "react-icons/fa"
import { CategorySorter, itemSearch, reverseSorter } from "./utilities"
import { objectArrDuplicateHandler } from "./inventory"

export type SaleItem = {
    ItemName:string,
    ItemsSold:string | number,
    ProfitsCash: string | number,
    ProfitsPercentage: string | number,
    Category: string,
    Type: string,
}

let fakeSales = [
    {
        ItemName: "Mabati",
        ItemsSold: 250,
        ProfitsCash: 30000,
        ProfitsPercentage: 25,
        Category: "mabati",
        Type: "3m"
    },
    {
        ItemName: "Nails",
        ItemsSold: 350,
        ProfitsCash: 5000,
        ProfitsPercentage: 53,
        Category: "nails",
        Type: "1kg"
    },
    {
        ItemName: "Nails",
        ItemsSold: 350,
        ProfitsCash: 5000,
        ProfitsPercentage: -3,
        Category: "nails",
        Type: "1kg"
    },
    {
        ItemName: "binding wire",
        ItemsSold: 150,
        ProfitsCash: 1000,
        ProfitsPercentage: 5,
        Category: "wires",
        Type: "3m"
    },
    {
        ItemName: "Mabati",
        ItemsSold: 250,
        ProfitsCash: 30000,
        ProfitsPercentage: 25,
        Category: "mabati",
        Type: "3m"
    },
    {
        ItemName: "Nails",
        ItemsSold: 350,
        ProfitsCash: 5000,
        ProfitsPercentage: 53,
        Category: "nails",
        Type: "1kg"
    },
    {
        ItemName: "binding wire",
        ItemsSold: 150,
        ProfitsCash: 1000,
        ProfitsPercentage: 5,
        Category: "wires",
        Type: "3m"
    }
]


export function Sales(){
    const [sales,setSales] = useState<Array<SaleItem>>(fakeSales)
    const [successState,setSuccessState] = useState("Congragulations sales updated successfuly")
    const [salesState,setSalesState] = useState(<></>)
    const [totalProfitsState,setTotalProfitsState] = useState<number>(0)
    const [filteredSales,setFilteredSales] = useState([])
    const [alertState,setAlertState] = useState(<></>)
    const [counterState,setCounterState] = useState<number>(0)

    useEffect(function(){
        /*SalesByName("mabati").then(function(value:Array<main.SaleDbRow>){
            if(value == null){
                //setAlertState(<Alert err="internal server error" counter={counterState}/>)            
            }
            else{
                let newSaleValue:Array<SaleItem> = value.map(function(sale,index){
                    return {
                        ItemName:sale.ItemName,
                        ItemsSold:sale.ItemsSold,
                        ProfitsCash:sale.ProfitsCash,
                        ProfitsPercentage:sale.ProfitsPercentage,
                        Category:sale.Category,
                        Type:sale.Type,
                    }
                })
                reduxDispatch(fullSales({sales:newSaleValue}))

            }                
        }).catch(function(err){
            setAlertState(<Alert err="internal server error" counter={counterState}/>)
        })*/
    },[])

    useEffect(function(){
        setTotalProfitsState(
            sales.reduce(function(Total,saleItem){
                return Total + Number(saleItem.ProfitsCash)
            },0)    
        )
        setSalesState(<RawSales sales={sales}/>)
    },[sales])

    let searchHandler = function(e:any){
        e.preventDefault()


        const searchString = e.target.value
        const newSearchArr = itemSearch(sales,searchString)
        

        let finalArr = newSearchArr.sort(CategorySorter)

        if(searchString.length == 0){
            // one that doesn't change
            setSalesState(<RawSales sales={sales}/>)
        }
        else if(newSearchArr.length > 0){
            setSalesState(<RawSales sales={finalArr}/>)

        }
        else{  
            setSalesState(<EmptyAlert section="sales" description="no items found from your search"/>)    
        }
    }


    return(
        <div className="w-full h-screen flex flex-col text-center text-black dark:text-white">
            <h1 className="text-xl font-bold text-left mb-4">Sales</h1>
            {alertState}
            <div className="font-bold dark:text-white text-black w-fit ml-0 mb-4">Total Profits : ksh.<span className="text-blue-600">{totalProfitsState}</span></div>
            <div className="w-full flex justify-between mb-4">
                <div className="w-[20rem] h-[2rem] flex justify-between items-center px-3 rounded-xl border-2 border-blue-600"><input type="text" onChange={searchHandler} placeholder="search" className="w-5/6 bg-transparent outline-none border-none"/><FaSearch/></div>
                <div className="w-auto h-[2rem] dark:text-white text-black flex gap-4 items-center">
                    <button className="border-none rounded-lg px-3 py-1 flex gap-2 items-center"><span className="dark:text-white text-black">filter</span><FaFilter className="text-green-600"/></button>
                    <select name="periodSelection" id="periodSelection" className="border-2 border-blue-600 px-3 py-1 rounded-lg flex bg-transparent gap-2 items-center">
                        <option value="today" className="bg-transparent">Today</option>
                        <option value="week" className="bg-transparent">week</option>
                        <option value="month" className="bg-transparent">month</option>
                        <option value="year" className="bg-transparent">year</option>
                    </select>
                </div>
            </div>
            {salesState}
        </div>
    )
}



export function RawSales({sales}:{sales:Array<SaleItem>}){
    const [salesArray,setSalesArray] = useState<Array<SaleItem>>([])
    const [sectionState,setSectionState] = useState(<></>)

    useEffect(function(){
        //fetch the raw sales data
        setSectionState(<EmptySection section="sales" description="no sale item yet to be displayed"/>)

        if(sales.length > 0){
            //for fetching from redux
            setSalesArray(sales)
            setSectionState(
                <div className="w-full h-full flex flex-col overflow-auto">
                {sales.map(function(sale,index){
                    return <IndividualSale key={index} ItemName={sale.ItemName} ItemsSold={Number(sale.ItemsSold)} ProfitsCash={Number(sale.ProfitsCash)} ProfitsPercentage={Number(sale.ProfitsPercentage)}/>
                })}
                </div>
            )
        }
    },[sales])
    return(
        <div className="flex flex-col">
            <div className="w-full font-bold border-b-2 dark:border-white border-black h-auto grid grid-cols-5 mb-4 justify-items-start">
                <div>Items name</div>
                <div>Items sold</div>
                {/*profits made for the period specified on the filter e.g for the day, 7 days, a week, a month or a year*/}
                <div>profits cash</div>
                <div>profits %</div>
                <div>profit status</div>            
            </div>
            <div className="w-full h-[23rem] flex flex-col overflow-auto">
                {sectionState}
            </div>
            {/*have a filter for the period you want the analysis e.g day,week,month or year*/}
        </div>        
    )
}


export function IndividualSale({ItemName,ItemsSold,ProfitsCash,ProfitsPercentage}:{ItemName:string,ItemsSold:number,ProfitsCash:number,ProfitsPercentage:number}){
    const [profitStatus,setProfitStatus] = useState(<></>)
    //If there's profit, simply give it a green star notification card beside the name good
    //for any profits above 25% give a yellowstar 
    //for any profits above 50% give a pinkStar indicator
    useEffect(function(){
        setProfitStatus(
            <div className="w-fit py-2 px-3 flex items-center border-2 border-pink-600 rounded-xl gap-2">
                <FaStar className="text-pink-600"/>
                <span>good</span>
            </div>
        )
        if(ProfitsPercentage < 0){
            setProfitStatus(
            <div className="w-fit py-2 px-3 flex items-center border-2 border-red-600 rounded-xl gap-2">
                <FaExclamationCircle className="text-red-600"/>
                <span>loss</span>
            </div>
            )
        }
        else if(ProfitsPercentage < 10){
            setProfitStatus(
            <div className="w-fit py-2 px-3 flex items-center border-2 border-red-600 rounded-xl gap-2">
                <FaExclamationCircle className="text-red-600"/>
                <span>low</span>
            </div>
            )
        }
        else if(ProfitsPercentage >= 25 && ProfitsPercentage < 50){
            setProfitStatus(
            <div className="w-fit py-2 px-3 flex items-center border-2 border-yellow-600 rounded-xl gap-2">
                <FaStar className="text-yellow-600"/>
                <span>elite</span>
            </div>
            )
        }
        else if(ProfitsPercentage >= 50){
            setProfitStatus(
                <div className="w-fit py-2 px-3 flex items-center border-2 border-green-600 rounded-xl gap-2">
                    <FaStar className="text-green-600"/>
                    <span>Excellent</span>
                </div>
            )
        }
    },[])
    return(
        <div className="w-full py-2 h-[3.5rem] grid grid-cols-5 justify-items-start place-items-center border-b-2 dark:text-white text-black border-blue-600 ">
                <div className="w-full h-full flex items-center">
                    {ItemName.toLowerCase()}
                </div>
                <div className="w-full h-full flex items-center">
                    {ItemsSold}
                </div>
                <div className="w-full h-full flex items-center">
                    {Math.floor(Number(ProfitsCash))}
                </div>
                <div className="w-full h-full flex items-center">
                    {`${Math.floor(Number(ProfitsPercentage))}%`}
                </div>
                <div className="w-full h-full flex items-center">
                    {profitStatus}
                </div>
        </div>
    )
}
