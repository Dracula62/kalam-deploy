import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Editor from '../Editor/Editor';
import useLocalStorage from '../../hooks/useLocalStorage';

const PracticePage = () => {
	const loggedIn = useSelector(state => state.userInfo);

	const htmlKeyName = loggedIn.userInfo.isLoggedIn
		? `html-${loggedIn.userInfo.uuid}`
		: 'html';

	const cssKeyName = loggedIn.userInfo.isLoggedIn
		? `css-${loggedIn.userInfo.uuid}`
		: 'css';

	const jsKeyName = loggedIn.userInfo.isLoggedIn
		? `js-${loggedIn.userInfo.uuid}`
		: 'js';

	const [html, setHtml] = useLocalStorage(htmlKeyName, '');
	const [css, setCss] = useLocalStorage(cssKeyName, '');
	const [js, setJs] = useLocalStorage(jsKeyName, '');

	const [srcDoc, setSrcDoc] = useState('');

	useEffect(() => {
		document.title = 'कलम 🖋 - Practice';
	}, []);

	//We will be supporting jQuery for signed in users only
	const jQuery = loggedIn.userInfo.isLoggedIn
		? `<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>`
		: '';
	const headHTML = `<head><style>body{background: #fcfcfc;}</style>${jQuery}</head>`;

	useEffect(() => {
		let renderTime = 1000;
		if (loggedIn.userInfo.isLoggedIn) {
			renderTime = 300;
		}

		const timeout = setTimeout(() => {
			setSrcDoc(
				`<html>${headHTML}<body>${html}</body><style>${css}</style><script>${js}</script></html>`
			);
		}, renderTime);

		return () => clearTimeout(timeout);
	}, [html, css, js, loggedIn.userInfo.isLoggedIn, headHTML]);

	const onDemandRender = () => {
		setSrcDoc(
			`<html>${headHTML}<body>${html}</body><style>${css}</style><script>${js}</script></html>`
		);
	};

	return (
		<main className="px-4 py-2 bg-practiceBg-light dark:bg-practiceBg-dark w-auto box-border h-full">
			<main className="flex justify-between">
				<main className="dark:text-white">
					<span className="text-2xl font-semibold">कलम</span>
					<span className="text-2xl font-medium">🖋 - Practice</span>
				</main>
				<main className="flex justify-around pr-6">
					<button
						className={`m-2 mr-6 p-3 bg-yellow-200 w-20 ${
							loggedIn.userInfo.isLoggedIn
								? ''
								: 'cursor-not-allowed'
						}`}
						disabled={!loggedIn.userInfo.isLoggedIn}
						title={
							loggedIn.userInfo.isLoggedIn
								? ''
								: 'You need to sign in to save the work'
						}
					>
						Save
					</button>
					<button
						className="m-2 p-3 bg-yellow-200 w-20"
						onClick={onDemandRender}
					>
						Run
					</button>
				</main>
			</main>
			<main className="pane top-pane">
				<Editor
					language="xml"
					displayName="HTML"
					value={html}
					onChange={setHtml}
				/>
				<Editor
					language="css"
					displayName="CSS"
					value={css}
					onChange={setCss}
				/>
				<Editor
					language="js"
					displayName="JS"
					value={js}
					onChange={setJs}
				/>
			</main>
			<main className="flex">
				<iframe
					srcDoc={srcDoc}
					title="Output"
					sandbox="allow-scripts"
					frameBorder="0"
					className="w-full h-screen rounder-t-xl mt-1"
				/>
			</main>
		</main>
	);
};

export default PracticePage;
