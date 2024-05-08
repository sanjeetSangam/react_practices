import { useCallback, useEffect, useRef, useState } from "react";

function App() {
	const [length, setLength] = useState<number>(8);
	const [numberAllowed, setNumberAllowed] = useState<boolean>(false);
	const [charAllowed, setCharAllowed] = useState<boolean>(false);
	const [password, setPassword] = useState<string>("");

	const passwordRef = useRef<HTMLInputElement>(null);

	const passwordGenerator = useCallback(() => {
		let pass: string = "";
		let str: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

		if (numberAllowed) str += "0123456789";
		if (charAllowed) str += "!@#$%^&*()_+-=[]{}|;:',.<>?~";

		for (let index = 1; index <= length; index++) {
			const char: number = Math.floor(Math.random() * str.length + 1);
			pass += str.charAt(char);
		}

		setPassword(pass);
	}, [length, charAllowed, setPassword, numberAllowed]);

	const copyPasswordToClipboard = useCallback(() => {
		const copiedPassword: ClipboardItem = new ClipboardItem({
			"text/plain": new Blob([password], { type: "text/plain" }),
		});

		if (passwordRef.current) {
			passwordRef.current?.select();
			window.navigator.clipboard.write([copiedPassword]);
		}
	}, [password]);

	useEffect(() => {
		passwordGenerator();
	}, [length, charAllowed, numberAllowed, passwordGenerator]);

	return (
		<div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700 p-4">
			<h1 className="text-white text-center mb-4">Password Generator</h1>
			<div className="flex shadow rounded-lg overflow-hidden mb-4">
				<input
					ref={passwordRef}
					type="text"
					value={password}
					className="outline-none w-full py-1 px-3  rounded-sm"
					readOnly
					placeholder="Paddword"
				/>

				<button
					className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
					onClick={copyPasswordToClipboard}
				>
					copy
				</button>
			</div>

			<div className="flex text-sm gap-x-2">
				<div className="flex items-center gap-x-1">
					<input
						type="range"
						id="range"
						min={6}
						max={100}
						value={length}
						className="cursor-pointer"
						onChange={(e) => setLength(+e.target.value)}
					/>
					<label htmlFor="range">Length : {length}</label>
				</div>
				<div className="flex items-center gap-x-1">
					<input
						type="checkbox"
						id="numberInput"
						defaultChecked={numberAllowed}
						className="cursor-pointer"
						onChange={() => setNumberAllowed((prev) => !prev)}
					/>
					<label htmlFor="numberInput">Numbers</label>
				</div>
				<div className="flex items-center gap-x-1">
					<input
						type="checkbox"
						id="characterInput"
						defaultChecked={charAllowed}
						className="cursor-pointer"
						onChange={() => setCharAllowed((prev) => !prev)}
					/>
					<label htmlFor="characterInput">Characters</label>
				</div>
			</div>
		</div>
	);
}

export default App;
