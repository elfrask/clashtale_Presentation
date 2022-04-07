
function gen_arena(nombre, img, cards=[]) {
    return ({
        title:nombre,
        cards:cards,
        img:img
    })
};

let arenas = [
    gen_arena("Arena de entrenamiento", "", []), //1
    gen_arena("Las ruinas", "", []), //2
    gen_arena("Snowdin", "", []), //3
    gen_arena("Waterfall", "", []), //4
    gen_arena("Hotland", "", []), //5
    gen_arena("Laboratoio", "", []), //6
    gen_arena("Hotel", "", []), //7
    gen_arena("Core", "", []), //8
    gen_arena("La Capital", "", []), //9
    gen_arena("Palacio Real", "", []), //10

    gen_arena("Campo Dorado", "", []), //11
    gen_arena("Pueblo Comunitario", "", []), //12
    gen_arena("Ciudad", "", []), //13
    gen_arena("Mundo Oscuro", "", []), //14
    gen_arena("Mundo Cibernetico", "", []), //15
];

module.exports = arenas