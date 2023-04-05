import { InputBase, Paper } from "@suid/material";
import SearchIcon from "@suid/icons-material/Search";

export default function Searchbox() {
	return (
		<Paper
			sx={{
				borderRadius: "128px",
				padding: "8px 16px",
				display: "flex",
				alignItems: "center",
				gap: 1,
				backgroundColor: "transparent"
			}}
			variant="outlined"
		>
			<SearchIcon />
			<InputBase
				placeholder="Caută"
				sx={{
					width: "100%"
				}}
			/>
		</Paper>
	)
}
