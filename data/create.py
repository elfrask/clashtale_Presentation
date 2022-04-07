import os
import json

gen_card = {
	"name":input("nombre ID de la carta: "),
	"title":input("nombre (titulo) de la carta: "),
	"arena":int(input("ID de la Arena: (1 - 20) ")),
	"info":input("informacion de la carta: "),
	"joke":input("chiste de la carta 7w7: "),
	"tipo":int(input("tipo de la carta; 0. comun, 1. especial, 2. epica, 3. legendaria, 4. campeon: ")),
	"price":int(input("Precio de elixir: ")),
	"level":int(input("nivel maximo: ")),
	"props":{
		"life":int(input("Vida de la carta: ")),
		"atk":int(input("Ataque de la carta: ")),
		"tower_atk":int(input("daño a torre: ")),
		"especial_atk":int(input("Ataque especial de la carta: ")),
		"obj":int(input("Objetivo; 0. terrestre, 1. aerea, 2. terrestre y aerea, 3. estructura: ")),
		"time_atk":float(input("cuanto dura en atacar: ")),
		"tipo":int(input("tipo de tropa; 0. Terrestre, 1. Aerea, 2. Hechizo, 3. Estructura : ")),
		"fast":int(input("Velocidad de tropa; 0. no mostrar, (1 - 5) : ")),
		"range":float(input("Rango de ataque: ")),
		"distance":float(input("Distancia (-1 para no agregar): ")),
		"time_life":float(input("Tiempo de vida: ")),
		"stun":float(input("Tiempo de aturdimiento: ")),
		"cant":int(input("Cantidad de tropas: ")),
		

	}
}


def main(a):
	nombre = a["name"]
	if not os.path.exists("cards/" + nombre):
		os.mkdir("cards/" + nombre)
	
	props = a["props"]

	for i in ["life", "atk", "time_atk", "time_life", "range", "stun", "especial_atk", "tower_atk", "fast"]:
		if props[i] in [0, 0.0]:
			del props[i]
		pass
	if props["distance"] == -1:
		del props["distance"]
	if props["cant"] < 2:
		del props["cant"]
	if a["price"] == -1:
		a["price"] = "?"
	
	

	json.dump(a, open("cards/" + nombre + "/data.json", "w"), indent=4)



	pass

main(gen_card)