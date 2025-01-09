export const callOrders = async (data: unknown) => {
    try {

        const response = await fetch('http://localhost:3000/orden', {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include'
        })

        return await response.json()


    } catch (error) {
        console.log(error)
    }
}