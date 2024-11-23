"use client";

import { useEffect,useRef,useState } from "react"
import {FaDownload,FaExclamationCircle,FaFilter,FaSearch, FaTruck} from "react-icons/fa"
import {useAppSelector } from "./states/hooks"
import { EmptyAlert, EmptySection } from "./notifications"
import { CategorySorter, itemSearch } from "./utilities"


// the stock section simply deals with the record of the status of the stocks whether the quantity needs a restock or not
// it arranges the different stock status from critical,whereby the stock is below or equal to 25% of the full stock capability.
// good,when the stock status is below or equal to 50% of the full stock items no
// perfect, when the stock status is above 50%

export type StockItem = {
    ItemName:string,
    Type:string,
    Category:string,
    ItemsInStock: string | number,
    ItemFullStock: string | number
}

let fakeStocks = [
    {
        ItemName: "Mabati",
        Type: "mabati",
        Category: "mabati",
        ItemFullStock: 400,
        ItemsInStock: 300
        //calculate the percentage at runtime
    },
    {
        ItemName: "Mabati",
        Type: "mabati",
        Category: "mabati",
        ItemFullStock: 600,
        ItemsInStock: 300
        //calculate the percentage at runtime
    },
    {
        ItemName: "Mabati",
        Type: "mabati",
        Category: "mabati",
        ItemFullStock: 900,
        ItemsInStock: 850
        //calculate the percentage at runtime
    },
    {
        ItemName: "Mabati",
        Type: "mabati",
        Category: "mabati",
        ItemFullStock: 1000,
        ItemsInStock: 100
        //calculate the percentage at runtime
    },
    {
        ItemName: "Mabati",
        Type: "mabati",
        Category: "mabati",
        ItemFullStock: 400,
        ItemsInStock: 300
        //calculate the percentage at runtime
    },
    {
        ItemName: "Mabati",
        Type: "mabati",
        Category: "mabati",
        ItemFullStock: 400,
        ItemsInStock: 300
        //calculate the percentage at runtime
    },
    {
        ItemName: "Mabati",
        Type: "mabati",
        Category: "mabati",
        ItemFullStock: 400,
        ItemsInStock: 300
        //calculate the percentage at runtime
    },
    {
        ItemName: "Mabati",
        Type: "mabati",
        Category: "mabati",
        ItemFullStock: 400,
        ItemsInStock: 300
        //calculate the percentage at runtime
    },
    {
        ItemName: "Mabati",
        Type: "mabati",
        Category: "mabati",
        ItemFullStock: 400,
        ItemsInStock: 300
        //calculate the percentage at runtime
    },
    {
        ItemName: "Mabati",
        Type: "mabati",
        Category: "mabati",
        ItemFullStock: 400,
        ItemsInStock: 300
        //calculate the percentage at runtime
    },
]

export function Stock(){
    const [stock,setStock] = useState<Array<StockItem>>(fakeStocks)
    const [stockState,setStockState] = useState(<></>)
    const [actualStock,setActualStock] = useState<Array<StockItem>>([])

    useEffect(function(){
        setStockState(<EmptySection section="stock" description="no stock item yet to be displayed"/>)
        if(stock.length > 0){
            setStockState(
                <div className="w-full h-[25rem]  flex flex-col overflow-auto">
                    {stock.map(function(stock,index){
                        const {ItemName,Type,Category,ItemsInStock,ItemFullStock} = stock
                        return <StockItem key={index} ItemName={ItemName} Type={Type} ItemFullStock={Number(ItemFullStock)} Category={Category} ItemsStock={Number(ItemsInStock)}/>
                    })}
                </div>
            )
        }
        /*else{
            //accessing the db function.
            setActualStock(fakeStocks)
        }*/
    },[stock])

    let searchHandler = function(e:any){
        e.preventDefault()
        
        const searchString = e.target.value
        const newSearchArr = itemSearch(stock,searchString)
        
        let finalArr = newSearchArr.sort(CategorySorter)

        if(searchString.length == 0){
            // one that doesn't change
            setStockState(
                <div className="w-full h-[25rem]  flex flex-col overflow-auto">
                    {stock.map(function(stock,index){
                        const {ItemName,Type,Category,ItemsInStock,ItemFullStock} = stock
                        return <StockItem key={index} ItemName={ItemName} Type={Type} ItemFullStock={Number(ItemFullStock)} Category={Category} ItemsStock={Number(ItemsInStock)}/>
                    })}
                </div>
            )
        }
        else if(newSearchArr.length > 0){
            setStockState(
                <div className="w-full h-[25rem]  flex flex-col overflow-auto">
                    {finalArr.map(function(stock,index){
                        const {ItemName,Type,Category,ItemsInStock,ItemFullStock} = stock
                        return <StockItem key={index} ItemName={ItemName} Type={Type} ItemFullStock={Number(ItemFullStock)} Category={Category} ItemsStock={Number(ItemsInStock)}/>
                    })}
                </div>
            )
        }
        else{  
            setStockState(<EmptyAlert section="stock" description="no items found from your search"/>)
        }
    }

    return(
        <div className="w-full flex flex-col gap-4 h-screen dark:text-white text-black">
            <h1 className="text-xl font-bold">Stock</h1>
            <div className="w-full flex justify-between mb-4">
                <div className="w-[20rem] h-[2rem] flex justify-between items-center px-3 rounded-xl border-2 border-blue-600"><input type="text" onChange={searchHandler} placeholder="search" className="w-5/6 bg-transparent outline-none border-none"/><FaSearch/></div>
                <div className="w-auto h-[2rem] dark:text-white text-black flex gap-4 items-center">
                    <button className="border-none  rounded-lg px-3 py-1 flex gap-2 items-center"><span className="dark:text-white text-black">stock level</span><FaFilter className="text-green-600"/></button>
                    <select name="periodSelection" id="periodSelection" className="border-2 border-blue-600 px-3 py-1 rounded-lg flex bg-transparent gap-2 items-center">
                        <option value="critical" className="bg-transparent">critical</option>
                        <option value="good" className="bg-transparent">good</option>
                        <option value="perfect" className="bg-transparent">perfect</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-5 font-bold border-b-2 dark:border-white border-black">
                <div>Item Name</div>
                <div>model</div>
                <div>brand</div>
                <div>Items in stock</div>
                <div>stock status</div>
            </div>
            <div className="w-full h-[25rem]  flex flex-col overflow-auto">
                {stockState}
            </div>
        </div>
    )
}


export function StockItem({ItemName,Type,ItemFullStock,Category,ItemsStock}:{ItemFullStock:number,Type:string,Category:string,ItemName:string,ItemsStock:number}){
    const [stockStatus,setStockStatus] = useState(<></>)
    const [stockPercentageState,setStockPercentageState] = useState<number>(0)

    useEffect(function(){
        setStockPercentageState(Math.floor((Number(ItemsStock)/Number(ItemFullStock))*100))
    },[])

    useEffect(function(){
        //fetch from db

        setStockStatus(
            <div className="w-fit py-2 px-3 flex items-center border-2 border-yellow-600 rounded-xl gap-2">
                <FaTruck className="text-yellow-600"/>
                <span>average</span>
            </div>
        )
        if(stockPercentageState <= 25){
            setStockStatus(
            <div className="w-fit py-2 px-3 flex items-center border-2 border-red-600 rounded-xl gap-2">
                <FaExclamationCircle className="text-red-600"/>
                <span>critical</span>
            </div>
            )
        }
        else if(stockPercentageState > 25 && stockPercentageState < 50){
            setStockStatus(
            <div className="w-fit py-2 px-3 flex items-center border-2 border-yellow-600 rounded-xl gap-2">
                <FaTruck className="text-yellow-600"/>
                <span>average</span>
            </div>
            )
        }
        else if(stockPercentageState >= 50){
            setStockStatus(
                <div className="w-fit py-2 px-3 flex items-center border-2 border-green-600 rounded-xl gap-2">
                    <FaTruck className="text-green-600"/>
                    <span>Excellent</span>
                </div>
            )
        }
    },[stockPercentageState])

    return(
        <div className="w-full py-2 h-[3.5rem] grid grid-cols-5 justify-items-start place-items-center border-b-2 dark:text-white text-black border-blue-600 ">
                <div className="w-full h-full flex items-center">
                    {ItemName.toLowerCase()}
                </div>
                <div className="w-full h-full flex items-center">
                    {Type.toLowerCase()}
                </div>
                <div className="w-full h-full flex items-center">
                    {Category.toLowerCase()}
                </div>
                <div className="w-full h-full flex items-center">
                    {ItemsStock}
                </div>
                <div className="w-full h-full flex items-center">
                    {stockStatus}
                </div>
        </div>
    )
}


//this is obsolete here since the user can not directly input the new stock,that will be a system breech and glitch.
