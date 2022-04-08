
function gen_arena(nombre, img, cards=[]) {
    return ({
        title:nombre,
        cards:cards,
        img:img
    })
};

let arenas = [
    gen_arena("Arena de entrenamiento", "entrenamiento.png", []), //1
    gen_arena("Las ruinas", "ruinas.png", []), //2
    gen_arena("Snowdin", "snowdin.png", []), //3
    gen_arena("Waterfall", "waterfall.png", []), //4
    gen_arena("Hotland", "hotland.png", []), //5
    gen_arena("Laboratoio", "laboratorio.png", []), //6
    gen_arena("Hotel", "hotel.png", []), //7
    gen_arena("Core", "core.png", []), //8
    gen_arena("La Capital", "capital.jpg", []), //9
    gen_arena("Palacio Real", "palacio.png", []), //10

    gen_arena("Campo Dorado", "campo.png", []), //11
    gen_arena("Pueblo Comunitario", "pueblo.png", []), //12
    gen_arena("Ciudad", "ciudad.jpg", []), //13
    gen_arena("Mundo Oscuro", "darkworld.png", []), //14
    gen_arena("Mundo Cibernetico", "ciberworld.png", []), //15
];

module.exports = arenas