export const apiRol = async (obj: unknown) => {
    try {
        const response = await fetch('http://localhost:3000/rol', {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify(obj),
            credentials: 'include'
        })
        const newResponse = await response.json()
        return newResponse

    } catch (error) {
        return error
    }


}