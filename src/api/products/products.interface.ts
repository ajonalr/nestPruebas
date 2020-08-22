import { Document } from 'mongoose';

export interface IProducts extends Document{

    readonly index: number
    readonly title: string
    readonly descripction: string
    readonly create: Date

}