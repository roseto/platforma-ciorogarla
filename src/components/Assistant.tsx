import {Box, Drawer, Fab, IconButton, Stack, SvgIcon, TextField, Typography} from "@suid/material";
import {createEffect, createSignal, For} from "solid-js";
import { createScrollTrigger } from "../hooks/useScrollTrigger";
import MagicSvg from "../resources/icons/magic.svg?component-solid"


import SendIcon from "@suid/icons-material/Send"
import BackgroundGlow from "./BackgroundGlow";

const templateMessages: { from: string, content: string }[] = [];

export default function Assistant() {
	const scrollTrigger = createScrollTrigger(128);
	const [drawerOpen, setDrawerOpen] = createSignal(false);
	let messagesRef: HTMLDivElement | undefined = undefined;

	createEffect(() => {
		if (drawerOpen() && messagesRef) {
			messagesRef.scroll(0, messagesRef.scrollHeight);
		}
	});

	return (
		<>
			<Box
				sx={{
					position: "fixed",
					bottom: 16,
					right: 16,
					zIndex: 500,
				}}
			>
				<Fab 
					onClick={() => setDrawerOpen(true)}
					variant="extended"
					sx={{
						height: 54,
						width: scrollTrigger() ? 54 : 164,
						borderRadius: 64,
						transition: "all .5s ease",
						overflow: "hidden",
					}}
					color={scrollTrigger() ? "default" : "primary"}
					>
					<SvgIcon 
						sx={{ 
							transition: "all .5s ease",
						ml: scrollTrigger() ? "84px" : 0,
						mr: scrollTrigger() ? 0 : 1,
						}}>
						<MagicSvg />
					</SvgIcon>
					<Typography
						sx={{
							opacity: scrollTrigger() ? 0 : 1,
							transition: "all .5s ease",
						}}
						>
						Întreabă
					</Typography>
				</Fab>
			</Box>
			<Drawer
				open={drawerOpen()}
				onClose={() => setDrawerOpen(false)}
				anchor="bottom"
				PaperProps={{
					sx: {
						backgroundColor: "background.default",
						backgroundImage: "none",
						p: 2,
						maxHeight: "calc(100vh - 64px)",
						borderTopLeftRadius: theme => theme.shape.borderRadius,
						borderTopRightRadius: theme => theme.shape.borderRadius,
					}
				}}
			>
				<BackgroundGlow />
				<Stack
					ref={messagesRef}
					displayRaw="grid"
					overflow="scroll"
					sx={{
						"& *": {
							overflowAnchor: "none",
						}
					}}
				>
					<SvgIcon
						sx={{
							mx: "auto",
							fontSize: 48,
						}}
					>
						<MagicSvg/>
					</SvgIcon>
					<Typography
						textAlign="center"
						variant="h5"
					>
						Întreabă-mă orice!
					</Typography>
					<Typography
						textAlign="center"
						color="textSecondary"
					>
						Acest asistent are acces la toate informațiile din site.
					</Typography>
					<For each={templateMessages}>
						{({from, content}, idx) => (
							<Box
								sx={{
									backgroundColor: from === "assistant" ? "primary.main" : "background.paper",
									color: from === "assistant" ? "background.paper" : "text.primary",
									px: 2,
									py: 1,
									borderTopLeftRadius: from === "assistant" ? 16 : 2,
									borderTopRightRadius: from === "assistant" ? 2 : 16,
									borderBottomLeftRadius: 16,
									borderBottomRightRadius: 16,
									justifySelf: from === "assistant" ? "flex-end" : "flex-start",
								}}
							>
								{content}
							</Box>
						)}
					</For>
					<div style={{ height: "1px", "overflow-anchor": "auto" }}/>
				</Stack>
				<Box
					sx={{
						display: "flex",
						mt: 2,
						justifyContent: "space-between",
						alignItems: "center",
						gap: 1
					}}
				>
					<TextField
						sx={{
							flex: 1
						}}
						variant="outlined"
						placeholder="Mesaj..."
					/>
					<Fab
						variant="circular"
						color="primary"
					>
						<SendIcon/>
					</Fab>
				</Box>
			</Drawer>
		</>
	)
}
