import {
    Box,
    Typography,
    FormControl,
    FormHelperText,
    TextField,
    TextareaAutosize,
    Stack,
    Select,
    MenuItem,
    Button,
} from "@pankod/refine-mui";

import { FormProps } from "interfaces/common";
import CustomButton from "./CustomButton";

const Form = ({
    type,
    register,
    handleSubmit,
    handleImageChange,
    formLoading,
    onFinishHandler,
    propertyImage,
}: FormProps) => {
    const monthMenuItem = [
        {number: "01", month: "January"},
        {number: "02", month: "February"},
        {number: "03", month: "March"},
        {number: "04", month: "April"},
        {number: "05", month: "May"},
        {number: "06", month: "June"},
        {number: "07", month: "July"},
        {number: "08", month: "August"},
        {number: "09", month: "September"},
        {number: "10", month: "October"},
        {number: "11", month: "November"},
        {number: "12", month: "December"},

    ].map((month) => <MenuItem value={month.number}>{month.month}</MenuItem>);
    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142d">
                {type} a Property
            </Typography>
            <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
                <form
                    style={{
                        marginTop: "10px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                    onSubmit={handleSubmit(onFinishHandler)}
                >
                    <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0px",
                                marginLeft: "0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Property name
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            id="outlined-basic"
                            color="info"
                            variant="outlined"
                            {...register("title", { required: true })}
                        />
                    </FormControl>
                    <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px",
                                marginLeft: "0",

                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Property description
                        </FormHelperText>
                        <TextareaAutosize
                            minRows={5}
                            required
                            color="info"
                            style={{
                                background: "transparent",
                                fontSize: "16px",
                                borderColor: "rgba(0,0,0,0.23)",
                                borderRadius: 6,
                                padding: 10,
                                color: "#919191",
                            }}
                            {...register("description", { required: true })}
                        />
                    </FormControl>
                    <Stack direction="row" gap={4}>
                        <FormControl sx={{ flex: 1 }}>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "10px 0px",
                                    fontSize: 16,
                                    color: "#11142d",
                                }}
                            >
                                Property type
                            </FormHelperText>
                            <Select
                                variant="outlined"
                                color="info"
                                displayEmpty
                                required
                                inputProps={{ "aria-label": "Without Label" }}
                                defaultValue="apartment"
                                {...register("propertyType", {
                                    required: true,
                                })}
                            >
                                <MenuItem value="apartment">Apartment</MenuItem>
                                <MenuItem value="condos">Condo</MenuItem>
                                <MenuItem value="townhouse">Townhouse</MenuItem>
                                <MenuItem value="duplex">Duplex</MenuItem>
                                <MenuItem value="single-family">
                                    Single Family
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "10px 0",
                                    fontSize: 16,
                                    color: "#11142d",
                                }}
                            >
                                Rent per month
                            </FormHelperText>
                            <TextField
                                fullWidth
                                required
                                id="outlined-basic"
                                color="info"
                                type="number"
                                variant="outlined"
                                {...register("price", { required: true })}
                            />
                        </FormControl>

                        <FormControl sx={{ minWidth: "15%" }}>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "10px 0",
                                    fontSize: 16,
                                    color: "#11142d",
                                }}
                            >
                                Starting month
                            </FormHelperText>

                            <Select
                                variant="outlined"
                                color="info"
                                displayEmpty
                                required
                                inputProps={{
                                    "aria-label": "Without Label",
                                }}
                                defaultValue="January"
                                {...register("startingMonth", {
                                    required: true,
                                })}
                            >
                                {monthMenuItem}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormHelperText
                                sx={{
                                    fontWeight: 500,
                                    margin: "10px 0",
                                    fontSize: 16,
                                    color: "#11142d",
                                }}
                            >
                                Starting year
                            </FormHelperText>
                            <TextField
                                fullWidth
                                required
                                id="outlined-basic"
                                color="info"
                                type="number"
                                variant="outlined"
                                {...register("startingYear", {
                                    required: true,
                                })}
                            />
                        </FormControl>
                    </Stack>

                    <FormControl>
                        <FormHelperText
                            sx={{
                                fontWeight: 500,
                                margin: "10px 0",
                                fontSize: 16,
                                color: "#11142d",
                            }}
                        >
                            Enter location
                        </FormHelperText>
                        <TextField
                            fullWidth
                            required
                            id="outlined-basic"
                            color="info"
                            variant="outlined"
                            {...register("location", { required: true })}
                        />
                    </FormControl>

                    <Stack
                        direction="column"
                        gap={1}
                        justifyContent="center"
                        mb={2}
                    >
                        <Stack direction="row" gap={2}>
                            <Typography
                                color="#11142d"
                                fontSize={16}
                                fontWeight={500}
                                my="10px"
                            >
                                Property photo
                            </Typography>
                            <Button
                                component="label"
                                sx={{
                                    width: "fit-content",
                                    color: "#2ed480",
                                    textTransform: "capitalize",
                                    fontSize: 16,
                                }}
                            >
                                Upload *
                                <input
                                    hidden
                                    accept="image/"
                                    type="file"
                                    onChange={(e) => {
                                        // @ts-ignore
                                        handleImageChange(e.target.files[0]);
                                    }}
                                />
                            </Button>
                        </Stack>
                        <Typography
                            fontSize={14}
                            color="#808191"
                            sx={{ wordBreak: "break-all" }}
                        >
                            {propertyImage?.name}
                        </Typography>
                    </Stack>

                    <CustomButton
                        type="submit"
                        title={formLoading ? "Submiting..." : "Submit"}
                        backgroundColor=" #475be8"
                        color="#FCFCFC"
                    />
                </form>
            </Box>
        </Box>
    );
};

export default Form;
