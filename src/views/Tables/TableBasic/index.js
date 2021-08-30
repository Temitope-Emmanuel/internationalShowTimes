import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Card, CardHeader, Divider, Button, Grid, Grow, Paper, Typography, Box, TextField, MenuItem, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import Breadcrumb from './../../../component/Breadcrumb';
import { gridSpacing } from '../../../store/constant';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import useDropBoxService from '../../../utils/dropBoxContext';
import useAlertService from '../../../utils/alertContext';
const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 350,
    },
    dropBoxButton: {
        marginLeft: 'auto',
        marginBottom: theme.spacing(3),
    },
    gridBody: {
        marginTop: theme.spacing(2),
    },
    uploadForm: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(2),
    },
    uploadSelect: {
        padding: theme.spacing(1),
        background: 'rgba(0,0,0,.1)',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
        '& svg': {
            fontSize: '2.5rem',
        },
    },
}));

// 150MB
const UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024;

const TableBasic = () => {
    const classes = useStyles();
    const alert = useAlertService();
    const [submitting, setSubmitting] = React.useState(false);
    const [files, setFiles] = React.useState({});
    const [directories, setDirectories] = React.useState([]);
    const [select, setSelect] = React.useState('');
    const [currentDirectory,setCurrentDirectory] = React.useState({})
    const [currentFileList,setCurrentFileList] = React.useState([])
    const [showUpload, setShowUpload] = React.useState(false);
    const { isLoaded, isLoggedIn, ...dropbox } = useDropBoxService();

    const onDrop = React.useCallback((acceptedFiles) => {
        if (acceptedFiles[0]) {
            setFiles(acceptedFiles[0]);
        }
    }, []);
    const { getInputProps, getRootProps } = useDropzone({ onDrop });

    const getDirectories = async (path) => {
        const filesResult = await dropbox.getFolders(path);
        return filesResult ?? []
    };
    const getRootDirectory = async() => {
        const response = await getDirectories({path:""});
        if(response.length){
            setDirectories(response)
        }
    }

    console.log({currentFileList})
    
    // Get the user root folder
    React.useEffect(() => {
        if (isLoggedIn) {        
         getRootDirectory()   
        }
    }, [isLoggedIn]);

    // Set the default folder
    React.useEffect(() => {
        if(directories.length){
            setCurrentDirectory(directories[0].id)
        }
    },[directories])

    // Get the files when the selected root folder change
    React.useEffect(() => {
        getFolderFile()
    },[currentDirectory])

    const getFolderFile = async () => {
        setSubmitting(true)
        const foundDirectory = directories.find(item => item.id === currentDirectory)
        if(foundDirectory?.path_lower){
            const response = await getDirectories({path:foundDirectory.path_lower})
            if(response.length){
                setCurrentFileList(response)
            }
        }
        setSubmitting(false)
    }

    const handleUploadToggle = () => {
        setShowUpload(!showUpload);
    };
    const toggleSubmit = () => {
        setSubmitting(!submitting);
    };
    const handleSelect = (e) => {
        setSelect(e.target.value);
    };
    const handleSetCurrentDirectories = (e) => {
        setCurrentDirectory(e.target.value)
    };
    const uploadDocument = () => {
        toggleSubmit();
        const foundPath = directories.find((item) => item.id === select).path_lower;
        if (files.size < UPLOAD_FILE_SIZE_LIMIT) {
            dropbox
                .uploadFiles({
                    path: `${foundPath}/${files.name}`,
                    mode: 'add',
                    contents: files,
                })
                .then((resp) => {
                    handleUploadToggle();
                    if (resp.status === 200) {
                        alert({
                            type: 'success',
                            message: `File ${files.name} was successfully uploaded`,
                            title: 'Upload files successfuly',
                        });
                        getFolderFile()
                    }
                    setSubmitting(false);
                })
                .catch((err) => {
                    alert({
                        type: 'error',
                        message: `Error:${err.message}`,
                        title: 'Something went wrong',
                    });
                });
        } else {
            dropbox
                .uploadLargeFiles(files, `${foundPath}/${files.name}`)
                .then((resp) => {
                    handleUploadToggle();
                    if (resp.status === 200) {
                        alert({
                            type: 'success',
                            message: `File ${files.name} was successfully uploaded`,
                            title: 'Upload files successfuly',
                        });
                        getFolderFile()
                    }
                    setSubmitting(false);
                })
                .catch((err) => {
                    alert({
                        type: 'error',
                        message: `Error:${err.message}`,
                        title: 'Something went wrong',
                    });
                });
        }
    };

    return (
        <React.Fragment>
            <Breadcrumb title="Dropbox">
                <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
                    Dashboard
                </Typography>
                <Typography variant="subtitle2" color="inherit" className="link-breadcrumb">
                    Folder List
                </Typography>
            </Breadcrumb>
            {!dropbox.isLoggedIn && (
                <Button className={classes.dropBoxButton} variant="contained" disabled={dropbox.isLoaded} onClick={dropbox.doAuth}>
                    Connect To Dropbox
                </Button>
            )}
            {true && (
                <Button disabled={submitting} className={classes.dropBoxButton} variant="contained" onClick={handleUploadToggle}>
                    {showUpload ? 'Close Upload Form' : 'Show Upload Form'}
                </Button>
            )}
            <Grow mountOnEnter unmountOnExit in={showUpload} component={Paper}>
                <Box className={classes.uploadForm}>
                    <TextField
                        id="filled-select-dropbox"
                        select
                        label="Select"
                        value={select}
                        onChange={handleSelect}
                        helperText="Please select your Directory to upload project"
                        variant="filled"
                    >
                        {directories.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Box
                        {...getRootProps({
                            className: classes.uploadSelect,
                        })}
                    >
                        <input id="file-upload" {...getInputProps()} />
                        {files?.name ? <p>{files.name}</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
                        <label htmlFor="file-upload">
                            <IconButton>
                                <CloudUploadIcon />
                            </IconButton>
                        </label>
                    </Box>
                    <Button disabled={!files.name || submitting} onClick={uploadDocument} variant="contained">
                        Upload
                    </Button>
                </Box>
            </Grow>
            <Grid container className={classes.gridBody} spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader
                            title={
                                <Typography component="div" className="card-header">
                                    Dropbox Folders
                                </Typography>
                            }
                            subheader={
                                directories.length ? 
                                <TextField disabled={submitting}
                                    id="filled-select-dropbox"
                                    select
                                    label="Select"
                                    value={currentDirectory}
                                    onChange={handleSetCurrentDirectories}
                                    helperText="Select Directory"
                                    variant="filled"
                                >
                                    {directories.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField> : undefined
                            }
                        />
                        <Divider />
                        <TableContainer>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="right">Tags</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {currentFileList.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row['.tag']}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default TableBasic;
