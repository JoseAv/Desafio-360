export const callUser = async (obj: unknown) => {
    console.log(obj)
    try {

        const response = await fetch('http://localhost:3000/login', {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify(obj),
            credentials: 'include'
        })

        return await response.json()


    } catch (error) {
        console.log(error)
    }


}