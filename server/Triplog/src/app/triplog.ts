import { Segment } from './segment'

export class Triplog {

  constructor(
    mode: string,
    miles: Number, dateTime: Date,
    updated: Date, created: Date,
    segments: Array<Segment>){}
}
