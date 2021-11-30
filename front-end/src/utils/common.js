export const checkSortType = sortType => {
	switch (sortType) {
		case 'Oldest':
			return 'created';
		case 'Views':
			return '-views';
		case 'Newest':
			return '-created';
		default:
			return '-score';
	}
};
