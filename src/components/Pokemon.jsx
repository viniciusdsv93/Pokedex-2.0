import React, { useContext } from "react";
import FavoriteContext from "../contexts/favoriteContext";

export const Pokemon = ({ pokemonItem }) => {
	const { favoritePokemons, updateFavoritePokemons } = useContext(FavoriteContext);
	const onHeartClick = () => {
		updateFavoritePokemons(pokemonItem.name);
	};
	const heart = favoritePokemons.includes(pokemonItem.name) ? "💗" : "🖤";
	return (
		<div className='pokemon-card'>
			<div className='pokemon-image-container'>
				<img src={`images/${pokemonItem.id}.gif`} className='pokemon-image' />
			</div>
			<div className='card-body'>
				<div className='card-top'>
					<h3>{pokemonItem.name}</h3>
					<div>{pokemonItem.id}</div>
				</div>
				<div className='card-bottom'>
					<div className='pokemon-type'>
						{pokemonItem.types.map((type, index) => {
							return (
								<div key={index} className='pokemon-type-text'>
									{type.type.name}
								</div>
							);
						})}
					</div>
					<button className='pokemon-heart-btn' onClick={onHeartClick}>
						{heart}
					</button>
				</div>
			</div>
		</div>
	);
};
