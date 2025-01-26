const FetchProducts = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_API}/database/database.json`)
        if (response.ok) {
            const data = await response.json()
            const categoryImages = data.categoryImages
            const products = Object.keys(data)
                .filter(key => key !== "categoryImages")
                .reduce((acc, key) => {
                    acc[key] = data[key]
                    return acc
                }, {})
            return { products, categoryImages }
        } else {
            throw new Error("Failed to fetch products")
        }
    } catch (error) {
        console.error("Failed to fetch products", error)
        return []
    }
}

export default FetchProducts;