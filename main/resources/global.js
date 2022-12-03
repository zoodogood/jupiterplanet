
const App = (() => {
	const App = {
		animateBackground
	};

	async function animateBackground(){
		const DEFAULT_VALUE = 30;
		const MAXIMAL_VALUE = 100;
		const SLEEP_TIMEOUT = 20;
		const PER_STEP = 0.005;
		let percent = 0;

		while (true){
			await Util.sleep(SLEEP_TIMEOUT);
			percent += PER_STEP;
			percent %= MAXIMAL_VALUE - DEFAULT_VALUE;

			document.body.style.backgroundImage = `linear-gradient(45deg, black ${ percent + DEFAULT_VALUE }%, transparent)`;
		}
	}
	
	return App;
})();


App.animateBackground();
globalThis.snow = new SnowBackground();