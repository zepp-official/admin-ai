export default {
	tags: ['JavaScript', 'Python', 'Appsmith'],
	myVar2: {},

	addTag(tagName) {
		// Validate input
		if (!tagName || tagName.trim() === '') {
			showAlert('Please enter a tag name', 'error');
			return;
		}

		const trimmedTag = tagName.trim();

		// Check for duplicates
		if (this.tags.includes(trimmedTag)) {
			showAlert('Tag already exists', 'warning');
			return;
		}

		// Add the new tag
		this.tags = [...this.tags, trimmedTag];
		showAlert('Tag added successfully', 'success');
	},

	deleteTag(index) {
		if (index >= 0 && index < this.tags.length) {
			const deletedTag = this.tags[index];
			this.tags = this.tags.filter((_, i) => i !== index);
			showAlert(`Tag "${deletedTag}" deleted`, 'success');
		}
	}
}