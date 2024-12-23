export type Payment = {
    name: string,
    transId: string,
    amount: number,
    CA: string,
    parts: number,
    verified: boolean
}

export type Vtransaction = {
    event:string,
    name: string,
    transId: string,
    amount: number,
    CA: string,
    parts: number,
    verified: boolean
}

export type Event = {
    eventId: String,
    name: String,
    fee: number,
    minMember:number,
    maxMember:number,
    isTeam:boolean,
    markdown:string
}

export type member = {
    name: string,
    email: string,
    phone: string,
    CA: string
}

export type Data = {[event: string] : transaction[]}
export type userData = User[]


export type User = {
    name:string,
    phone:string,
    college:string,
    email:string,
    gradyear:number,
    stream:string,
    CA:string,
    CAregistrations:string,
    joined:string,
}

export type transaction = {
    members: member[],
    payment: Payment
}


export interface Tab {
    id: number,
    name: string,
    type: string
}

export interface Component extends Tab {
    source : string;
}