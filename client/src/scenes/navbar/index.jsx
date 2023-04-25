import { useState } from "react";
import { Box, IconButton, InputBase, Typography, Select, MenuItem, FormControl, useTheme, useMediaQuery } from "@mui/material";
import { Search, Message, DarkMode, LightMode, Notifications, Help, Menu, Close, WidthFull } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogOut } from "../../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const theme = useTheme();
    const neutralLigth = theme.palette.neutral.ligth;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.defaut;
    const primaryLigth = theme.palette.primary.ligth;
    const alt = theme.palette.background.alt;

    const fullName = `${user.firstName} ${user.lastName}`;

    return (
        <FlexBetween padding="1rem 6%" backgroundColor={alt}>
            <FlexBetween gap="1.75rem">
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color="primary"
                    onClick={() => navigate("/home")}
                    sx={{
                        "&:hover": {
                            color: primaryLigth,
                            cursor: "pointer",
                        },
                    }}>
                    ZimmerSocial
                </Typography>
                {isNonMobileScreens && (
                    <FlexBetween backgroundColor={neutralLigth} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem">
                        <InputBase placeholder="Serach..." />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )}
            </FlexBetween>

            {isNonMobileScreens ?
                (<FlexBetween gap="2rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.pallete.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "25px" }} />
                        ) : (<LightMode sx={{ color: dark, fontSize: "25px" }} />)}
                    </IconButton>
                    <Message sx={{ fontSize: "25px" }} />
                    <Notifications sx={{ fontSize: "25px" }} />
                    <Help sx={{ fontSize: "25px" }} />
                    <FormControl varient="standart" value={fullName}>
                        <select
                            value={fullName}
                            sx={{
                                backgroundColor: neutralLigth,
                                with: "150px",
                                borderRadius: "0.25rem",
                                p: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": {
                                    pr: "0.25rem",
                                    width: "3rem",
                                },
                                "& .MuiSelect-select:focus": {
                                    backgroundColor: neutralLigth

                                }
                            }}
                            input={<InputBase />}
                        >
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogOut())}>Log out</MenuItem>
                        </select>
                    </FormControl>
                </FlexBetween>) :
                (<IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                    <Menu />
                </IconButton>)}

            {/* mobile Nav */}
            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box
                    position="fixed"
                    right="0"
                    bottom="0"
                    height="100%"
                    zIndex="10"
                    maxWidth="500px"
                    minWidth="300px"
                    backgroundColor={background}
                >
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                            <Close />
                        </IconButton>
                    </Box>
                    {/*  Menu items */}

                    <FlexBetween 
                    display="flex" 
                    flexDirection="column" 
                    justifyContent="center" 
                    alignItems="center"
                    gap="3rem">
                        <IconButton onClick={() => dispatch(setMode())}
                        sx={{fontSize: "25px"}}
                        >
                            {theme.pallete.mode === "dark" ? (
                                <DarkMode sx={{ fontSize: "25px" }} />
                            ) : (<LightMode sx={{ color: dark, fontSize: "25px" }} />)}
                        </IconButton>
                        <Message sx={{ fontSize: "25px" }} />
                        <Notifications sx={{ fontSize: "25px" }} />
                        <Help sx={{ fontSize: "25px" }} />
                        <FormControl varient="standart" value={fullName}>
                            <select
                                value={fullName}
                                sx={{
                                    backgroundColor: neutralLigth,
                                    with: "150px",
                                    borderRadius: "0.25rem",
                                    p: "0.25rem 1rem",
                                    "& .MuiSvgIcon-root": {
                                        pr: "0.25rem",
                                        width: "3rem",
                                    },
                                    "& .MuiSelect-select:focus": {
                                        backgroundColor: neutralLigth

                                    }
                                }}
                                input={<InputBase />}
                            >
                                <MenuItem value={fullName}>
                                    <Typography>{fullName}</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => dispatch(setLogOut())}>Log out</MenuItem>
                            </select>
                        </FormControl>
                    </FlexBetween>

                </Box>
            )}
        </FlexBetween>
    )
}

export default Navbar;