const Util = (() => {
	function sleep(ms){
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	const Util = {
		sleep
	}

	return Util;
})();