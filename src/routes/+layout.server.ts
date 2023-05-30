import { Urls } from '$lib/helpers/urls.js';
import { redirect } from '@sveltejs/kit';

export function load(data) {
	if (data.url.pathname !== Urls.Calculator) throw redirect(307, Urls.Calculator);
}
