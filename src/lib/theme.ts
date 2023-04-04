import { createTheme } from "@suid/material";

export const lightTheme = createTheme({
	palette: {
		mode: "light",
		background: {
			default: "#e3ebdf"
		}
	},
	shape: {
		borderRadius: 12
	},
	components: {
		MuiAvatar: {
			defaultProps: {
				variant: "rounded"
			}
		},
	}
})
