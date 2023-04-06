import { InputBase, Paper } from "@suid/material";
import SearchIcon from "@suid/icons-material/Search";

interface SearchboxProps {
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
}

export default function Searchbox(props: SearchboxProps) {
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
				value={props.value}
				defaultValue={props.defaultValue}
				onChange={(e) => props.onChange?.(e.currentTarget.value)}
			/>
		</Paper>
	)
}
