let go = (d) => document.getElementById(d)
let send = (url, body) => (new Promise((res, err) => {
    fetch(url, {
        method:"POST",
        body:JSON.stringify(body),
        mode:"cors",
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(
        x=> {
            
            if (x.status == 200) {
                x.json().then(
                    e=>res(e)
                )
            } else {
                err(x)
            }
        }
    )
    .catch(
        x=>err(x)
    )
}));
let genlink = (l, def) => {
    let salida = () => {};

    if(typeof(l)=="string"){
        salida = ()=>{
            document.location.assign(l)
        };
    }else if (typeof(l) == "function"){
        salida = l;
    } else if (typeof(l) == "undefined") {
        salida = def||(()=>{});
    };
    return salida
};
let range = (s, e, j) => {
    let salida=[];
    j=j||1;

    for (let i = s; i < e; i=i+j) {
        
        salida.push(i)
        
    };

    return salida
}
let keys = (a) => Object.keys(a);