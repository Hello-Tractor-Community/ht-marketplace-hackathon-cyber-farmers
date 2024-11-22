import { useEffect, useRef,useState } from "react"
import { FaPlus,FaMailBulk, FaBurn, FaAmbulance, FaExclamationTriangle, FaExclamationCircle } from "react-icons/fa"


enum Visibility {
    visible = "visible",
    hidden = "hidden"
}

// for dangers,  accepts the error message to be displayed.
export function Alert({err,counter}:{err:string,counter:number}){
    const [displayState,setDisplayState] = useState("flex")
    const [hiddenState,setHiddenState] = useState<Visibility>(Visibility.visible)

    useEffect(function(){
        setDisplayState("flex")
        setHiddenState(Visibility.visible)

        let timer = window.setTimeout(function(){
            setDisplayState("none")
            setHiddenState(Visibility.hidden)
        },3000)

        // to prevent memory leaks after using the timeout
        return () => clearTimeout(timer)
    },[counter])
    return(
        <div style={{visibility:hiddenState,display:displayState,flexDirection:"column",gap:"1rem"}} className={`w-fit sm:min-w-[40rem] md:min-w-[30rem] absolute top-4 shadow-inner bg-black border-2 border-red-600 h-fit mx-auto p-4 mt-4 text-white z-10`}>
            <h1 className="font-bold flex gap-3"><FaExclamationTriangle className="text-red-600 text-xl"/><span className="text-red-600">Alert</span></h1>
            <hr className="w-full h-2 border-slate-300"/>
            <p className="dark:text-white text-black text-left">{err}</p>
        </div>
    )
}


// for displaying when no data has been recorded yet.
// accepts only the section name
export function EmptySection({section,description}:{section:string,description:string}){
    const [descriptionState,setDescriptionState] = useState(`nothing to show yet please update your ${section} dashboard`)

    useEffect(function(){
        if(description != null && description != undefined  ){
            setDescriptionState(description)
        }
    },[])

    return(
        <div className="w-5/6 sm:w-2/3 md:w-[25rem] rounded-lg h-auto p-4 shadow-sm shadow-blue-600 flex flex-col gap-2 items-center  mx-auto mt-24 bg-transparent text-white">
            <h1 className="font-bold text-blue-600">{section}</h1>
            <hr className="w-full h-2 border-slate-300"/>
            <p className="font-medium dark:text-white text-black">{descriptionState}</p>
            <div className="flex w-full justify-center items-center h-auto gap-4">
                <span className="text-green-600 font-bold text-xl">Add</span>
                <div className="bg-green-600 w-fit h-fit rounded-full p-2">
                    <FaPlus className="text-white text-2xl font-bold"/>
                </div>
            </div>
        </div>
    )
}

export function EmptyAlert({section,description}:{section:string,description:string}){
    const [descriptionState,setDescriptionState] = useState(`nothing to show yet please update your ${section} dashboard`)

    useEffect(function(){


        if(description != null && description != undefined  ){
            setDescriptionState(description)
        }

    },[])

    return(
        <div className="w-5/6 sm:w-2/3 md:w-[25rem] rounded-lg h-auto p-4 shadow-sm shadow-blue-600 flex flex-col gap-2 items-center  mx-auto mt-24 bg-transparent text-white">
            <h1 className="font-bold text-blue-600">{section}</h1>
            <hr className="w-full h-2 border-slate-300"/>
            <p className="font-medium dark:text-white text-black">{descriptionState}</p>
        </div>
    )
}


// for displaying succesful events, accepts the success message to be displayed.
export function Success({success,counter}:{success:string,counter:number}){
    const [displayState,setDisplayState] = useState("flex")
    const [hiddenState,setHiddenState] = useState<Visibility>(Visibility.visible)

    useEffect(function(){
        setDisplayState("flex")
        setHiddenState(Visibility.visible)

        let timer = window.setTimeout(function(){
            setDisplayState("none")
            setHiddenState(Visibility.hidden)
        },3000)

        // to prevent memory leaks after using the timeout
        return () => clearTimeout(timer)

    },[counter])
    return(
        <div style={{visibility:hiddenState,display:displayState,flexDirection:"column",gap:"1rem"}} className={`w-fit sm:min-w-[40rem] md:min-w-[30rem] absolute top-4 shadow-inner bg-black border-2 border-blue-600 h-fit mx-auto p-4 mt-4 text-white z-10`}>
            <h1 className="font-bold flex gap-3"><FaExclamationCircle className="text-blue-600 text-xl"/><span className="text-blue-600">Success</span></h1>
            <hr className="w-full h-2 border-slate-300"/>
            <p className="dark:text-white text-black">{success}</p>
        </div>
    )
}
