import React, { useContext } from "react";
import FavoriteContext from "../contexts/favoriteContext";

export const Navbar = () => {
	const { favoritePokemons } = useContext(FavoriteContext);
	const navbarLogo = "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";
	return (
		<nav>
			<div className='navbar-container'>
				<img src={navbarLogo} />
				<div>{favoritePokemons.length} 💗</div>
			</div>
		</nav>
	);
};
