
const handlers: Array<(config)=>void> =[];

//Add Listner
export const listenConfiguration = <T>(cb:(config:T)=>void) => {
    handlers.push(cb);
}

export const loadConfiguration = (configFile:string)=>{
    return new Promise((res,rej)=>{
        fetch (configFile).then (r=>r.json()).then (r=>{
            handlers.forEach(p=>p(r));
            res(r);
        }).catch(rej);
    });
}
    

