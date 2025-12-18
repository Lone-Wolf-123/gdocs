import { create } from 'zustand';

export type DocPermission = 'read' | 'write';

//TODO need to use from shared library,
interface EditorState {
	docId: string | null;
	title: string;
	permission: DocPermission;
	loading: boolean;

	setDocMeta: (meta: {
		docId: string;
		title: string;
		permission: DocPermission;
	}) => void;

	clear: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
	docId: null,
	title: '',
	permission: 'read',
	loading: true,

	setDocMeta: ({ docId, title, permission }) =>
		set({
			docId,
			title,
			permission,
			loading: false,
		}),

	clear: () =>
		set({
			docId: null,
			title: '',
			permission: 'read',
			loading: true,
		}),
}));
