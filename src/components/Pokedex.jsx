import { Pagination } from "./Pagination";
import { Pokemon } from "./Pokemon";

export const Pokedex = ({ pokedexList, loading, page, setPage, totalPages }) => {
	const onLeftClickHandler = () => {
		if (page > 0) {
			setPage(page - 1);
			console.log("back");
		}
	};
	const onRightClickHandler = () => {
		if (page + 1 < totalPages) {
			setPage(page + 1);
			console.log("forward");
		}
	};

	return (
		<div>
			<div className='pokedex-header'>
				<h1>Pokedex</h1>
				<Pagination
					page={page + 1}
					totalPages={totalPages}
					onLeftClick={onLeftClickHandler}
					onRightClick={onRightClickHandler}
				/>
			</div>
			{loading ? (
				<div>Carregando</div>
			) : (
				<div className='pokedex-grid'>
					{pokedexList.map((pokemonItem, index) => {
						return <Pokemon key={index} pokemonItem={pokemonItem} />;
					})}
				</div>
			)}
		</div>
	);
};
