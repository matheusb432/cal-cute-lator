export function getPasteData(event: ClipboardEvent): string {
	if (event.clipboardData == null) return '';

	return event.clipboardData.getData('text');
}
