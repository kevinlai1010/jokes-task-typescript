/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "./Jokes.css";
import axios from "../config/AxiosConfig";

export const Jokes = () => {
	const [joke, setJoke] = useState<string>("");
	const [actionJoke, setActionJoke] = useState<string>("");
	const [categories, setCategories] = useState<any[]>([]);
	const [categoryJoke, setCategoryJoke] = useState<string>("");
	const [inputJoke, setInputJoke] = useState<any[]>([]);
	const ref = React.createRef<any>();
	useEffect(() => {
		axios.get("random").then((response) => setJoke(response.data.value));
		axios.get("categories").then((response) => setCategories(response.data));
	}, []);
	/**
	 * Get Random joke on button click
	 * @param {*} query
	 */
	const getRandomJoke = (query: string) => {
		axios.get(query).then((response) => setActionJoke(response.data.value));
	};

	const getJokeByCategory = (query: string) => {
		axios.get(`random?category=${query}`).then((response) => setCategoryJoke(response.data.value));
	};

	const getInputJoke = (query: string) => {
		if (query.length > 3) {
			axios.get(`/search?query=${query}`).then((response) => {
				setInputJoke(response.data.result);
			});
		}
	};
	return (
		<div className="random-jokes-init">
			<img src="https://api.chucknorris.io/img/chucknorris_logo_coloured_small.png" alt="Norris" />
			<div className="random-jokes">
				<b>Random Joke:</b>
				<p>{joke}</p>
			</div>

			<div className="random-jokes-click">
				<button onClick={() => getRandomJoke("random")} className="btn-primary">Get Random Joke</button>
				<p>{actionJoke}</p>
			</div>

			<div className="random-jokes-select-wrapper">
				<select className="random-jokes-select" name="categories" id="categories" onChange={(e) => getJokeByCategory(e.target.value)}>
					{categories.map((category, key) => (
						<option key={key} value={category}>
							{category}
						</option>
					))}
				</select>
				<p>{categoryJoke}</p>
			</div>

			<div className="random-jokes-wrapper-input">
				<input className="random-jokes-input" ref={ref} type="text" name="jokes" id="getJokes" onChange={(e) => (e.target.value.length > 3 ? getInputJoke(e.target.value) : null)} />

			</div>
			<button className="btn-primary" onClick={() => { getInputJoke(ref.current.value) }}>Search Joke</button>

			<ul className="jokes-result">
				{inputJoke.splice(0, 5).map((res, key) => (
					<li key={key}>{res.value}</li>
				))}
			</ul>

		</div>
	);
};