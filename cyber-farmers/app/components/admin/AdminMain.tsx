"use client";

import { useState,useEffect,useRef, Dispatch, SetStateAction, MutableRefObject, ReactNode} from "react"
import {Stock, StockItem} from "./stock"
import {Inventory} from "./inventory"
import { ProfileDisplay } from "./userName";
import {SaleItem, Sales} from "./sales"
import {FaRegWindowClose,FaBars,FaMoon, FaBook, FaDollarSign, FaTruck, FaFacebookSquare, FaBookOpen, FaHome, FaSun, FaSalesforce, FaQuestionCircle} from "react-icons/fa";
import clsx from "clsx"
import { Alert } from "./notifications";
import appIcon from "./assets/Hello Tractor_RGB_BLACK_-Cart-03.png"
import Image from "next/image";


type LinkItem = {
    name: string,
    trackingString: string,
    componentRef : JSX.Element,
    icon: JSX.Element,
    // an optional property
    innerList? : Array<InnerLinkItem>
}

type InnerLinkItem = {
    name: string,
    trackingString: string,
    componentRef : JSX.Element,
    icon: JSX.Element,
}

const links:Array<LinkItem> = [
    {name: "Home",trackingString:"home", componentRef:<Home/>,icon:<FaHome/>},
    // for each inventory enable the edit and delete option the both of which bring a popup to confirm your action
    {name: "Inventory",trackingString:"inventory", componentRef:<Inventory/>,icon:<FaBookOpen/>},
    {name: "inquiries",componentRef: <Stock/>,icon:<FaQuestionCircle/>,trackingString: "stock"},
    {name: "sales analytics",trackingString:"sales",icon:<FaDollarSign/>, componentRef:<Sales/>},
    {name: "stock",componentRef: <Stock/>,icon:<FaBook/>,trackingString: "stock"},
]

enum Visibility {
    visible = "visible",
    hidden = "hidden"
}


export function AdminWrapper(){
    const [counterState,setCounterState] = useState(0)
    const [mainViewState,setMainViewState] = useState<JSX.Element>(<Home/>)
    const [darkState,setDarkState] = useState(<></>)
    const [alertState,setAlertState] = useState(<></>)
    const [linkState,setLinkState] = useState<Array<LinkItem>>([])
    //for tracking the current path we're in
    const currentPath = useRef<string>("")
    const [menuState,setMenuState] = useState(<></>)
    
    useEffect(function(){
        setLinkState(links)
    },[])
    
    useEffect(function(){
        currentPath.current = "home"
        setMenuState(<HamburgerMenu setMenuState={setMenuState} itemsList={linkState} setMainViewState={setMainViewState} currentPath={currentPath} />)
    },[linkState])


    return(
        <div className="w-full h-screen fixed flex items-center flex-col gap-4 top-0 z-30 left-0 dark:bg-black bg-white">
            <div className="w-full mx-4 text-2xl relative flex items-center box-border px-4 justify-between gap-12 h-12 rounded-lg mb-1 bg-transparent shadow-sm shadow-blue-600">
                <div className="flex gap-8 items-center justify-start">
                    <FaBars className="text-2xl" onClick={(e:any) => setMenuState(<HamburgerMenu setMenuState={setMenuState} itemsList={links} setMainViewState={setMainViewState} currentPath={currentPath}/>)}/>
                    <Image alt="icon / logo" src={appIcon} className="w-64 h-8 object-cover object-center" width={64} height={8}/>
                </div>
                <ProfileDisplay  userName="Olivia" img=""/>
            </div>
            <div className="w-full relative px-4 h-5/6 flex gap-4 bg-transparent m-0">
                <div className="sticky w-auto h-full flex-grow-0 flex-shrink-0 bg-transparent">
                    {menuState}
                </div>
                <div className="relative w-[100%] h-full overflow-hidden flex-grow-1 bg-transparent">
                    {alertState}
                    {mainViewState}
                </div>            
            </div>
        </div>
    )
}

export function Home(){
    return(
        <div>default home page.</div>
    )
}

export function HamburgerMenu({setMenuState,itemsList,setMainViewState,currentPath}:{currentPath:MutableRefObject<string>,setMainViewState:Dispatch<SetStateAction<JSX.Element>>,itemsList:Array<LinkItem>,setMenuState:Dispatch<SetStateAction<JSX.Element>>}){
    const currentPathRef = useRef<string>("")
    const [pathState,setPathsState] = useState<string>("")
    const [menuListState,setMenuListState] = useState(<></>) 
    // each item in the item list must have a name and a link property
    // for each nested item just add a nestedList array property to the current item
    let cancelHandler = function(e:any){
        e.preventDefault()
        setMenuState(<></>)
    }
    useEffect(function(){
        currentPathRef.current = currentPath.current
        //test if it will update with the rest
        setPathsState(currentPathRef.current)
    },[])

    useEffect(function(){
        setMenuListState(itemsList != undefined && itemsList != null ? 
            <>
            {itemsList.map(function(item,index){
                return <ButtonComponent pathState={pathState} setPathsState={setPathsState} pageChanger={pageChanger} item={item}  key={index} currentPath={currentPathRef} />
            })}                
            </>
        :
        <div className="hidden"></div>)
    },[pathState])

    let pageChanger = function(componentRef:JSX.Element,trackingString:string,setPathsState:Dispatch<SetStateAction<string>>){
        setMainViewState(componentRef)
        setPathsState(trackingString)
    }
    return(
        <div className={`sticky select-none left-0 top-0 px-3 flex flex-col items-end  overflow-auto h-full w-fit bg-transparent bg-opacity-40 shadow-sm shadow-blue-700  dark:text-white text-blue-950 rounded-lg`}>
            <div className={`w-full flex justify-between h-12 px-3 pt-3  mb-4`}>
                <div className={`w-fit h-fit text-slate-600 font-bold text-xl`}>menu</div>
                <FaRegWindowClose className={`text-2xl text-red-500 `} onClick={cancelHandler}/>
            </div>
            <div className={`h-4/5 w-full overflow-auto flex flex-col gap-4`}>
            {menuListState}
            </div>
        </div>
    )
}


export function ButtonComponent({pathState,setPathsState,item,currentPath,pageChanger}:{pathState:string,setPathsState:Dispatch<SetStateAction<string>>,pageChanger:(componentRef:JSX.Element,trackingString:string,setPathsState:Dispatch<SetStateAction<string>>) => void,item:LinkItem,currentPath:MutableRefObject<string>}){
    const [buttonColorState,setButtonColorState] = useState<{color:string,backgroundColor?:string}>({color:"grey"})
    
    useEffect(function(){
        if(item.trackingString == pathState){
            setButtonColorState({color:"white",backgroundColor:"black"})
        }
        else{   
            setButtonColorState({color:"grey"})
        }
    },[pathState])
    return(
        <div  className={`w-full h-auto flex flex-col gap-2 items-start`}>
            <div style={buttonColorState} onClick={(e:any) => pageChanger(item.componentRef,item.trackingString,setPathsState)}  className={clsx("font-bold w-fit  h-auto py-2 px-3 rounded-md flex items-center gap-2 border-2 border-blue-600",{"bg-transparent": item.trackingString == currentPath.current," bg-transparent ": item.trackingString != currentPath.current})}>
                <span>{item.icon}</span>
                <span>{item.name}</span>       
            </div>
            {/*check the inner list property*/}
            {item.innerList != undefined ?
            item.innerList.map(function(nestedItem,index){
                return <div className={`w-full h-auto pl-4 mt-2 ml-6`}>
                    <button onClick={(e:any) => pageChanger(item.componentRef,item.trackingString,setPathsState)}  key={index} className={clsx("font-bold w-fit h-auto py-2 px-3 rounded-md shadow-sm shadow-orange-600 text-slate-600♠",{" bg-transparent shadow-sm shadow-orange-600  ": item.trackingString == currentPath.current," bg-transparent ": item.trackingString != currentPath.current})} >
                        {nestedItem.name}                        
                    </button>          
                </div>
            })
            :
            <div className="hidden"></div>
        }
        </div>

    )
}