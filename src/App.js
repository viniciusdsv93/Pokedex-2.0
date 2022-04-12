import "./App.css";
import { Navbar } from "./components/Navbar";
import { useState, useEffect } from "react";
import { Searchbar } from "./components/Searchbar";
import { Pokedex } from "./components/Pokedex";
import { searchPokedex, getPokemonData, searchPokemon } from "./api";
import { FavoriteProvider } from "./contexts/favoriteContext";
import { Footer } from "./components/Footer";

const favoritesKey = "f";
function App() {
	const itemsPerPage = 25;
	const [page, setPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [pokemonName, setPokemonName] = useState("");
	const [pokedexList, setPokedexList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [notFound, setNotFound] = useState(false);
	const [favorites, setFavorites] = useState([]);

	const fetchPokemons = async () => {
		try {
			setLoading(true);
			setNotFound(false);
			const data = await searchPokedex(itemsPerPage, itemsPerPage * page);
			const promises = data.results.map(async (pokemon) => {
				return await getPokemonData(pokemon.url);
			});
			const results = await Promise.all(promises);
			setPokedexList(results);
			setLoading(false);
			setTotalPages(Math.ceil(data.count / itemsPerPage));
		} catch (error) {
			console.log("fetchPokemons error: ", error.message);
		}
	};

	const loadFavoritePokemons = () => {
		const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey)) || [];
		setFavorites(pokemons);
	};

	useEffect(() => {
		loadFavoritePokemons();
	}, []);

	useEffect(() => {
		fetchPokemons();
	}, [page]);

	const updateFavoritePokemons = (name) => {
		const updatedFavorites = [...favorites];
		const favoriteIndex = favorites.indexOf(name);
		if (favoriteIndex >= 0) {
			updatedFavorites.splice(favoriteIndex, 1);
		} else {
			updatedFavorites.push(name);
		}
		window.localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
		setFavorites(updatedFavorites);
	};

	const onSearchHandler = async (pokemon) => {
		if (!pokemon) {
			return fetchPokemons();
		} else {
			setLoading(true);
			setNotFound(false);
			const result = await searchPokemon(pokemon);
			if (!result) {
				setLoading(false);
				setNotFound(true);
			} else {
				setPokedexList([result]);
				setPage(0);
				setTotalPages(1);
			}
			setLoading(false);
		}
	};

	return (
		<FavoriteProvider
			value={{
				favoritePokemons: favorites,
				updateFavoritePokemons: updateFavoritePokemons,
			}}
		>
			<Navbar />
			<Searchbar pokemonName={pokemonName} setPokemonName={setPokemonName} onSearch={onSearchHandler} />
			{notFound ? (
				<div className='not-found-text'>Not found</div>
			) : (
				<Pokedex
					pokedexList={pokedexList}
					loading={loading}
					page={page}
					setPage={setPage}
					totalPages={totalPages}
				/>
			)}
			<Footer />
		</FavoriteProvider>
	);
}

export default App;
