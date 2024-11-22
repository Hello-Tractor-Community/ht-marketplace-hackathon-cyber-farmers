import { useState,useEffect,useRef, Dispatch, SetStateAction} from "react"
import { Alert, EmptyAlert, EmptySection, Success } from "./notifications"
import { FaPlus, FaTrash,FaPen, FaSearch, FaFilter, FaDownload, FaMemory, FaSdCard, FaSort, FaWifi, FaRegNewspaper } from "react-icons/fa"
import { useAppDispatch,useAppSelector } from "./states/hooks"
import {fullInventory,addInventory,updateInventory,deleteInventory,addSales,addStock, addExpenditure, deleteExpenditure, deleteStock, updateStock, updateExpenditure, deleteSales} from "./states/newReducer"
import { daySetter, reverseSorter, timeSetter ,filterArr,itemSearch, CategorySorter,priceSorter,yearLister} from "./utilities" 
import {InitDatabase,AddInventory as addInventoryDb,InventoriesByName, AddInventory, DeleteInventory, DeleteStock, DeleteExpenditure, UpdateInventory, UpdateStock, UpdateExpenditure, AddSale, AddStock, AddExpenditure, DeleteSale} from "../wailsjs/go/main/AgeDb";
import { main } from "../wailsjs/go/models"
import { PersonAge } from "../wailsjs/go/main/App"

// deformed bars: D10,D12,D8,
// Nails: roofing nails,fence nails
// cement: bamburi cement,blue triangle
// wallpass:
// binding wire,
// waterproof

export type Inventory = {
    ItemName: string,
    Type: string,
    Quantity: string | number,
    BuyingPrice: string | number,
    SellingPrice: string | number,
    ArrivalDate: string,
    Category: string
}

type SaleItem = {
    ItemName:string,
    ItemsSold: string | number,
    ProfitsCash:string | number,
    ProfitsPercentage:string | number,
    Category: string,
    Type: string,
}

export type StockItem = {
    ItemName:string,
    Type:string,
    Category:string,
    ItemsInStock: string | number,
    ItemFullStock: string | number
}


type ExpenditureItem = {
    ItemName:string,
    Type: string,
    Category: string,
    ItemsBought: string | number,
    Capital: string | number,
    Contribution: string | number,
    SellingPrice: string | number,
    BuyingPrice: string | number
}

const fakeInventory = [
    {
        ItemName: "Nyumba",
        Type: "3m",
        Quantity: 200,
        BuyingPrice: 870,
        SellingPrice: 1000,
        ArrivalDate: "25/02/2024.01:20:23",
        Category: "mabati"
    },
    {
        ItemName: "roofing",
        Type: "1kg",
        Quantity: 200,
        BuyingPrice: 200,
        SellingPrice: 250,
        ArrivalDate: "24/02/2024.01:20:23",
        Category: "nails"
    },
    {
        ItemName: "fencing",
        Type: "1kg",
        Quantity: 200,
        BuyingPrice: 300,
        SellingPrice: 350,
        ArrivalDate: "23/02/2024.01:20:23",
        Category: "nails"
    },
    {
        ItemName: "Nyumba",
        Type: "2.5m",
        Quantity: 200,
        BuyingPrice: 725,
        SellingPrice: 850,
        ArrivalDate: timeSetter(),
        Category: "mabati"
    },
    {
        ItemName: "Nyumba",
        Type: "2m",
        Quantity: 200,
        BuyingPrice: 580,
        SellingPrice: 700,
        ArrivalDate: "15/10/2024.01:20:23",
        Category: "mabati"
    },
    {
        ItemName: "bamburi",
        Type: "50kg",
        Quantity: 200,
        BuyingPrice: 820,
        SellingPrice: 860,
        ArrivalDate: "09/10/2024.01:20:23",
        Category: "cement"
    },
    {
        ItemName: "blue triangle",
        Type: "50kg",
        Quantity: 200,
        BuyingPrice: 850,
        SellingPrice: 900,
        ArrivalDate: "10/10/2024.01:20:23",
        Category: "cement"
    },
    {
        ItemName: "wallpass",
        Type: "3m",
        Quantity: 200,
        BuyingPrice: 2200,
        SellingPrice: 3000,
        ArrivalDate: "25/03/2024.01:20:23",
        Category: "wallpass"
    },
    {
        ItemName: "binding wire",
        Type: "3m",
        Quantity: 200,
        BuyingPrice: 3400,
        SellingPrice: 4000,
        ArrivalDate: "25/02/2023.01:20:23",
        Category: "binding wire"
    },
    {
        ItemName: "D1",
        Type: "3m",
        Quantity: 200,
        BuyingPrice: 1290,
        SellingPrice: 1350,
        ArrivalDate: "25/03/2022.01:20:23",
        Category: "deformed bars"
    },
    {
        ItemName: "D8",
        Type: "3m",
        Quantity: 200,
        BuyingPrice: 590,
        SellingPrice: 650,
        ArrivalDate: "25/09/2024.01:20:23",
        Category: "deformed bars"
    },
    {
        ItemName: "D10",
        Type: "3m",
        Quantity: 200,
        BuyingPrice: 880,
        SellingPrice: 950,
        ArrivalDate: timeSetter(),
        Category: "deformed bars"
    },
    {
        ItemName: "R6",
        Type: "3m",
        Quantity: 200,
        BuyingPrice: 200,
        SellingPrice: 250,
        ArrivalDate: timeSetter(),
        Category: "deformed bars"
    }
]

export function objectArrDuplicateHandler({arr,arrOfProperties}:{arr:Array<any>,arrOfProperties:Array<any>}){

    //so this method used 2 keys to differentiate the values
    // however shouldn't receive anything less than 3 parameters
    let newArr = arr
    let finalArray:Array<any> = []

    arrOfProperties.forEach(function(itemProperty,index){
        let newItemProperty = itemProperty
        const innerArr = [
            ...new Map(
                newArr.map(function(itemObject,index){
                    if(index != (arrOfProperties.length - 1)){
                        return [`${itemObject[newItemProperty]+itemObject[arrOfProperties[(arrOfProperties.length - 1)]]}` ,itemObject]
                    }
                    else{
                        return [`${itemObject[newItemProperty]+itemObject[arrOfProperties[0]]}`,itemObject]                  
                    }
                })
            ).values()]

        if(finalArray.length > 0){
            finalArray = finalArray.concat(innerArr)
        }
        else{
            finalArray = innerArr
        }
    })

    const newSet = new Set(finalArray)

    return Array.from(newSet)
    //return newArr
}

type InventoryDbRow = {
	ID :number,
    ItemName: string,
    ItemType: string,
    Quantity: number,
    BuyingPrice: number,
    SellingPrice: number,
    Date: string,
    ItemCategory: string
}

type Person = {
    Name: string,
    Age: number
}


//items sold will be in the sales analytics page not the inventory.
export function Inventory(){
    const reduxDispatch = useAppDispatch()
    const dbInventory = useAppSelector(state => state.inventory)
    //const reduxDispatch = useAppDispatch()
    const [popupState,setPopupState] = useState(<></>)
    const [searchLabelState,setSearchLabelState] = useState("")
    const [sortedInventory,setSortedInventory] = useState<Array<any>>([])
    const [inventoriesState,setInventoriesState] = useState<Array<any>>([])
    const [errorText,setErrorText] = useState("error displaying the inventory section")
    const [alertState,setAlertState] = useState(<></>)
    const [counterState,setCounterState] = useState<number>(0)
    const [filterInventory,setFilterInventory] = useState<Array<Inventory>>([])
    const [newInventoryState,setNewInventoryState] = useState(<></>)

    /*useEffect(function(){
        //fetch the Type directly from the main interface.
        setCounterState(prevState => prevState + 1)
        InventoriesByName("mabati").then(function(value:Array<main.InventoryDbRow>){
            if(value == null){
                //setAlertState(<Alert err="internal server error" counter={counterState}/>)
            }
            else{
                let newInventoryValue:Array<Inventory> = value.map(function(inventory,index){
                    return {
                        ItemName:inventory.ItemName,
                        Type:inventory.ItemType,
                        Quantity:inventory.Quantity,
                        BuyingPrice:inventory.BuyingPrice,
                        SellingPrice:inventory.SellingPrice,
                        ArrivalDate:inventory.Date,
                        Category:inventory.ItemCategory,        
                    }
                })
                reduxDispatch(fullInventory({inventory:newInventoryValue}))
            }
        }).catch(function(err){
            alert(`err found:   ${err}`)
            setAlertState(<Alert err="internal server error" counter={counterState}/>)
        })
            

    },[])*/


    //for setting the fetched data once the first time it renders
    useEffect(function(){
        //fetches from an api to get the current items and their details in the inventory.
        //reduxDispatch(fullInventory({inventory:fakeInventory}))
        
        /*let inventoryDecider = function(){
            let actualInventory:Array<Inventory> = []

            if(dbInventory.length > 0){
                actualInventory = dbInventory
                //works perfectly.
            }
            else{
                //logic for fetching from the db
                actualInventory = fakeInventory
            }   
            return actualInventory 
        }

        let actualInventory:Array<Inventory> = inventoryDecider()*/
        setInventoriesState([<EmptySection section="inventory" description="no inventory item to display yet"/>])

        if(dbInventory.length > 0){
            let newSet = new Set(dbInventory)
            let newArr = Array.from(newSet)
    
            // this is for the filter categories alone whereby I don't need it to change after selection
            setFilterInventory(objectArrDuplicateHandler({arr:newArr,arrOfProperties:["ItemName","Type","Category"]}).sort(reverseSorter))
    
            setSortedInventory(objectArrDuplicateHandler({arr:newArr,arrOfProperties:["ItemName","Type","Category"]}).sort(reverseSorter))      
        }


    },[dbInventory])

    // updates each time the inventory array state changes
    useEffect(function(){

        // change this to point to the actual inventory
        
        //we do this because once the array has been sorted it returns a new array but does not modify the original array hence causing access issues.
        setNewInventoryState(
            <button onClick={(e) => setNewInventoryState(<NewInventory setAlertState={setAlertState} setSortedInventory={setSortedInventory} sortedInventory={sortedInventory}/>)} className="font-medium px-4 py-2 mb-3 mr-4 border-2 rounded-lg border-blue-600 text-lg w-fit flex gap-2 items-center dark:text-white text-black"><FaPlus className="text-blue-600"/> <span>New Item</span></button>
        )


        if(sortedInventory.length > 0){
            setInventoriesState(sortedInventory.map(function(item,index){
                return <InventoryItem index={index} sortedInventory={sortedInventory} setSortedInventory={setSortedInventory} key={index} Category={item.Category} ItemType={item.Type} ItemName={item.ItemName} ArrivalDate={item.ArrivalDate} BuyingPrice={Number(item.BuyingPrice)} SellingPrice={Number(item.SellingPrice)} Quantity={Number(item.Quantity)}/>        
            }))    
        }
        else{
            setInventoriesState([<EmptySection section="inventory" description="no inventory item to display yet"/>])
        }


    },[sortedInventory])

    let setCreator = function(arr:Array<Inventory>) : Array<string>{
        let mappedArray = arr.map((inventory,index) => inventory.Category)
        //added the all string parameter for bringing all the inventories
        let newArr = ["all"].concat(mappedArray)
        let newSet = new Set(newArr)
        return Array.from(newSet) 
    }

    let sortHandler = function(e:any){
        e.preventDefault()
        if(e.target.value == "date"){
            setSortedInventory(objectArrDuplicateHandler({arr:sortedInventory,arrOfProperties:["ItemName","Type","Category"]}).sort(reverseSorter))
            /*setInventoriesState(sortedInventory.map(function(item,index){
                return <InventoryItem index={index} sortedInventory={sortedInventory} setSortedInventory={setSortedInventory} key={index} Category={item.Category} ItemType={item.Type} ItemName={item.ItemName} ArrivalDate={item.ArrivalDate} BuyingPrice={item.BuyingPrice} SellingPrice={item.SellingPrice} Quantity={item.Quantity}/>        
            }))*/
        }
        else if(e.target.value == "Category"){
            setSortedInventory(objectArrDuplicateHandler({arr:sortedInventory,arrOfProperties:["ItemName","Type","Category"]}).sort(CategorySorter))
            /*setInventoriesState(sortedInventory.map(function(item,index){
                return <InventoryItem index={index} sortedInventory={sortedInventory} setSortedInventory={setSortedInventory} key={index} Category={item.Category} ItemType={item.Type} ItemName={item.ItemName} ArrivalDate={item.ArrivalDate} BuyingPrice={item.BuyingPrice} SellingPrice={item.SellingPrice} Quantity={item.Quantity}/>        
            }))*/
        }
        else if(e.target.value == "price"){
            setSortedInventory(objectArrDuplicateHandler({arr:sortedInventory,arrOfProperties:["ItemName","Type","Category"]}).sort(priceSorter))
            /*setInventoriesState(sortedInventory.map(function(item,index){
                return <InventoryItem index={index} sortedInventory={sortedInventory} setSortedInventory={setSortedInventory} key={index} Category={item.Category} ItemType={item.Type} ItemName={item.ItemName} ArrivalDate={item.ArrivalDate} BuyingPrice={item.BuyingPrice} SellingPrice={item.SellingPrice} Quantity={item.Quantity}/>        
            }))*/
        }
    }

    /*let sortHandler = function(e:any){
        e.preventDefault()
        if(e.target.value == "date"){
            setSortedInventory(objectArrDuplicateHandler({arr:sortedInventory,arrOfProperties:["ItemName","Type","Category"]}).sort(reverseSorter))
            setInventoriesState(sortedInventory.map(function(item,index){
                return <InventoryItem index={index} sortedInventory={sortedInventory} setSortedInventory={setSortedInventory} key={index} Category={item.Category} ItemType={item.Type} ItemName={item.ItemName} ArrivalDate={item.ArrivalDate} BuyingPrice={item.BuyingPrice} SellingPrice={item.SellingPrice} Quantity={item.Quantity}/>        
            }))
        }
        else if(e.target.value == "Category"){
            setSortedInventory(objectArrDuplicateHandler({arr:sortedInventory,arrOfProperties:["ItemName","Type","Category"]}).sort(CategorySorter))
            setInventoriesState(sortedInventory.map(function(item,index){
                return <InventoryItem index={index} sortedInventory={sortedInventory} setSortedInventory={setSortedInventory} key={index} Category={item.Category} ItemType={item.Type} ItemName={item.ItemName} ArrivalDate={item.ArrivalDate} BuyingPrice={item.BuyingPrice} SellingPrice={item.SellingPrice} Quantity={item.Quantity}/>        
            }))
        }
        else if(e.target.value == "price"){
            setSortedInventory(objectArrDuplicateHandler({arr:sortedInventory,arrOfProperties:["ItemName","Type","Category"]}).sort(priceSorter))
            setInventoriesState(sortedInventory.map(function(item,index){
                return <InventoryItem index={index} sortedInventory={sortedInventory} setSortedInventory={setSortedInventory} key={index} Category={item.Category} ItemType={item.Type} ItemName={item.ItemName} ArrivalDate={item.ArrivalDate} BuyingPrice={item.BuyingPrice} SellingPrice={item.SellingPrice} Quantity={item.Quantity}/>        
            }))
        }
    }*/

    let filterHandler = function(e:any){
        e.preventDefault()
        const filterChoice = e.target.value
        const newFilteredArr = filterArr(objectArrDuplicateHandler({arr:dbInventory,arrOfProperties:["ItemName","Type","Category"]}).sort(reverseSorter),filterChoice)
        setSortedInventory(newFilteredArr)
        setInventoriesState(sortedInventory.map(function(item,index){
            return <InventoryItem index={index} sortedInventory={sortedInventory} setSortedInventory={setSortedInventory} key={index} Category={item.Category} ItemType={item.Type} ItemName={item.ItemName} ArrivalDate={item.ArrivalDate} BuyingPrice={item.BuyingPrice} SellingPrice={item.SellingPrice} Quantity={item.Quantity}/>
        }))
    }

    let searchHandler = function(e:any){
        e.preventDefault()
        const searchString = e.target.value
        const newSearchArr = itemSearch(sortedInventory,searchString)
        if(searchString.length == 0){
            // one that doesn't change
            setSortedInventory(filterInventory)
        }
        else if(newSearchArr.length > 0){
            setSortedInventory(newSearchArr)
        }
        else{  
            setInventoriesState([<EmptyAlert section="inventory" description="no items found from your search"/>])    
        }
    }

    //arrival date will be calculated by the system, the moment the data is keyed into the system as a new order
    return(
        <div className="w-full relative h-screen text-center dark:text-white text-black ">
            <h1 className="dark:text-white text-black text-left text-xl font-bold mb-4">Inventory</h1>
            {alertState}
            <div className="flex justify-between">
                <div className="w-fit">
                {newInventoryState}
                </div>
                <div className="w-fit h-auto items-center flex">
                    <button className=" rounded-lg px-3 py-1 flex gap-2 items-center"><span className="dark:text-white text-black">year</span></button>
                    <select  name="periodSelection" id="periodSelection" className="border-2 border-blue-600 px-3 py-1 rounded-lg h-fit flex bg-transparent gap-2 items-center">
                        {
                        yearLister(filterInventory,"ArrivalDate").map(function(item,index){
                            return  <option value={item} className="bg-transparent">{item}</option>
                        })
                        }
                    </select>
                    <button className=" rounded-lg px-3 py-1 flex gap-2 items-center"><span className="dark:text-white text-black">month</span></button>
                    <select  name="periodSelection" id="periodSelection" className="border-2 border-blue-600 px-3 py-1 rounded-lg h-fit flex bg-transparent gap-2 items-center">
                        {setCreator(filterInventory).map(function(item,index){
                            return  <option value={item} className="bg-transparent">{item}</option>
                        })}
                    </select>
                    <button className=" rounded-lg px-3 py-1 flex gap-2 items-center"><span className="dark:text-white text-black">week</span></button>
                    <select  name="periodSelection" id="periodSelection" className="border-2 border-blue-600 px-3 py-1 rounded-lg h-fit  flex bg-transparent gap-2 items-center">
                        {setCreator(filterInventory).map(function(item,index){
                            return  <option value={item} className="bg-transparent">{item}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className="w-full flex justify-between mb-8">
                <div className="w-[20rem] relative h-[2rem] flex justify-between items-center px-3 rounded-xl border-2 border-blue-600">
                    <input type="text" onChange={searchHandler} placeholder="search" className="w-5/6 bg-transparent outline-none border-none"/>
                    <FaSearch/>
                </div>
                
                <div className="w-auto h-[2rem] dark:text-white text-black flex gap-4 items-center">
                    <button className=" rounded-lg px-3 py-1 flex gap-2 items-center"><span>sort by</span><FaWifi className="text-green-600"/></button>
                    <select onChange={sortHandler} className="border-2 border-blue-600 px-3 py-1 rounded-lg flex bg-transparent gap-2 items-center">
                        <option value="date">date</option>
                        <option value="Category">Category</option>
                        <option value="price">price</option>
                    </select>
                    <button className=" rounded-lg px-3 py-1 flex gap-2 items-center"><span className="dark:text-white text-black">filter</span><FaFilter className="text-green-600"/></button>
                    <select onChange={filterHandler} name="periodSelection" id="periodSelection" className="border-2 border-blue-600 px-3 py-1 rounded-lg flex bg-transparent gap-2 items-center">
                        {setCreator(filterInventory).map(function(item,index){
                            return  <option value={item} className="bg-transparent">{item}</option>
                        })}
                    </select>
                    <button className="border-2 border-blue-600 rounded-lg px-3 py-1 flex gap-2 items-center"><FaDownload className="text-blue-600"/><span>export</span></button>
                </div>
            </div>
            <div className="w-full h-2/3 bg-transparent overflow-auto">
                <div className="w-full grid grid-cols-7 gap-6 justify-items-start font-bold dark:text-white text-black border-b-2 dark:border-white border-black">
                        {/*create a table here */}
                        <div>Item Name</div>      
                        <div>Type</div>
                        <div>Category</div>
                        <div>Full Stock</div>
                        <div>buying price</div>
                        <div>selling price</div>
                        <div>arrival date</div>
                </div>
                {inventoriesState}
            </div>
        </div>
    )
}

// add the ability to edit and delete the inventory item, remember for the edits, I need it to only edit 3 fields which are the items in stock, buying price and selling price.
// the rest of the fields should not be input elements
export function InventoryItem({setSortedInventory,sortedInventory,index,ItemName,ItemType,ArrivalDate,Quantity,BuyingPrice,SellingPrice,Category}:{sortedInventory:Array<any>,index:number,setSortedInventory:Dispatch<SetStateAction<Array<any>>>,ItemName:string,ItemType:string,Category:string,Quantity:number,BuyingPrice:number,SellingPrice:number,ArrivalDate:string}){
    const inventory = useAppSelector(state => state.inventory)
    const stock = useAppSelector(state => state.stock)
    const expenditure = useAppSelector(state => state.expenditure)
    const sales = useAppSelector(state => state.sales)
    const reduxDispatch = useAppDispatch()
    const [saveState,setSaveState] = useState(<></>)
    const [ArrivalDateState,setArrivalDateState] = useState("")
    const todayRef = useRef("")
    const [editStyle,setEditStyle] = useState({})
    const [QuantityState,setQuantityState] = useState<number>(0)
    const [buyingState,setBuyingState] = useState<number>(0)
    const [sellingState,setSellingState] = useState<number>(0)
    const [countState,setCountState] = useState(1)
    const [alertState,setAlertState] = useState(<></>)
    const [totalItemsState,setTotalItemsState] = useState<number>(0)

    useEffect(function(){
        setSellingState(Number(SellingPrice))
    },[SellingPrice])
    useEffect(function(){
        setQuantityState(Number(Quantity))
    },[setQuantityState])
    useEffect(function(){
        setBuyingState(Number(BuyingPrice))
    },[BuyingPrice])


    useEffect(function(){
        // it's really important if you're depending on a partcicular prop to change the state that you add it as a useEffect dependency.
        todayRef.current = timeSetter()
        setInterval(function(){
            todayRef.current = timeSetter()
        },60000)
        
        //conditionals for setting the days and the time.
        if(todayRef.current.split(".")[0].split("/")[0] == ArrivalDate.split(".")[0].split("/")[0]){
            setArrivalDateState(`today ${ArrivalDate.split(".")[1].split(":")[0]}:${ArrivalDate.split(".")[1].split(":")[1]}`)        
        }
        else if(((Number(todayRef.current.split(".")[0].split("/")[0]) - Number(ArrivalDate.split(".")[0].split("/")[0])) < 7 ) && (todayRef.current.split(".")[0].split("/")[1] == ArrivalDate.split(".")[0].split("/")[1])){
            let day = daySetter(Number(todayRef.current.split(".")[0].split("/")[0]) - Number(ArrivalDate.split(".")[0].split("/")[0]))
            setArrivalDateState(`${day} ${ArrivalDate.split(".")[1].split(":")[0]}:${ArrivalDate.split(".")[1].split(":")[1]}`)                
        }
        else{
            setArrivalDateState(`${ArrivalDate.split(".")[0]} ${ArrivalDate.split(".")[1].split(":")[0]}:${ArrivalDate.split(".")[1].split(":")[1]}`)                
        }
    },[ArrivalDate])


    let editHandler = function(e:any){
        e.preventDefault()
        setEditStyle({
            border: "0.2rem solid green",
            borderRadius: "0.5rem"
        })        
    }
    let deleteHandler = function(e:any){
        e.preventDefault()
        setCountState(prevState => prevState + 1)
        let findIndexHandler = function(value:Inventory,index:number,array:Array<Inventory>){
            return (value.ItemName.toLowerCase() == ItemName.toLowerCase() && value.Type.toLowerCase() == ItemType.toLowerCase()) && value.Category.toLowerCase() == Category.toLowerCase() 
        }
        let inventoryIndex = inventory.findIndex(findIndexHandler)

        // delete for redux
        reduxDispatch(deleteInventory({index:inventoryIndex}))
        //for the db
        let newDbInventory = new main.Inventory()
        newDbInventory.ItemName = ItemName.toLowerCase()
        newDbInventory.ItemType = ItemType.toLowerCase()
        newDbInventory.Quantity = String(Quantity) 
        newDbInventory.SellingPrice = String(SellingPrice)
        newDbInventory.BuyingPrice = String(BuyingPrice)
        newDbInventory.ItemCategory = Category.toLowerCase()
        newDbInventory.Date = ArrivalDate

        //for the stock
        let stockIndexHandler = function(value:StockItem,index:number,array:Array<StockItem>){
            return (value.ItemName.toLowerCase() == ItemName.toLowerCase() && value.Type.toLowerCase() == ItemType.toLowerCase()) && value.Category.toLowerCase() == Category.toLowerCase() 
        }
        let stockIndex = stock.findIndex(stockIndexHandler)
        //update the stock
        reduxDispatch(deleteStock({index:stockIndex}))
        //for the db
        let newDbStock = new main.Stock(stock[stockIndex])  
        

        //for the expenditure
        let expenditureIndexHandler = function(value:ExpenditureItem,index:number,array:Array<ExpenditureItem>){
            return (value.ItemName.toLowerCase() == ItemName.toLowerCase() && value.Type.toLowerCase() == ItemType.toLowerCase()) && value.Category.toLowerCase() == Category.toLowerCase() 
        }
        let expenditureIndex = expenditure.findIndex(expenditureIndexHandler)

        reduxDispatch(deleteExpenditure({index:expenditureIndex}))
        //for the db
        let newDbExpenditure = new main.Expenditure(expenditure[expenditureIndex])  


        //for the sale item
        let saleIndexHandler = function(value:SaleItem,index:number,array:Array<SaleItem>){
            return (value.ItemName.toLowerCase() == ItemName.toLowerCase() && value.Type.toLowerCase() == ItemType.toLowerCase()) && value.Category.toLowerCase() == Category.toLowerCase() 
        }
        let saleIndex = sales.findIndex(saleIndexHandler)

        reduxDispatch(deleteSales({index:saleIndex}))
        //for the db
        let newDbSale = new main.Sale(sales[saleIndex])  





        setSortedInventory((previousState) => {
            return previousState.slice(0,index).concat(previousState.slice((index+1)))
        })
        
        setCountState((countState + 1))
        setAlertState(<Success success="item deleted successuly" counter={countState} />)

        
        DeleteInventory(newDbInventory).then(function(value){
            setAlertState(<Success success="item deleted succesfully" counter={countState}/>)
            DeleteStock(newDbStock).then(function(value){
                //setAlertState(<Success success="item deleted succesfully" counter={countState}/>)
                DeleteExpenditure(newDbExpenditure).then(function(value){
                    //setAlertState(<Success success="item deleted succesfully" counter={countState}/>)
                    DeleteSale(newDbSale).then(function(value){
                        //setAlertState(<Success success="item deleted succesfully" counter={countState}/>)
                    }).catch(function(err){
                        setAlertState(<Alert err="internal server error" counter={countState}/>)
                    })                    
                }).catch(function(err){
                    setAlertState(<Alert err="internal server error" counter={countState}/>)
                })                
            }).catch(function(err){
                setAlertState(<Alert err="internal server error" counter={countState}/>)
            })    
        }).catch(function(err){
            setAlertState(<Alert err="internal server error" counter={countState}/>)
        })

    }

    let QuantityHandler = function(e:any){
        e.preventDefault()
        let Quantity = e.target.value
        setQuantityState(Number(Quantity))
        setSaveState(
            <EditSave totalItems={totalItemsState} setEditStyle={setEditStyle} setSaveState={setSaveState} ItemName={ItemName} Type={ItemType} Category={Category} ArrivalDate={ArrivalDate} Quantity={QuantityState} BuyingPrice={buyingState} SellingPrice={sellingState}/>
        )
    }
    let buyingHandler = function(e:any){
        e.preventDefault()
        setBuyingState(Number(e.target.value))
        setSaveState(        
            <EditSave totalItems={totalItemsState} setEditStyle={setEditStyle} setSaveState={setSaveState} ItemName={ItemName} Type={ItemType} Category={Category} ArrivalDate={ArrivalDate} Quantity={QuantityState} BuyingPrice={buyingState} SellingPrice={sellingState}/>
        )
    
    }
    let sellingHandler = function(e:any){
        e.preventDefault()
        setSellingState(Number(e.target.value))
        setSaveState(        
            <EditSave totalItems={totalItemsState} setEditStyle={setEditStyle} setSaveState={setSaveState} ItemName={ItemName} Type={ItemType} Category={Category} ArrivalDate={ArrivalDate} Quantity={QuantityState} BuyingPrice={buyingState} SellingPrice={sellingState}/>
        )    
    }

    let editSubmitHandler = function(e:any){
        e.preventDefault()
        
        let editContents = {
            Quantity:e.target.Quantity.value,
            BuyingPrice:e.target.bPrice.value,
            SellingPrice:e.target.sPrice.value
        }

        let updatedInventory:Inventory = {
            ItemName:ItemName.toLowerCase(),
            Type:ItemType.toLowerCase(),
            ArrivalDate,
            Category:Category.toLowerCase(),
            ...editContents
        }

        setEditStyle({
            border: "none",
            borderRadius: "0rem",
            outline: "none",
            backgroundColor:"transparent"
        })       
        //for the inventory
        //finding the inventory index
        let findIndexHandler = function(value:Inventory,index:number,array:Array<Inventory>){
            return (value.ItemName.toLowerCase() == ItemName.toLowerCase() && value.Type.toLowerCase() == ItemType.toLowerCase()) && value.Category.toLowerCase() == Category.toLowerCase() 
        }
        let inventoryIndex = inventory.findIndex(findIndexHandler)

        //for the stock
        let stockIndexHandler = function(value:StockItem,index:number,array:Array<StockItem>){
            return (value.ItemName.toLowerCase() == ItemName.toLowerCase() && value.Type.toLowerCase() == ItemType.toLowerCase()) && value.Category.toLowerCase() == Category.toLowerCase() 
        }
        let stockIndex = stock.findIndex(stockIndexHandler)
        let updatedStock:StockItem = {
            ItemName:ItemName.toLowerCase(),
            Type:ItemType.toLowerCase(),
            Category:Category.toLowerCase(),
            //can not modify this
            ItemsInStock:stock[stockIndex].ItemsInStock,
            //modifies this
            ItemFullStock:Quantity
        }

        //for the expenditure
        let expenditureIndexHandler = function(value:ExpenditureItem,index:number,array:Array<ExpenditureItem>){
            return (value.ItemName.toLowerCase() == ItemName.toLowerCase() && value.Type.toLowerCase() == ItemType.toLowerCase()) && value.Category.toLowerCase() == Category.toLowerCase() 
        }
        let expenditureIndex = expenditure.findIndex(expenditureIndexHandler)
        let totalItemsRaw = inventory.reduce(function(total,inventoryItem){
            return total + Number(inventoryItem.Quantity)
        },0)
        let quantityDifference = (Number(inventory[inventoryIndex].Quantity) + (Number(Quantity) - Number(inventory[inventoryIndex].Quantity)))
        
        
        let totalItems = (totalItemsRaw + quantityDifference)
        setTotalItemsState(totalItems)

        let updatedExpenditure:ExpenditureItem = {
            ItemName:ItemName.toLowerCase(),
            Type:ItemType.toLowerCase(),
            Category:Category.toLowerCase(),
            ItemsBought:expenditure[expenditureIndex].ItemsBought,
            Capital:(Number(Quantity) * Number(BuyingPrice)),
            Contribution:((Number(Quantity)/Number(totalItems)) * 100),
            SellingPrice,
            BuyingPrice,
        }


        if((editContents.BuyingPrice != null && editContents.SellingPrice != null) && editContents.Quantity != null){
            setSaveState(<></>)
            setCountState((countState + 1))
            // send them to the db since they'll be already updated in the frontend so that they can be updated in the backend as well
            setAlertState(<Success success="inventory changes updated succesfuly" counter={countState}/>)
            
            reduxDispatch(updateInventory({index:inventoryIndex,inventory:updatedInventory}))
            let dbUpdatedInventory = new main.Inventory()
            dbUpdatedInventory.ItemName = updatedInventory.ItemName,
            dbUpdatedInventory.ItemCategory= updatedInventory.Category,
            dbUpdatedInventory.ItemType= updatedInventory.Type,
            dbUpdatedInventory.Quantity = String(updatedInventory.Quantity),
            dbUpdatedInventory.BuyingPrice = String(updatedInventory.BuyingPrice),
            dbUpdatedInventory.SellingPrice = String(updatedInventory.SellingPrice),
            dbUpdatedInventory.Date = updatedInventory.ArrivalDate
            UpdateInventory(dbUpdatedInventory).then(function(value){
                //setAlertState(<Success success="item updated succesfully" counter={countState}/>)
                UpdateStock(new main.Stock(updatedStock)).then(function(value){
                    //setAlertState(<Success success="item updated succesfully" counter={countState}/>)
                    UpdateExpenditure(new main.Expenditure(updatedExpenditure)).then(function(value){
                        //setAlertState(<Success success="item updated succesfully" counter={countState}/>)
                    }).catch(function(err){
                        setAlertState(<Alert err="internal server error" counter={countState}/>)
                    })        
                }).catch(function(err){
                    setAlertState(<Alert err="internal server error" counter={countState}/>)
                })     
            }).catch(function(err){
                setAlertState(<Alert err="internal server error" counter={countState}/>)
            })
    

            //for the stock
            reduxDispatch(updateStock({index:stockIndex,stock:updatedStock}))
            //for the expenditure
            reduxDispatch(updateExpenditure({index:expenditureIndex,expenditure:updatedExpenditure}))   
        }
    }

    // before saving a new item ensure that it's not in the db
    return(
        <div className="w-full h-[6rem] flex flex-col gap-4 border-b-2 dark:text-white text-black border-blue-600">
            {alertState}
            <form onSubmit={editSubmitHandler} className="w-full h-[2rem] grid grid-cols-7 gap-6 justify-items-start place-items-start text-left dark:text-white text-black">
                    <div>
                        {ItemName.toUpperCase()}
                    </div>
                    <div>
                        {ItemType.toUpperCase()}
                    </div>
                    <div>
                        {Category.toUpperCase()}
                    </div>
                    <div>
                        {/*Quantity in terms of kilos or numnbers or odiver weights like kgs,metres,litres, so find a library to do divat conversion or input interpretation or acceptance*/}
                        {/*have a state change to track it whenever it changes and upload it to the db whenever it chanhes*/}
                        {/*items sold and Quantity will be updated by the orders section whereby the items sold increases while the Quantity in stock decreses.*/}
                        {/*since its a role based system the cashiers or rather the workers can only update the orders section whereby they place orders  however they can't modify the inventory section*/}
                        <input name="Quantity" style={editStyle} onChange={QuantityHandler}  type="number" className="w-24 px-2 bg-transparent" value={QuantityState}/>
                    </div>
                    <div className="flex">
                        <span>ksh.</span>
                        <input name="bPrice" style={editStyle} onChange={buyingHandler} type="text" className="w-24 px-2 bg-transparent dark:text-white text-black" value={buyingState}/>
                    </div>
                    <div className="flex">
                        <span>ksh.</span>
                        <input name="sPrice" style={editStyle} onChange={sellingHandler} type="text" className="w-24 px-2 bg-transparent dark:text-white text-black" value={sellingState}/>
                    </div>
                    <div>
                        {ArrivalDateState}
                    </div>
                    <button type="submit" className="hidden">submit</button>
            </form>
            <div className="w-full px-4 h-[2rem] flex items-center justify-end gap-4 justify-self-end">
                {saveState}
                <div className="flex gap-4 justify-self-end">
                    <button onClick={editHandler} className="font-medium px-4 py-2 border-2  rounded-lg border-green-600 text-lg w-fit flex gap-2 items-center dark:text-white text-black"><FaPen className="text-green-600"/><span>Edit</span></button>
                    <button onClick={deleteHandler} className="font-medium px-4 py-2 border-2 rounded-lg border-red-600 text-lg w-fit flex gap-2 items-center dark:text-white text-black"><FaTrash className="text-red-600"/><span>Delete</span> </button>
                </div>
            </div>        
        </div>
    )
}

// the details should actually be an object with all the values current state.
export function EditSave({totalItems,setEditStyle,setSaveState,ItemName,Quantity,BuyingPrice,SellingPrice,Category,Type,ArrivalDate}:{totalItems:number,setEditStyle:Dispatch<SetStateAction<{}>>,setSaveState:Dispatch<SetStateAction<JSX.Element>>,ArrivalDate:string,Type:string,Category:string,ItemName:string,Quantity:number,BuyingPrice:number,SellingPrice:number}){
    const reduxDispatch = useAppDispatch()
    const stock = useAppSelector(state => state.stock)
    const expenditure = useAppSelector(state => state.expenditure) 
    const inventory = useAppSelector(state => state.inventory)


    let saveHandler = function(e:any){
        e.preventDefault()
        let updatedInventory:Inventory = {
            ItemName:ItemName.toLowerCase(),
            Quantity,
            BuyingPrice,
            SellingPrice,
            Category:Category.toLowerCase(),
            Type:Type.toLowerCase(),
            ArrivalDate
        }
        setEditStyle({
            border: "none",
            borderRadius: "0rem"
        })       
        setSaveState(<></>)

        //for the stock
        let stockIndexHandler = function(value:StockItem,index:number,array:Array<StockItem>){
            return (value.ItemName.toLowerCase() == ItemName.toLowerCase() && value.Type.toLowerCase() == Type.toLowerCase()) && value.Category.toLowerCase() == Category.toLowerCase() 
        }
        let stockIndex = stock.findIndex(stockIndexHandler)
        let updatedStock:StockItem = {
            ItemName:ItemName.toLowerCase(),
            Type:Type.toLowerCase(),
            Category:Category.toLowerCase(),
            //can not modify this
            ItemsInStock:stock[stockIndex].ItemsInStock,
            //modifies this
            ItemFullStock:Quantity
        }
        
        //for the expenditure
        let expenditureIndexHandler = function(value:ExpenditureItem,index:number,array:Array<ExpenditureItem>){
            return (value.ItemName.toLowerCase() == ItemName.toLowerCase() && value.Type.toLowerCase() == Type.toLowerCase()) && value.Category.toLowerCase() == Category.toLowerCase() 
        }
        let expenditureIndex = expenditure.findIndex(expenditureIndexHandler)
        let updatedExpenditure:ExpenditureItem = {
            ItemName:ItemName.toLowerCase(),
            Type:Type.toLowerCase(),
            Category:Category.toLowerCase(),
            ItemsBought:expenditure[expenditureIndex].ItemsBought,
            Capital:(Number(Quantity) * Number(BuyingPrice)),
            Contribution:((Number(Quantity)/Number(totalItems)) * 100),
            SellingPrice,
            BuyingPrice,
        }

        
        
        let findIndexHandler = function(value:Inventory,index:number,array:Array<Inventory>){
            return (value.ItemName.toLowerCase() == ItemName.toLowerCase() && value.Type.toLowerCase() == Type.toLowerCase()) && value.Category.toLowerCase() == Category.toLowerCase() 
        }

        let inventoryIndex = inventory.findIndex(findIndexHandler)
        reduxDispatch(updateInventory({index:inventoryIndex,inventory:updatedInventory}))
        let dbUpdatedInventory = new main.Inventory()
        dbUpdatedInventory.ItemName = updatedInventory.ItemName.toLowerCase(),
        dbUpdatedInventory.ItemCategory= updatedInventory.Category.toLowerCase(),
        dbUpdatedInventory.ItemType= updatedInventory.Type.toLowerCase(),
        dbUpdatedInventory.Quantity = String(updatedInventory.Quantity),
        dbUpdatedInventory.BuyingPrice = String(updatedInventory.BuyingPrice),
        dbUpdatedInventory.SellingPrice = String(updatedInventory.SellingPrice),
        dbUpdatedInventory.Date = updatedInventory.ArrivalDate
        UpdateInventory(dbUpdatedInventory).then(function(value){
            //setAlertState(<Success success="item updated succesfully" counter={countState}/>)
            UpdateStock(new main.Stock(updatedStock)).then(function(value){
                //setAlertState(<Success success="item updated succesfully" counter={countState}/>)
                UpdateExpenditure(new main.Expenditure(updatedExpenditure)).then(function(value){
                    //setAlertState(<Success success="item updated succesfully" counter={countState}/>)
                }).catch(function(err){
                    //setAlertState(<Alert err="internal server error" counter={countState}/>)
                })        
            }).catch(function(err){
                //setAlertState(<Alert err="internal server error" counter={countState}/>)
            }) 
    
        }).catch(function(err){
            //setAlertState(<Alert err="internal server error" counter={countState}/>)
        })

        //for the stock
        reduxDispatch(updateStock({index:stockIndex,stock:updatedStock}))
        //for the expenditure
        reduxDispatch(updateExpenditure({index:expenditureIndex,expenditure:updatedExpenditure}))   
    }

    return(
        <div className="justify-self-start" onClick={saveHandler}>
            <button className="font-medium px-4 py-2 border-2  rounded-lg border-green-600 text-lg w-fit flex gap-2 items-center dark:text-white text-black"><FaSdCard className="text-yellow-600"/><span>save</span></button>
        </div>
    )
}


// pops up to add more data like dive full stock Quantity and odiver details needed for smoodiv running of dive system
// has a save button to confirm changes.
export function PopupInventory(){
    //this is where the ArrivalDate is calculated automatically by the system, the moment the user saves the data.
    
    // before saving a new item ensure that its not in the db
    let duplicateHandler = function(items:Array<any>){
        //returns a boolean true or false to determine if the value is already present and hence notify the user of the same
        // hence notify the user of the same
    }

    let popSubmitHandler = function(e:any){
        e.preventDefault()
        //calculate the ArrivalDate to be sent to the db and to the inventory and to be used for other calculations
        const orderDate = ""

        //convert the item name Type and the Category to uppercase, inshort every string to uppercase.
        const ItemType = e.target.ItemName.value.toUppercase()
        const Category = e.target.Category.value.toUppercase()
        const Quantity = e.target.Quantity.value.toUppercase()
        // this date is what will be stored in the db.
        const todayDate = timeSetter()
    
    }

    return(
        <div className="flex flex-col w-[30rem] h-[40rem] backdrop-blur-xl bg-transparent">
            <h1 className="font-bold">Enter your new item</h1>
            <form onSubmit={popSubmitHandler}>
                <div className="w-4/6 h-12 flex gap-4">
                    <label>Item Name</label>
                    <input name="ItemName" id="ItemName" type="text" className="w-2/3 h-8 border-2 border-blue-600 rounded-lg"/>
                </div>
                <div className="w-4/6 h-12 flex gap-4">
                    <label>Quantity</label>
                    <input name="Quantity" id="Quantity" type="text" className="w-2/3 h-8 border-2 border-blue-600 rounded-lg"/>
                </div>
                <div className="w-4/6 h-12 flex gap-4">
                    <label>Buying price</label>
                    <input name="bPrice" id="bPrice" type="text" className="w-2/3 h-8 border-2 border-blue-600 rounded-lg"/>
                </div>
                <div className="w-4/6 h-12 flex gap-4">
                    <label>selling price</label>
                    <input name="sPrice" id="sPrice" type="text" className="w-2/3 h-8 border-2 border-blue-600 rounded-lg"/>
                </div>
                <div className="w-4/6 h-12 flex gap-4">
                    <label>Category</label>
                    <input name="Category" id="Category" type="text" className="w-2/3 h-8 border-2 border-blue-600 rounded-lg"/>
                </div>
                <div className="w-4/6 h-12 flex gap-4">
                {/*this will be used in calculations of stock emergency but wont be displayed*/}
                    <label>Full stock</label>
                    <input name="stock" id="stock" type="text" className="w-2/3 h-8 border-2 border-blue-600 rounded-lg"/>
                </div>
                <button type="submit" className="w-fit px-3 py-2 border-2 border-green-600 rounded-lg">save</button>
            </form>
        </div>
    )
}


export function NewInventory({setAlertState,setSortedInventory,sortedInventory}:{setAlertState:Dispatch<SetStateAction<JSX.Element>>,setSortedInventory:Dispatch<SetStateAction<Inventory[]>>,sortedInventory:Array<Inventory>}){
    const reduxDispatch = useAppDispatch()
    const dbInventory = useAppSelector(state => state.inventory) 
    const [counter,setCounter] = useState(1)
    // add zod for Typesafety later on

    let newOrderHandler = function(e:any){
        e.preventDefault()
        
        let ItemName = e.target.ItemName.value.toLowerCase()
        let Quantity = e.target.noOfItems.value
        // do a Quantity times the price stored in the stock management system.
        // I'm about to optimize it right about now.
        let  Type = e.target.ItemType.value.toLowerCase()
        let BuyingPrice = e.target.BuyingPrice.value
        let SellingPrice = e.target.SellingPrice.value
        let Category = e.target.Category.value.toLowerCase()
        let ArrivalDate = timeSetter()
        let reducedTotal = dbInventory.reduce(function(total,inventoryItem){
            return total + Number(inventoryItem.Quantity)
        },0)
        let totalItems = (Number(Quantity) + Number(reducedTotal)) 

        let newInventory:Inventory = {
            Type,
            ItemName,
            // same as no of items
            Quantity,
            BuyingPrice,
            SellingPrice,
            Category,
            ArrivalDate,
        }

        let findIndexHandler = function(value:Inventory,index:number,array:Array<Inventory>){
            return (value.ItemName.toLowerCase() == ItemName.toLowerCase() && value.Type.toLowerCase() == Type.toLowerCase()) && value.Category.toLowerCase() == Category.toLowerCase() 
        }
        let inventoryIndex = dbInventory.findIndex(findIndexHandler)

        if(inventoryIndex != -1){
            setCounter(prevState => prevState + 1)
            setAlertState(<Alert err="item already exists , kindly key in a new item" counter={counter}/>)
        }
        else{
            //for the db
            let newDbInventory = new main.Inventory()
            newDbInventory.ItemName = ItemName.toLowerCase()
            newDbInventory.ItemType = Type.toLowerCase()
            newDbInventory.Quantity = Quantity 
            newDbInventory.SellingPrice = SellingPrice
            newDbInventory.BuyingPrice = BuyingPrice
            newDbInventory.ItemCategory = Category.toLowerCase()
            newDbInventory.Date = ArrivalDate


            //for the sale
            let newSale:SaleItem = {
                Type:Type.toLowerCase(),
                ItemName:ItemName.toLowerCase(),
                Category:Category.toLowerCase(),
                ItemsSold: 0,
                ProfitsCash: 0,
                ProfitsPercentage: 0
            }        

            //for the stock
            let newStock:StockItem = {
                ItemName:ItemName.toLowerCase(),
                Type:Type.toLowerCase(),
                Category:Category.toLowerCase(),
                ItemsInStock:Quantity,
                ItemFullStock:Quantity,
            } 

            let newExpenditure:ExpenditureItem = {
                ItemName:ItemName.toLowerCase(),
                Type:Type.toLowerCase(),
                Category:Category.toLowerCase(),
                Contribution: Math.floor((Number(Quantity)/Number(totalItems)) * 100),
                ItemsBought:0,
                Capital: (Number(Quantity) * Number(BuyingPrice)),
                SellingPrice,
                BuyingPrice
            }
            

            if((ItemName.length > 0 ) && (Number(Quantity) > 0)){
                //before adding the items check if they exist in the database that will have been fetched right about from the frontend then sent to the db for fast access to ensure that data reaches the client as fast as possible.
                // is item present in the inventory or has it just been added.
                
                //for the db
                AddInventory(newDbInventory).then(function(value:any){
                    reduxDispatch(addInventory({inventory:newInventory}))
                    setCounter((counter + 1))
                    // add a new sale as well
                    reduxDispatch(addSales({sales:newSale}))
                    AddSale(new main.Sale(newSale)).then(function(value){
                        AddStock(new main.Stock(newStock)).then(function(value){
                            AddExpenditure(new main.Expenditure(newExpenditure)).then(function(value){

                            }).catch(function(err){
                                alert(`expenditure error: \n ${err}`)
                                setAlertState(<Alert err="internal server error" counter={counter}/>)
                            })
                        }).catch(function(err){
                            alert(`stock error: \n ${err}`)

                            setAlertState(<Alert err="internal server error" counter={counter}/>)
                        })    
                    }).catch(function(err){
                        alert(`sale error: \n ${err}`)
                        setAlertState(<Alert err="internal server error" counter={counter}/>)
                    })
                    //add a new stock as well
                    reduxDispatch(addStock({stock:newStock}))
                    // add new expenditure as well 
                    reduxDispatch(addExpenditure({expenditure:newExpenditure}))

                    //save them as new items in the list automatically and send the data to the backend api.
                    // use calculations from go backend for date and the total cost calculation before adding the new data to the list of orders automatically.        
                    
                    setAlertState(<Success success="new item added succesfully" counter={counter}/>)
                    let newArr = [{ItemName,Type,BuyingPrice,SellingPrice,Category,Quantity,ArrivalDate}].concat(sortedInventory)
                    setSortedInventory(objectArrDuplicateHandler({arr:newArr,arrOfProperties:["ItemName","Type","Category"]}).sort(reverseSorter)) 

                }).catch(function(err){
                    <Alert err="error adding new item" counter={counter}/>
                })
            }
            else{
                setCounter(prevState => prevState + 1)
                setAlertState(<Alert err="Kindly key in all the item details" counter={counter}/>)
            }
        }


    }
    return(
        <div className=" flex flex-col relative gap-4 py-1 px-3 border-2 border-green-600 rounded-lg mb-4">
            <h1 className="w-full flex justify-start text-xl font-bold text-blue-600">New Item</h1>
            <div className="w-full h-[2rem] grid grid-cols-7 gap-6 overflow-x-auto justify-items-start">
                <div>Item Name</div>      
                <div>Type</div>
                <div>Category</div>
                <div>Full Stock</div>
                <div>buying price</div>
                <div>selling price</div>
                <div>Action</div>
            </div>
            <form onSubmit={newOrderHandler} className="w-full h-[2rem] grid grid-cols-7 gap-6 justify-items-start ">
                <div className="w-full flex justify-start">
                    <input name="ItemName" id="ItemName" type="text" className="w-full bg-black rounded-lg px-3 border-2 border-green-600 backdrop-blur-3xl focus:backdrop-blur-2xl"/>
                </div>
                <div className="w-full flex justify-start">
                    <input name="ItemType" id="ItemType" type="text" className="w-full bg-black rounded-lg px-3 border-2 border-green-600 backdrop-blur-3xl focus:backdrop-blur-2xl"/>
                </div>
                <div className="w-full flex justify-start">
                    <input name="Category" id="Category" type="text" className="w-full bg-black rounded-lg px-3 border-2 border-green-600 backdrop-blur-3xl focus:backdrop-blur-2xl"/>
                </div>
                <div className="w-full flex justify-start">
                    <input name="noOfItems" id="noOfItems" type="number" className="w-full bg-black rounded-lg px-3 border-2 border-green-600 backdrop-blur-3xl focus:backdrop-blur-2xl"/>
                </div>
                <div className="w-full flex justify-start">
                    <input name="BuyingPrice" id="BuyingPrice" type="number" className="w-full bg-black rounded-lg px-3 border-2 border-green-600 backdrop-blur-3xl focus:backdrop-blur-2xl"/>
                </div>
                <div className="w-full flex justify-start">
                    <input name="SellingPrice" id="SellingPrice" type="number" className="w-full bg-black rounded-lg px-3 border-2 border-green-600 backdrop-blur-3xl focus:backdrop-blur-2xl"/>
                </div>
                <div>
                    <button type="submit" className="font-medium px-4 py-2 border-2 bg-black  rounded-lg border-green-600 text-lg w-fit flex gap-2 items-center dark:text-white text-black"><FaSdCard className="text-yellow-600"/><span>save</span></button>
                </div>
            </form>
        </div>
    )
}