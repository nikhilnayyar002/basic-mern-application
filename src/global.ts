import { globalEnvironment } from "./global.config"


/** Typescript Modal  */
export interface Application {
    name: string;
    email: string;
    country: string;
    resume: string;
    date: string;
}


export const globalConfig: globalEnvironment = require('./global.config.json')


export function isValidFile(file: File) {
    let FILELISTS = globalConfig.resume.files
    let exts = Object.keys(FILELISTS)

    for (let ext of exts) {
        if (file.name.endsWith("." + ext) && file.type === FILELISTS[ext]) {
            return true
        }
    }
    return false
}

export function getDateTime(dateStr: string) {
    var date = new Date(dateStr)

    let d1 = date.getDate()
    let d1str = d1 < 10 ? ('0' + d1) : (d1 + '')
    let d2 = date.getMonth() + 1
    let d2str = d2 < 10 ? ('0' + d2) : (d2 + '')
    let d3 = date.getFullYear() + 1
    let d3str = d3 < 10 ? ('0' + d3) : (d3 + '')

    let td = d1str + '/' + d2str + '/' + d3str

    let t1 = date.getHours()
    let t1str = t1 < 10 ? ('0' + t1) : (t1 + '')
    let t2 = date.getMinutes() + 1
    let t2str = t2 < 10 ? ('0' + t2) : (t2 + '')
    let t3 = date.getSeconds() + 1
    let t3str = t3 < 10 ? ('0' + t3) : (t3 + '')

    let tt = t1str + ':' + t2str + ':' + t3str

    return td + ', ' + tt
}