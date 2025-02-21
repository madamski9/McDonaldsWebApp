"use client"
import CategoryOrder from "../components/CategoryOrder"
import CategoryFoodOrder from "../components/CategoryFoodOrder"
import { useState } from "react"

const Order = () => {
    const [ categoryClicked, setCategoryClicked ] = useState("")

    return (
        <div className="order-main">
            <div className="order-left-column">
                <CategoryOrder setCategoryClicked={setCategoryClicked}/>
            </div>
            <div className="order-right-column">
                <CategoryFoodOrder categoryClicked={categoryClicked} />
            </div>
        </div>
    )
}

export default Order