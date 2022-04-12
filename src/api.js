export const searchPokemon = async (pokemonName) => {
	const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

	try {
		let response = await fetch(`${BASE_URL}${pokemonName}`);
		return await response.json();
	} catch (error) {
		console.log("error: ", error.message);
	}
};

export const searchPokedex = async (limit = 50, offset = 0) => {
	try {
		let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
		return await response.json();
	} catch (error) {
		console.log("error: ", error.message);
	}
};

export const getPokemonData = async (url) => {
	try {
		let response = await fetch(url);
		return await response.json();
	} catch (error) {
		console.log("error: ", error.message);
	}
};
