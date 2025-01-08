export const apiOrden = async (obj: unknown) => {
    try {

        const response = await fetch('http://localhost:3000/orden', {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify(obj),
            credentials: 'include'
        })

        return await response.json()


    } catch (error) {
        console.log('Error', error)
        return error
    }


}