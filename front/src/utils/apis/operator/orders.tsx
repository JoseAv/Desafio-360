export const callOrders = async () => {
    try {

        const response = await fetch('http://localhost:3000/orden', {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify({ "acction": "V" }),
            credentials: 'include'
        })

        return await response.json()


    } catch (error) {
        console.log(error)
    }


}