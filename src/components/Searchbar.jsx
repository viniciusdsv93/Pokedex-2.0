import { searchPokemon } from "../api";
import { useState } from "react";

export const Searchbar = ({ pokemonName, setPokemonName, onSearch }) => {
	const [search, setSearch] = useState("");

	const onChangeHandler = (evt) => {
		setSearch(evt.target.value);
		if (evt.target.value.length === 0) {
			onSearch(undefined);
		}
	};

	const handleSearchBtn = () => {
		onSearch(search);
	};

	return (
		<div className='searchbar'>
			<input type='text' placeholder='Enter a pokemon name' onChange={onChangeHandler} />
			<div>
				<button onClick={handleSearchBtn}>Search</button>
			</div>
		</div>
	);
};
