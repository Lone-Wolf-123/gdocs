import {ThemeOptions, useAppDataStore, type Theme} from "../../store/useAppData";

export default function Header() {
	const theme = useAppDataStore((s) => s.theme)
	const setTheme = useAppDataStore((s) => s.setTheme)

	return (
    <header className='p-3 border-b flex items-center justify-between'>
      <h1 className='font-semibold'>Gdocs Lite</h1>
      <select
        className='border p-2 rounded'
        value={theme}
        onChange={(e) => setTheme(e.target.value as Theme)}
      >
        <option value={ThemeOptions.Light}>Light</option>
        <option value={ThemeOptions.Dark}>Dark</option>
        <option value={ThemeOptions.System}>System</option>
      </select>
    </header>
  );
}