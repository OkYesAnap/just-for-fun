const jsTest = () =>{
	function intersectArrays (arr1:number[], arr2:number[]) {
		const set1 = new Set(arr1);
		const set2 = new Set(arr2);
		// @ts-ignore
		const intersect = [...arr1, ...arr2].filter(val => set1.has(val) && set2.has(val));
		return Array.from(new Set(intersect));
	}

	const array1 = [1, 2, 3, 4, 5];
	const array2 = [4, 5, 6, 7, 8];
	console.log(array1, array2, intersectArrays);
}

export {jsTest}