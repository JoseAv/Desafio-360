export interface typesUserLogI {
    correo_electronico: string,
    password: string
}

export interface ResponseUser {
    dataQuery: user,
    message: string,
    statusCode: number,
    success: boolean
}

export type typeUser = {
    correo_electronico: string,
    id: number,
    rol?: number
}

export interface typeLoginContext {
    children: JSX.Element
}
export interface loginUSer {
    data: typeUser
}

export interface LoginContextType {
    user: typeUser | null
    loginUser: () => void
    logOut: () => void
    loading: boolean
}
