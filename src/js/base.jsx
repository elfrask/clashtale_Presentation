
let go = id=>document.getElementById(id);
let asi = (a, s) => Object.assign(a, s);
let send = (url, pro) => (new Promise((res, err) => {
    fetch(url, {
        method:"POST",
        body:JSON.stringify(pro||{}),
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

let filetypes = {
    image:"image/*"
}

let OpenFile = (fi) => new Promise((res, err) => {
    let file = document.createElement("input");
    file.type = "file";
    file.accept = fi||"*";
    file.addEventListener("change", x=>{
        let read = new FileReader();
        let i = file.files[0]

        read.onloadend = (y) => {
            res(read.result)
        }

        read.readAsDataURL(i)
    })

    file.click()
})

let get_arg = () => {
    let salida = {
        url:"",
        arg:{},
        dir:""
    };
    salida.url = document.location.href;
    if (document.location.search.substr(1)) {
        salida.arg = document.location.search.substr(1).split("&").map(x=>[
            x.split("=")[0],
            x.split("=").slice(1).join("=")
        ]);
        
        let array = salida.arg
        salida.arg = {};
        for (let i = 0; i < array.length; i++) {
            const e = array[i];
            salida.arg[e[0]] = e[1];           
        }
    };
    salida.dir = document.location.pathname.substr(1);


    return salida
};
let genlink = (l) => {
    let salida = () => {};

    if(typeof(l)=="string"){
        salida = ()=>{
            document.location.assign(l)
        };
    }else if (typeof(l) == "function"){
        salida = l;
    } else if (typeof(l) == "undefined") {
        salida = (()=>{});
    };
    return salida
};

let lang = {};

let range = (s, e, j) => {
    let salida=[];
    j=j||1;

    for (let i = s; i < e; i=i+j) {
        
        salida.push(i)
        
    };

    return salida
}
let tokens = [
    ...range(0, 10).map(x=>x+""),
    ...range(97, 97+26).map(x=>(String.fromCharCode(x))),
    ...range(97, 97+26).map(x=>(String.fromCharCode(x).toUpperCase())),
]
function is_name(n) {
    
    for (let i = 0; i < n.length; i++) {
        const e = n[i];

        if (!tokens.includes(e)) {
            return false
        }
        
    }

    return true
}

//banner create, control, manager

let _info_user = {
    username:"",
    socio:false,
    login:false,
};

let apiNotify = {
    list:[],
    is_active:false,
    create:{
        info:(text, delay, click) => {
            apiNotify.push(apiNotify.generate(0, text, delay, click));
            apiNotify.run();
        },
        done:(text, delay, click) => {
            apiNotify.push(apiNotify.generate(1, text, delay, click));
            apiNotify.run();
        },
        warn:(text, delay, click) => {
            apiNotify.push(apiNotify.generate(2, text, delay, click));
            apiNotify.run();
        },
        error:(text, delay, click) => {
            console.log("error")
            apiNotify.push(apiNotify.generate(3, text, delay, click));
            apiNotify.run();
        },
    },
    push:(not) => {
        apiNotify.list.reverse();
        apiNotify.list.push(not);
        apiNotify.list.reverse();
    },
    generate:(color, text, delay, click) => ({color:color, text:text, click:click, delay:(delay||4000)}),
    run:() => {
        if(apiNotify.list.length === 0) return [];
        if(apiNotify.is_active) return[];

        apiNotify.is_active = true;

        let list_color = ["blue", "green", "yellow", "red"];

        let noti = apiNotify.list.pop();

        let box = go("noti-box"); 
        let area = go("noti-area");

        box.innerText = noti.text;
        box.className = `noti-box box-color-${list_color[noti.color]} text-${list_color[noti.color]}`;
        box.onclick = genlink(noti.click);
        
        area.style.top = "0%"//`calc(100% - ${area.offsetHeight}px)`;

        setTimeout(() => {
            area.style.top = "-100%";

            setTimeout(() => {
                apiNotify.is_active = false;
                apiNotify.run();
            }, 400);
        }, 400 + noti.delay);
        

    }
}



class Panel extends React.Component {// mode, childs, click, button

    render() {

        let mode = this.props.mode||"info";


        let color = ({
            info:"blue",
            error:"red",
            done:"green",
            warn:"yellow",
        })[mode];

        if(color === undefined) {
            mode = "info";
            color = "blue";
        };

        return (
            <div className="fill center">
                <div className={`container center flex-v box-color-${color}`}>
                    <Img img={`/src/img/ops/${mode}.png`} size="100px"/>
                    {range(0,2).map(x=><br/>)}
                    <h3 className={`text-${color}`}>
                        {this.props.children}
                    </h3>
                    <br />
                    <Button 
                    click={genlink(this.props.click)} 
                    className={`text-${color=="red"?"orange":color}`}
                    >
                        {this.props.button||"Reintentar"}
                    </Button>
                </div>

            </div>
        )
    }
};


let ban_show = false;

let hidden_show_banner = () => {
    let banner = go("banner");
    banner.style.zIndex = ban_show?"0":"1"
    ban_show=!ban_show
};

class Cuerpo extends React.Component {
    render() {
        return (
            <div className="fill">
                <div className="center noti-area" id="noti-area">
                    <div id="noti-box" className="noti-box box-blue text-blue">
                        
                    </div>
                </div>
                <div className="head">
                    <Img img="/src/img/logo.png" size="50px" className="bt_head l" click="/"/>
                    <Img img="/src/img/ops/menu.png" size="50px" className="bt_head r port" click={hidden_show_banner}/>
                </div>
                <div className="body">
                    <div id="banner" className="banner l">
                        {banner.map(render_banner)}
                    </div>
                    <div className="body-page l" id="page">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
};

function onlast(id, call) {
    return (() => {
        let m = go(id||"page")
        //console.log(m.scrollTop, (m.scrollHeight - m.offsetHeight))
        if (m.scrollTop > (m.scrollHeight - m.offsetHeight - 100)) {
            genlink(call)();
        }

    })
}

class Pub extends React.Component { // title, childs, click, img
    render() {
        return (
            <div className="pub" onClick={genlink(this.props.click)}>
                <div className="fill-h">
                    <div className="pub-title">
                        {this.props.title}
                    </div>
                    <div className="pub-data">
                    {
                        this.props.children
                        //((this.props.det||"")+"").substr(0, 500)
                        //+
                        //(((this.props.det||"")+"").length>500)?"...":""
                    }
                    </div>
                </div>
                <div className="img pub-img" style={{
                    backgroundImage:`url('${this.props.img}')`
                }}>

                </div>
            </div>
        )
    }
}


class Img extends React.Component { // style, className, img, size
    render() {
        return (
            <div
                className={"img " + (this.props.className||"")}
                style={asi({
                    backgroundImage:`url('${this.props.img}')`,
                    width:this.props.size||"",
                    height:this.props.size||"",
                }, this.props.style)}
                onClick={genlink(this.props.click)}
            >
                {this.props.children}
            </div>
        )
    }
}
class Button extends React.Component {
    render() {
        return (
            <div
                className={"button " + (this.props.className||"")}
                style={asi({
                    backgroundImage:`url('${this.props.img}')`,
                    width:this.props.size||"",
                    height:this.props.size||"",
                }, this.props.style)}
                onClick={genlink(this.props.click)}
            >
                {this.props.children}
            </div>
        )
    }
};

let server = {
    update:() => (new Promise((response, err) => {
        
        send("/self_user_data").then(x => {
            _info_user = x;
            console.log("the info user at finish")
            response(x)
        }).catch(x=>{
            console.warn("there a error for load info user")
            err(x)
        }) 
    })),
    update_lang:() => (new Promise((response, err) => {
        
        send("/lang").then(x => {
            lang = x;
            console.log("the language is load")
            response(x)
        }).catch(x=>{
            console.warn("there a error for load language")
            err(x)
        }) 
    })),
    
};



function render_app(rende, call) {

    function ren() {
        ReactDOM.render(
            rende,
            go("__app__"),
            call
        )
    };
    function update() {
        server.update()
            .then(x => {ren()})
            .catch(x => {ren()})
    };

    server.update_lang()
        .then(x=> {update()})
        .catch(x=> {update()})


 
};
function render_page(rende, call) {

    function ren() {
        
        ReactDOM.render(
            <div></div>,
            go("page"),
            () => {
                ReactDOM.render(
                    rende,
                    go("page"),
                    call
                )
            }
        )
    };

    server.update()
        .then(x => {ren()})
        .catch(x => {ren()})
    
}