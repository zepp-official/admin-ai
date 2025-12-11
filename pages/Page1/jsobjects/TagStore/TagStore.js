export default {
	defaultTags: ["High Priority", "Bug", "Feature", "Design", "Marketing"],
	
	getAvailableTags () {
		return this.defaultTags;
	},

	getSelectedTags () {
		return appsmith.store.selectedTags || [];
	},

	updateSelection (tags) {
		storeValue('selectedTags', tags);
	}
}
