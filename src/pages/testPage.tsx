import React, {useState} from 'react';

const throttle = (delayTime: number) => {
	let timer: NodeJS.Timeout;
	let callable = true;
	return (callback: Function, setStatus: Function) => {
		if (callable) {
			callable = false;
			setStatus(callable);
			callback();
			timer = setTimeout(() => {
				callable = true;
				setStatus(callable);
			}, delayTime);
		} else {
			clearTimeout(timer);
			timer = setTimeout(() => {
				callable = true;
				// callback();
				setStatus(callable);
			}, delayTime)
		}
	}
};

const throttle1sek = throttle(1000);

function TestPage() {

	const [clickCount, setClickCount] = useState<number>(0)
	const [clickThrottledCount, setClickThrottledCount] = useState<number>(0);
	const [canRun, setCanRun] = useState<boolean>(true);

	const fetchData = () => {
		setClickCount(clickCount + 1);
		throttle1sek((canRun: boolean = true) => {
			setClickThrottledCount( clickThrottledCount + 1);
		}, setCanRun);
	}

	return (<div>
		<button onClick={fetchData}>Hello</button>
		<div>Click count {clickCount}</div>
		<div>Click Throttled count {clickThrottledCount}</div>
		<div>Button can be fired+ {String(canRun)} </div>
	</div>)
}

export default TestPage