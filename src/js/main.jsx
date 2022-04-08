

class Wood extends React.Component {
    render() {
        return(
            <div className={"gui-wood " + (this.props.className||"")} style={this.props.style}>
                {this.props.children}
            </div>
        )
    }
}


class Title extends React.Component {
    render() {
        return(
            <div className={"text-center title " + (this.props.className||"")} style={this.props.style}>
            
                {this.props.children}
                
                {gen_Vspace(25)}
                <hr />
            </div>
        )
    }
}

class Messager extends React.Component {
    render() {
        return(
            <div className="msg-space center">
                <div className="msg-border">
                    <div className="msg-up">
                        {
                            (this.props.onclose!==undefined)?(
                                <div className="msg-close center" onClick={genlink(this.props.onclose)}>
                                    X
                                </div>
                            ):[]
                        }
                    </div>
                    <div className={"msg-cont " + (this.props.className||"")}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
};

class InfoCard extends React.Component {
    state = {
        joke:false,
        toques:10
    }
    render() {

        

        return(
            <div className="msg-space center">
                <div className="msg-border">
                    <div className="msg-card-up">
                        <div className="msg-up">
                            {
                                (this.props.onclose!==undefined)?(
                                    <div className="msg-close center" onClick={() => {
                                        
                                        this.setState({
                                            joke:false,
                                            toques:10
                                        })
                                        
                                        genlink(this.props.onclose)()
                                    }}>
                                        X
                                    </div>
                                ):[]
                            }
                        </div>
                        <div className="show-card-cont">
                            <div className="show-card">
                                {printcard(this.props.card)}
                            </div>
                            <div className="show-card-info medio">
                                <div className="box-text text-center">
                                    {this.props.card.data.title}
                                </div>
                                {gen_Vspace(10)}
                                <div className={"box-text text-center" + " text-tipo-" + (tipo_cartas_class[this.props.card.data.tipo])}>
                                    Nivel {this.props.card.data.level}
                                </div>
                                {gen_Vspace(20)}
                                <div className="msg-sep2-cal-box">
                                    <div className="msg-sep2 medio">
                                        <div className="msg-dato-box">
                                            <div className={"msg-dato medio box-tipo-" + (tipo_cartas_class[this.props.card.data.tipo])}>
                                                Calidad
                                            </div>
                                            <div className="msg-dato msg-dato-gui medio">
                                                {tipo_cartas[this.props.card.data.tipo]}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className={"msg-cont no-padding" + (this.props.className||"")} style={{
                        height:"300px",
                        overflowY:"scroll"
                    }} >
                        <div className="card-table">
                            {keys(this.props.card.data.props).map(q=>{
                                
                                return([
                                    <div className="table-e">
                                        <div className="table-img img" style={{
                                            "backgroundImage":`url("/src/img/props/${q}.png")`
                                        }}>

                                        </div>
                                        <div className="table-value">
                                            <div className="table-title">
                                                {nombre_props[q]}
                                            </div>
                                            <div className="table-valor">

                                                {genlink(process_propertys[q], pass)(this.props.card.data.props[q])}
                                            </div>
                                        </div>
                                        
                                    </div>,
                                    gen_Vspace(3, "black")
                                    ]
                                )
                            })}
                        </div>
                        {
                            (!this.state.joke)?
                                (
                                    <div className="fill text-center medio small-text vspace" style={{color:"black"}} 
                                    
                                    onClick={(e) => {
                                        //console.log(e)
                                        if (this.state.toques > 0) {
                                            this.setState({toques:this.state.toques -1})
                                            return null
                                        }
                                        this.setState({joke:!this.state.joke})
                                    }}
                                    
                                    >
                                        {this.props.card.data.info}
                                    </div>

                                ):
                                (
                                    <div className="fill text-center medio small-text vspace" style={{color:"white", "backgroundColor":"dodgerblue"}}
                                    
                                    onClick={(e) => {
                                        //console.log(e)
                                        if (this.state.toques > 0) {
                                            this.setState({toques:this.state.toques -1})
                                            return null
                                        }
                                        this.setState({joke:!this.state.joke})
                                    }}
                                    
                                    >
                                        {this.props.card.data.joke}
                                    </div>
                                )
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
};

class InfoArena extends React.Component {
    render() {

        return(
            <div style={{"width":"100%"}}>
                <div className="wood_base medio">
                    <h1>
                        Arena {this.props.arena}
                    </h1>
                </div>
                <div className="wood_base medio">
                    {this.props.title}
                </div>
                <div className="arena_img" style={{
                    "backgroundImage":`url('${this.props.img}')`
                }}></div>
                <div className="wood_base medio">
                    Cartas de la arena
                </div>
                <div className="wood_bg">
                    <div className="ord_e">
                        {this.props.cards.map(x=>{

                            return(printcard(x, () => {
                                showcard(x)
                            }))

                        })}
                    </div>
                </div>
                <div className="wood_base medio">
                    
                </div>
                {gen_Vspace(20, "dodgerblue")}
            </div>
        )
    }
}

function gen_Vspace(px, color) {
    return(
        <div style={{
            "width":"100%",
            height:(px||"0")+"px",
            backgroundColor:color||"transparent"
        }}></div>
    )
}

function showi(cont, className) {
    ReactDOM.render(
        <Messager className={className} onclose={() => {
            go("_for_m").style.display="none"
        }}>
            {cont}
        </Messager>,
        go("showi"), 
        () =>{
            go("_for_m").style.display="flex"
        }
    )
}

function showcard(card, className) {
    ReactDOM.render(
        <InfoCard className={className} onclose={() => {
            go("_for_m").style.display="none"
        }} card={card}>
        </InfoCard>,
        go("showi"), 
        () =>{
            go("_for_m").style.display="flex"
        }
    )
}

let pass = (e) => (e);

let cards = [];
let arenas = [];
let tipo_obj = ["Terrestres", "Aereas", "Terrestres y Aereas", "Estructuras"];
let tipo_tropa = ["Terrestre", "Aerea", "Hechizo", "Estructura"];
let velocidades = ["ninguna", "Muy baja", "Baja", "Media", "Alta", "Muy Alta"]

let nombre_props = {
    distance:"Alcance",
    range:"Rango",
    life:"Vida",
    atk:"Ataque",
    obj:"Objetivo",
    time_atk:"Duracion de ataque",
    tipo:"Tipo de tropa",
    time_life:"Tiempo de vida",
    stun: "Tiempo de aturdimiento",
    cant: "Cantidad de tropas",
    tower_atk: "Daño a torre",
    especial_atk: "Ataque especial",
    fast:"Velocidad",
    cura:"Curacion"
}

let process_propertys = {
    distance:(e) => (e==0?"Cuerpo a cuerpo":e),
    time_life:(e) => (e+ " segundos"),
    time_atk:(e) => (e+ " segundos"),
    stun:(e) => (e+ " segundos"),
    range:pass, life:pass, atk:pass, cant:pass, tower_atk:pass, cura:pass,
    especial_atk:pass,
    obj:(e) => {
        let tropa = tipo_obj[e];
        return tropa
    },
    tipo:(e) => {
        let tropa = tipo_tropa[e];
        return tropa
    },
    fast:(e) => {
        let tropa = velocidades[e];
        return tropa
    },
    

};

let tipo_cartas = ["Comun", "Especial", "Epica", "Legendaria", "Campeon"];
let tipo_cartas_class = ["comun", "especial", "epica", "legendaria", "campeon"];

function getcards() {
    return new Promise((res, err) => {
        send("/getcards", {}).then((x=Array())=>{
            
            let todo = [];
            x.reverse();
            function next() {
                if (x.length < 1) {
                    send("/getarenas", {}).then(x=>{
                        arenas = x;
                        res(todo)
                    })
                } else {
                    let siguiente = x.pop();
                    send(`/getcard_info`, {card:siguiente}).then(p=>{
                        
                        let dat = {
                            name:siguiente,
                            img:`/data/cards/${siguiente}/img.png`,
                            data:p
                        };
                        todo.push(dat);
                        todo[siguiente] = dat;

                        next()
                    })
                }
            }

            next()

        }).catch((e) => {
            err(e)
        })
    })
}

function test(params) {
    console.log(params)
    return params
}

function printcard(i, click, className) {
    let options = ["jpg", "jpge", "bmp", "svg"].reverse()
    return(
        <article class={`carta card_repain carta_${test(tipo_cartas_class[i.data.tipo])}`} onClick={genlink(click)}>
            <div class="carta__cara carta__cara_delantera cara cara-delantera">
                <span class="carta__cantidad-elixir">{i.data.price}</span>
                <div class="carta__borde"></div>
                <figure class="carta__contenido-delantero" style={{
                    "transform":(i.data.tipo>2)?("scale(0.9) translate(-55%, -55%)"):""
                }}>
                    <img class="carta__ilustracion repain" src={i.img} onError={(e) => {
                        e.preventDefault()

                        if (options.length == 0) {
                            return null
                        }
                        e.target.src = i.img.split(".")[0] + "." + options.pop()
                    }} />  
                    <figcaption class="carta__nivel"><span className="repain-text">Nivel {i.data.level}</span></figcaption>
                </figure>
            </div>
        </article>
    )
}

let modos_ord = ["Nombre codigo", "arena", "almas", "calidad"];

function gen_ord_funcion(n, options) {
    return (e=[]) => {
        let pre_salida = range(0, options).map(x=>([]));
        let salida = [];

        e.forEach(x=>{
            if (typeof(x.data[n]) !== "number") {
                return null
            }
            pre_salida[x.data[n]].push(x)
        });


        pre_salida.forEach((x=[])=>{
            x.forEach(y=>{
                salida.push(y)
            })
        })

        return salida
    }
}

let modos_ord_code = [
    pass, // nombre codigo
    gen_ord_funcion("arena", 20), // arena
    (e=[]) => { // Elixir

        let func = gen_ord_funcion("price", 10)
        let cartas = func(e);
        console.log(cartas, e.espejo)
        cartas.push(e.espejo);
        return cartas
    },
    gen_ord_funcion("tipo", 4) //calidad
    
]


class Body extends React.Component {
    state={
        modo_ord:0
    }
    render() {

        let cardp = genlink(modos_ord_code[this.state.modo_ord], pass)(cards)

        return(
            <div className="fill medioH">
                <div className="_app ws overflow-none">
                    <Messager className="center text-center">
                        Saludos! 
                        <br />
                        <br />
                        Aqui os vengo a presentar una idea
                        que se me ha ocurrido por ahi en mi
                        mundillo de ideas de como seria una
                        version del juego de clash royale pero
                        con tematica de undertale usando sus
                        personajes, si tambien te lo preguntas
                        pues sigue leyendo este blog para saber
                        mas.
                    </Messager>

                    <center>
                        <p className="box-text">
                            este blog esta escrito por Frask
                        </p>
                    </center>

                    <Messager className="center text-center">
                        Antes de empezar aviso que las imagenes
                        mostradas en este blog unicamente estan para
                        ilustrar la idea que se quiere trasmitir.
                    </Messager>


                    {gen_Vspace(200)}

                    <Title>
                        Arenas
                    </Title>
                    {gen_Vspace(100)}
                    <center>
                        <p className="box-text">
                            Total de arenas: {arenas.length}
                        </p>
                    </center>

                    {gen_Vspace(50)}

                    <div className="ord_e" id="cards">        
                        
                        {arenas.map((x, i)=>{
                            let cartas = [];
                            let arena = 1 + i;
                            cards.forEach(y => {
                                if (y.data["arena"] == arena) {
                                    cartas.push(y)
                                }
                            })
                            
                            return(
                                <InfoArena
                                
                                cards={cartas}
                                img={`/src/img/arenas/${x.img}`}
                                title={x.title}
                                arena={arena}
                                >

                                </InfoArena>
                            )
                        })}
                    </div>
                    
                    {gen_Vspace(200)}









                    <Title>
                        Cartas
                    </Title>
                    
                    {gen_Vspace(100)}

                    <center>
                        <p className="box-text">
                            Total de cartas: {cardp.length}
                        </p>
                    </center>

                    <center>
                        Ordenar por:
                        <div className="bt" onClick={() => {this.setState({modo_ord:(this.state.modo_ord+1)%4})}}>
                            {modos_ord[this.state.modo_ord]}
                        </div>
                    </center>

                    <div className="ord_e" id="cards">        
                        
                        {cardp.map((x, i)=>{

                            return(printcard(x, () => {
                                showcard(x)
                            }))
                        })}
                    </div>


                    {gen_Vspace(200)}

                    

                </div>
            </div>
        )
    }
};


function main() {
    console.log("loading...")
    getcards().then(x=>{
        cards = x;
        ReactDOM.render(<Body></Body>, go("_app"), () => {
            /*showi(
                <h1 className="dark">
                    Hola! Bienvenido!
                </h1>
            )*/
        })

    }).catch(x=>{main()})
}

main()