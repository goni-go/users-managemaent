import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { fetchUsersPagination } from '../utils/api';
import { UserType } from '../types/user';
import { Credentials } from '../types/creds';
import config from "../utils/config";

type Props = {
    credentials: Credentials
}

enum PageDirection {
    Next = 1,
    Prev = -1
}

const UsersGrid: React.FC<Props> = ({ credentials }) => {
    const [users, setUsers] = useState([] as UserType[]);
    const [pageNumber, setPageNumber] = useState(1);
    const [showNext, setShowNext] = useState(true)

    useEffect(() => {
        fetchUsers();
    }, [pageNumber]);

    useEffect(() => {
        if (users.length < config.pagination.pageSize) {
            setShowNext(false);
        } else if (!showNext) {
            setShowNext(true);
        }
    }, [users]);
  
    const fetchUsers = async (): Promise<void> => {
        try {
            const usersForRequiredPage = await fetchUsersPagination(pageNumber, credentials.token);
            if (usersForRequiredPage.length > 0) {
                setUsers(usersForRequiredPage);
            }
        } catch (error) {
            alert(error);
            console.log('error in fetch users: ', error);
        }
    }

    const onPageChange = (direction: PageDirection) => {
        setPageNumber(pageNumber + direction);
    }

    return (
        <div style={{ margin: '10px' }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Description</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {users.map((user) => (
                        <TableRow
                            key={user.email}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {user.email}
                            </TableCell>
                            <TableCell align="left">{user.firstName} {user.lastName}</TableCell>
                            <TableCell align="left">{user.description}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div>
                <IconButton 
                    color="primary" 
                    component="span"
                    onClick={() => onPageChange(PageDirection.Prev)}
                    disabled={pageNumber === 1}
                >
                    <ArrowBackIosNewIcon />
                </IconButton>
                <span>{pageNumber}</span>
                <IconButton 
                    color="primary" 
                    component="span"
                    onClick={() => onPageChange(PageDirection.Next)}
                    disabled={!showNext}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
            </div>
        </div>
    );
}

export default UsersGrid;
